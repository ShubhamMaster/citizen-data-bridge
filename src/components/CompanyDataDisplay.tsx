
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building, Mail, Phone, Globe, MapPin, FileText } from 'lucide-react';

interface Company {
  company_id: string;
  company_name: string;
  website?: string;
  industry?: string;
  description?: string;
  civora_nexus_company_contacts?: Array<{
    contact_id: string;
    email?: string;
    phone?: string;
    is_primary_contact?: boolean;
  }>;
  civora_nexus_company_addresses?: Array<{
    address_id: string;
    street_address?: string;
    address_type?: string;
  }>;
  civora_nexus_social_links?: Array<{
    social_id: string;
    platform?: string;
    url?: string;
  }>;
  civora_nexus_documents?: Array<{
    document_id: string;
    document_name?: string;
    doc_type?: string;
  }>;
}

export const CompanyDataDisplay = () => {
  const { data: companies, isLoading } = useQuery({
    queryKey: ['companies'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('civora_nexus_companies')
        .select(`
          *,
          civora_nexus_company_contacts(*),
          civora_nexus_company_addresses(*),
          civora_nexus_social_links(*),
          civora_nexus_documents(*),
          civora_nexus_bank_details(*)
        `)
        .order('created_at', { ascending: false })
        .limit(20);
      
      if (error) throw error;
      return data as Company[];
    },
  });

  if (isLoading) {
    return <div className="p-4">Loading companies...</div>;
  }

  return (
    <div className="space-y-4 p-4">
      <h2 className="text-2xl font-bold mb-4">Captured Company Data</h2>
      
      {companies?.map((company) => (
        <Card key={company.company_id} className="w-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="h-5 w-5" />
              {company.company_name}
              {company.industry && (
                <Badge variant="secondary">{company.industry}</Badge>
              )}
            </CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-4">
            {company.website && (
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4" />
                <a href={company.website} target="_blank" rel="noopener noreferrer" 
                   className="text-blue-600 hover:underline">
                  {company.website}
                </a>
              </div>
            )}
            
            {company.description && (
              <p className="text-sm text-gray-600">{company.description}</p>
            )}

            {/* Contacts */}
            {company.civora_nexus_company_contacts?.length && company.civora_nexus_company_contacts.length > 0 && (
              <div>
                <h4 className="font-semibold mb-2">Contacts</h4>
                <div className="space-y-1">
                  {company.civora_nexus_company_contacts.map((contact) => (
                    <div key={contact.contact_id} className="flex items-center gap-2 text-sm">
                      <Mail className="h-3 w-3" />
                      {contact.email}
                      {contact.phone && (
                        <>
                          <Phone className="h-3 w-3 ml-2" />
                          {contact.phone}
                        </>
                      )}
                      {contact.is_primary_contact && (
                        <Badge variant="outline" className="text-xs">Primary</Badge>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Addresses */}
            {company.civora_nexus_company_addresses?.length && company.civora_nexus_company_addresses.length > 0 && (
              <div>
                <h4 className="font-semibold mb-2">Addresses</h4>
                <div className="space-y-1">
                  {company.civora_nexus_company_addresses.map((address) => (
                    <div key={address.address_id} className="flex items-center gap-2 text-sm">
                      <MapPin className="h-3 w-3" />
                      {address.street_address}
                      {address.address_type && (
                        <Badge variant="outline" className="text-xs">{address.address_type}</Badge>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Social Links */}
            {company.civora_nexus_social_links?.length && company.civora_nexus_social_links.length > 0 && (
              <div>
                <h4 className="font-semibold mb-2">Social Links</h4>
                <div className="space-y-1">
                  {company.civora_nexus_social_links.map((social) => (
                    <div key={social.social_id} className="text-sm">
                      <Badge variant="outline" className="mr-2">{social.platform}</Badge>
                      <a href={social.url} target="_blank" rel="noopener noreferrer" 
                         className="text-blue-600 hover:underline">
                        {social.url}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Documents */}
            {company.civora_nexus_documents?.length && company.civora_nexus_documents.length > 0 && (
              <div>
                <h4 className="font-semibold mb-2">Documents</h4>
                <div className="space-y-1">
                  {company.civora_nexus_documents.map((doc) => (
                    <div key={doc.document_id} className="flex items-center gap-2 text-sm">
                      <FileText className="h-3 w-3" />
                      {doc.document_name}
                      {doc.doc_type && (
                        <Badge variant="outline" className="text-xs">{doc.doc_type}</Badge>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
