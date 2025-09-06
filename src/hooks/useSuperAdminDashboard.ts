
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface TableInfo {
  name: string;
  columns: string[];
  data: any[];
  totalCount: number;
}

interface DashboardState {
  tables: TableInfo[];
  loading: boolean;
  error: string | null;
  selectedTable: string | null;
}

export const useSuperAdminDashboard = () => {
  const { user, userRole } = useAuth();
  const { toast } = useToast();
  
  const [dashboardState, setDashboardState] = useState<DashboardState>({
    tables: [],
    loading: true,
    error: null,
    selectedTable: null
  });

  const availableTables = [
    'profiles',
    'admin_logs',
    'otp_verifications',
    'employees',
    'interns',
    'company_project',
    'leadership_team',
    'civora_nexus_partner',
    'civora_nexus_companies',
    'civora_nexus_company_contacts',
    'civora_nexus_company_addresses',
    'civora_nexus_bank_details',
    'civora_nexus_documents',
    'civora_nexus_social_links',
    'contact_submissions',
    'consultation_requests',
    'collaboration_requests',
    'investment_inquiries',
    'partners_inquiries',
    'saas_project_requests',
    'technical_consultations',
    'innovation_lab_applications',
    'internship_applications',
    'join_lab_forms',
    'event_registrations',
    'support_tickets',
    'salary_inquiries',
    'scheduled_calls',
    'upcoming_events',
    'email_history',
    'jobs',
    'applications',
    'contact_messages',
    'recycle_bin'
  ];

  const logAction = async (action: string, tableName?: string, recordId?: string, oldData?: any, newData?: any) => {
    if (!user) return;

    try {
      await supabase.rpc('log_admin_action', {
        p_admin_id: user.id,
        p_action: action,
        p_table_name: tableName,
        p_record_id: recordId,
        p_old_data: oldData,
        p_new_data: newData,
        p_ip_address: 'browser_request',
        p_user_agent: navigator.userAgent
      });
    } catch (error) {
      console.error('Error logging admin action:', error);
    }
  };

  const fetchTables = async () => {
    if (userRole !== 'super_admin') {
      setDashboardState(prev => ({ ...prev, error: 'Access denied', loading: false }));
      return;
    }

    try {
      setDashboardState(prev => ({ ...prev, loading: true, error: null }));

      const tables: TableInfo[] = [];

      // For each available table, get data and count
      for (const tableName of availableTables) {
        try {
          // Use type assertion for dynamic table names
          const { data, error: dataError, count } = await supabase
            .from(tableName as any)
            .select('*', { count: 'exact' })
            .range(0, 9);

          if (dataError && !dataError.message.includes('permission denied')) {
            console.warn(`Error fetching data for table ${tableName}:`, dataError);
            continue;
          }

          // Get column names from the first row of data
          const columns = data && data.length > 0 ? Object.keys(data[0]) : [];

          tables.push({
            name: tableName,
            columns,
            data: data || [],
            totalCount: count || 0
          });
        } catch (error) {
          console.warn(`Error processing table ${tableName}:`, error);
          // Continue with other tables even if one fails
          tables.push({
            name: tableName,
            columns: [],
            data: [],
            totalCount: 0
          });
        }
      }

      setDashboardState(prev => ({
        ...prev,
        tables,
        loading: false
      }));

      await logAction('dashboard_accessed');
    } catch (error: any) {
      setDashboardState(prev => ({
        ...prev,
        error: error.message,
        loading: false
      }));
      
      toast({
        title: "Error",
        description: error.message || "Failed to fetch dashboard data",
        variant: "destructive"
      });
    }
  };

  const createRecord = async (tableName: string, data: any) => {
    try {
      const { data: newRecord, error } = await supabase
        .from(tableName as any)
        .insert(data)
        .select()
        .single();

      if (error) throw error;

      // Fix: Proper null check with type assertion
      if (!newRecord) {
        throw new Error('Failed to create record - no data returned');
      }

      // Assert that newRecord is not null after the check
      const record = newRecord as Record<string, any>;

      // Try to get the record ID from common primary key names
      const possibleKeys = ['id', 'ID', 'uuid', 'record_id', 'company_id', 'bank_id', 'contact_id', 'address_id', 'document_id', 'social_id'];
      let recordId: string | number | undefined;

      for (const key of possibleKeys) {
        if (key in record && record[key] != null) {
          recordId = record[key];
          break;
        }
      }

      // Ensure recordId is properly typed
      let finalRecordId: string;
      if (!recordId) {
        // fallback to first property value if no known key found
        const firstValue = Object.values(record)[0];
        finalRecordId = typeof firstValue === 'string' || typeof firstValue === 'number' ? String(firstValue) : 'unknown';
      } else {
        finalRecordId = String(recordId);
      }

      await logAction('create_record', tableName, finalRecordId, null, record);
      await fetchTables();

      toast({
        title: "Success",
        description: `Record created in ${tableName}`,
        variant: "default"
      });

      return record;
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to create record",
        variant: "destructive"
      });
      throw error;
    }
  };

  const updateRecord = async (tableName: string, id: string, data: any, oldData: any) => {
    try {
      const { data: updatedRecord, error } = await supabase
        .from(tableName as any)
        .update(data)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      await logAction('update_record', tableName, id, oldData, updatedRecord);
      await fetchTables();
      
      toast({
        title: "Success",
        description: `Record updated in ${tableName}`,
        variant: "default"
      });

      return updatedRecord;
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to update record",
        variant: "destructive"
      });
      throw error;
    }
  };

  const deleteRecord = async (tableName: string, id: string, recordData: any) => {
    try {
      const { error } = await supabase
        .from(tableName as any)
        .delete()
        .eq('id', id);

      if (error) throw error;

      await logAction('delete_record', tableName, id, recordData, null);
      await fetchTables();
      
      toast({
        title: "Success",
        description: `Record deleted from ${tableName}`,
        variant: "default"
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to delete record",
        variant: "destructive"
      });
      throw error;
    }
  };

  const fetchTableData = async (tableName: string, page: number = 0, limit: number = 10) => {
    try {
      const { data, error, count } = await supabase
        .from(tableName as any)
        .select('*', { count: 'exact' })
        .range(page * limit, (page + 1) * limit - 1);

      if (error) throw error;

      return { data: data || [], count: count || 0 };
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to fetch table data",
        variant: "destructive"
      });
      return { data: [], count: 0 };
    }
  };

  useEffect(() => {
    if (user && userRole === 'super_admin') {
      fetchTables();
    }
  }, [user, userRole]);

  return {
    dashboardState,
    createRecord,
    updateRecord,
    deleteRecord,
    fetchTableData,
    fetchTables,
    logAction,
    setSelectedTable: (tableName: string | null) => 
      setDashboardState(prev => ({ ...prev, selectedTable: tableName }))
  };
};
