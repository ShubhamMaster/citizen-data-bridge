export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      admin_logs: {
        Row: {
          action: string
          admin_id: string | null
          created_at: string | null
          id: string
          ip_address: string | null
          new_data: Json | null
          old_data: Json | null
          record_id: string | null
          table_name: string | null
          user_agent: string | null
        }
        Insert: {
          action: string
          admin_id?: string | null
          created_at?: string | null
          id?: string
          ip_address?: string | null
          new_data?: Json | null
          old_data?: Json | null
          record_id?: string | null
          table_name?: string | null
          user_agent?: string | null
        }
        Update: {
          action?: string
          admin_id?: string | null
          created_at?: string | null
          id?: string
          ip_address?: string | null
          new_data?: Json | null
          old_data?: Json | null
          record_id?: string | null
          table_name?: string | null
          user_agent?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "admin_logs_admin_id_fkey"
            columns: ["admin_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      api_keys: {
        Row: {
          api_key: string
          created_at: string
          created_by: string | null
          description: string | null
          email: string
          expires_at: string | null
          id: string
          is_active: boolean
          key_name: string | null
          last_used_at: string | null
          service_type: string
          updated_at: string
          usage_count: number | null
        }
        Insert: {
          api_key: string
          created_at?: string
          created_by?: string | null
          description?: string | null
          email: string
          expires_at?: string | null
          id?: string
          is_active?: boolean
          key_name?: string | null
          last_used_at?: string | null
          service_type: string
          updated_at?: string
          usage_count?: number | null
        }
        Update: {
          api_key?: string
          created_at?: string
          created_by?: string | null
          description?: string | null
          email?: string
          expires_at?: string | null
          id?: string
          is_active?: boolean
          key_name?: string | null
          last_used_at?: string | null
          service_type?: string
          updated_at?: string
          usage_count?: number | null
        }
        Relationships: []
      }
      applications: {
        Row: {
          application_data: Json | null
          created_at: string
          data_source: string | null
          id: number
          job_id: number | null
          status: string | null
          user_id: string | null
        }
        Insert: {
          application_data?: Json | null
          created_at?: string
          data_source?: string | null
          id?: number
          job_id?: number | null
          status?: string | null
          user_id?: string | null
        }
        Update: {
          application_data?: Json | null
          created_at?: string
          data_source?: string | null
          id?: number
          job_id?: number | null
          status?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "applications_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
        ]
      }
      civora_nexus_bank_details: {
        Row: {
          account_holder_name: string | null
          account_number: string | null
          bank_id: string
          bank_name: string | null
          branch_name: string | null
          company_id: string | null
          created_at: string | null
          ifsc_code: string | null
          updated_at: string | null
          upi_id: string | null
        }
        Insert: {
          account_holder_name?: string | null
          account_number?: string | null
          bank_id: string
          bank_name?: string | null
          branch_name?: string | null
          company_id?: string | null
          created_at?: string | null
          ifsc_code?: string | null
          updated_at?: string | null
          upi_id?: string | null
        }
        Update: {
          account_holder_name?: string | null
          account_number?: string | null
          bank_id?: string
          bank_name?: string | null
          branch_name?: string | null
          company_id?: string | null
          created_at?: string | null
          ifsc_code?: string | null
          updated_at?: string | null
          upi_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "civora_nexus_bank_details_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "civora_nexus_companies"
            referencedColumns: ["company_id"]
          },
        ]
      }
      civora_nexus_companies: {
        Row: {
          annual_turnover: number | null
          business_type: string | null
          company_id: string
          company_logo: string | null
          company_name: string
          created_at: string | null
          description: string | null
          established_date: string | null
          gst_number: string | null
          industry: string | null
          iso_certificate_no: string | null
          iso_certified: boolean | null
          legal_name: string | null
          number_of_employees: number | null
          pan_number: string | null
          registration_number: string | null
          tax_id: string | null
          updated_at: string | null
          website: string | null
        }
        Insert: {
          annual_turnover?: number | null
          business_type?: string | null
          company_id?: string
          company_logo?: string | null
          company_name: string
          created_at?: string | null
          description?: string | null
          established_date?: string | null
          gst_number?: string | null
          industry?: string | null
          iso_certificate_no?: string | null
          iso_certified?: boolean | null
          legal_name?: string | null
          number_of_employees?: number | null
          pan_number?: string | null
          registration_number?: string | null
          tax_id?: string | null
          updated_at?: string | null
          website?: string | null
        }
        Update: {
          annual_turnover?: number | null
          business_type?: string | null
          company_id?: string
          company_logo?: string | null
          company_name?: string
          created_at?: string | null
          description?: string | null
          established_date?: string | null
          gst_number?: string | null
          industry?: string | null
          iso_certificate_no?: string | null
          iso_certified?: boolean | null
          legal_name?: string | null
          number_of_employees?: number | null
          pan_number?: string | null
          registration_number?: string | null
          tax_id?: string | null
          updated_at?: string | null
          website?: string | null
        }
        Relationships: []
      }
      civora_nexus_company_addresses: {
        Row: {
          address_id: string
          address_type: string | null
          area: string | null
          city: string | null
          company_id: string | null
          country: string | null
          created_at: string | null
          google_map_link: string | null
          postal_code: string | null
          state: string | null
          street_address: string | null
          updated_at: string | null
        }
        Insert: {
          address_id: string
          address_type?: string | null
          area?: string | null
          city?: string | null
          company_id?: string | null
          country?: string | null
          created_at?: string | null
          google_map_link?: string | null
          postal_code?: string | null
          state?: string | null
          street_address?: string | null
          updated_at?: string | null
        }
        Update: {
          address_id?: string
          address_type?: string | null
          area?: string | null
          city?: string | null
          company_id?: string | null
          country?: string | null
          created_at?: string | null
          google_map_link?: string | null
          postal_code?: string | null
          state?: string | null
          street_address?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "civora_nexus_company_addresses_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "civora_nexus_companies"
            referencedColumns: ["company_id"]
          },
        ]
      }
      civora_nexus_company_contacts: {
        Row: {
          alternate_email: string | null
          alternate_phone: string | null
          company_id: string | null
          contact_id: string
          contact_type: string | null
          created_at: string | null
          department: string | null
          designation: string | null
          email: string | null
          full_name: string | null
          is_primary_contact: boolean | null
          linkedin_profile: string | null
          phone: string | null
          updated_at: string | null
        }
        Insert: {
          alternate_email?: string | null
          alternate_phone?: string | null
          company_id?: string | null
          contact_id: string
          contact_type?: string | null
          created_at?: string | null
          department?: string | null
          designation?: string | null
          email?: string | null
          full_name?: string | null
          is_primary_contact?: boolean | null
          linkedin_profile?: string | null
          phone?: string | null
          updated_at?: string | null
        }
        Update: {
          alternate_email?: string | null
          alternate_phone?: string | null
          company_id?: string | null
          contact_id?: string
          contact_type?: string | null
          created_at?: string | null
          department?: string | null
          designation?: string | null
          email?: string | null
          full_name?: string | null
          is_primary_contact?: boolean | null
          linkedin_profile?: string | null
          phone?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "civora_nexus_company_contacts_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "civora_nexus_companies"
            referencedColumns: ["company_id"]
          },
        ]
      }
      civora_nexus_documents: {
        Row: {
          company_id: string | null
          created_at: string | null
          doc_type: string | null
          document_id: string
          document_name: string | null
          document_number: string | null
          document_url: string | null
          expiry_date: string | null
          issue_date: string | null
          updated_at: string | null
        }
        Insert: {
          company_id?: string | null
          created_at?: string | null
          doc_type?: string | null
          document_id: string
          document_name?: string | null
          document_number?: string | null
          document_url?: string | null
          expiry_date?: string | null
          issue_date?: string | null
          updated_at?: string | null
        }
        Update: {
          company_id?: string | null
          created_at?: string | null
          doc_type?: string | null
          document_id?: string
          document_name?: string | null
          document_number?: string | null
          document_url?: string | null
          expiry_date?: string | null
          issue_date?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "civora_nexus_documents_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "civora_nexus_companies"
            referencedColumns: ["company_id"]
          },
        ]
      }
      civora_nexus_partner: {
        Row: {
          contact_email: string | null
          created_at: string | null
          description: string | null
          id: string
          image_url: string | null
          industry: string | null
          location: string | null
          min_partner: number | null
          name: string
          updated_at: string | null
          website: string | null
        }
        Insert: {
          contact_email?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          industry?: string | null
          location?: string | null
          min_partner?: number | null
          name: string
          updated_at?: string | null
          website?: string | null
        }
        Update: {
          contact_email?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          industry?: string | null
          location?: string | null
          min_partner?: number | null
          name?: string
          updated_at?: string | null
          website?: string | null
        }
        Relationships: []
      }
      civora_nexus_social_links: {
        Row: {
          company_id: string | null
          created_at: string | null
          platform: string | null
          preference: number | null
          social_id: string
          updated_at: string | null
          url: string | null
        }
        Insert: {
          company_id?: string | null
          created_at?: string | null
          platform?: string | null
          preference?: number | null
          social_id: string
          updated_at?: string | null
          url?: string | null
        }
        Update: {
          company_id?: string | null
          created_at?: string | null
          platform?: string | null
          preference?: number | null
          social_id?: string
          updated_at?: string | null
          url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "civora_nexus_social_links_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "civora_nexus_companies"
            referencedColumns: ["company_id"]
          },
        ]
      }
      collaboration_requests: {
        Row: {
          collaboration_type: string | null
          created_at: string | null
          email: string
          id: string
          message: string | null
          name: string
          organization: string | null
          phone: string | null
        }
        Insert: {
          collaboration_type?: string | null
          created_at?: string | null
          email: string
          id?: string
          message?: string | null
          name: string
          organization?: string | null
          phone?: string | null
        }
        Update: {
          collaboration_type?: string | null
          created_at?: string | null
          email?: string
          id?: string
          message?: string | null
          name?: string
          organization?: string | null
          phone?: string | null
        }
        Relationships: []
      }
      company_project: {
        Row: {
          budget_range: string | null
          categories: string | null
          challenges_solved: string[] | null
          client_name: string | null
          created_at: string | null
          description: string | null
          domain: string | null
          duration_months: number | null
          end_date: string | null
          full_description: string | null
          id: string
          image_url: string | null
          impact_metrics: Json | null
          industry: string | null
          is_featured: boolean | null
          key_features: string[] | null
          link: string | null
          preference_number: number | null
          project_gallery: Json | null
          project_status: string | null
          project_summary: string | null
          roi_metrics: Json | null
          short_description: string | null
          start_date: string | null
          team_size: number | null
          technologies_used: string[] | null
          testimonial_author: string | null
          testimonial_position: string | null
          testimonial_quote: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          budget_range?: string | null
          categories?: string | null
          challenges_solved?: string[] | null
          client_name?: string | null
          created_at?: string | null
          description?: string | null
          domain?: string | null
          duration_months?: number | null
          end_date?: string | null
          full_description?: string | null
          id?: string
          image_url?: string | null
          impact_metrics?: Json | null
          industry?: string | null
          is_featured?: boolean | null
          key_features?: string[] | null
          link?: string | null
          preference_number?: number | null
          project_gallery?: Json | null
          project_status?: string | null
          project_summary?: string | null
          roi_metrics?: Json | null
          short_description?: string | null
          start_date?: string | null
          team_size?: number | null
          technologies_used?: string[] | null
          testimonial_author?: string | null
          testimonial_position?: string | null
          testimonial_quote?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          budget_range?: string | null
          categories?: string | null
          challenges_solved?: string[] | null
          client_name?: string | null
          created_at?: string | null
          description?: string | null
          domain?: string | null
          duration_months?: number | null
          end_date?: string | null
          full_description?: string | null
          id?: string
          image_url?: string | null
          impact_metrics?: Json | null
          industry?: string | null
          is_featured?: boolean | null
          key_features?: string[] | null
          link?: string | null
          preference_number?: number | null
          project_gallery?: Json | null
          project_status?: string | null
          project_summary?: string | null
          roi_metrics?: Json | null
          short_description?: string | null
          start_date?: string | null
          team_size?: number | null
          technologies_used?: string[] | null
          testimonial_author?: string | null
          testimonial_position?: string | null
          testimonial_quote?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      contact_messages: {
        Row: {
          created_at: string
          email: string
          id: number
          message: string
          name: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: number
          message: string
          name: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: number
          message?: string
          name?: string
        }
        Relationships: []
      }
      contact_submissions: {
        Row: {
          company: string | null
          created_at: string | null
          email: string
          id: string
          inquiry_type: string | null
          message: string | null
          name: string
          phone: string | null
        }
        Insert: {
          company?: string | null
          created_at?: string | null
          email: string
          id?: string
          inquiry_type?: string | null
          message?: string | null
          name: string
          phone?: string | null
        }
        Update: {
          company?: string | null
          created_at?: string | null
          email?: string
          id?: string
          inquiry_type?: string | null
          message?: string | null
          name?: string
          phone?: string | null
        }
        Relationships: []
      }
      email_history: {
        Row: {
          created_at: string
          email_type: string
          error_details: string | null
          form_data: Json | null
          form_type: string | null
          id: string
          message_id: string | null
          provider: string | null
          recipient_email: string
          sender_email: string
          sent_at: string
          status: string
          subject: string
          template_used: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          email_type: string
          error_details?: string | null
          form_data?: Json | null
          form_type?: string | null
          id?: string
          message_id?: string | null
          provider?: string | null
          recipient_email: string
          sender_email: string
          sent_at?: string
          status?: string
          subject: string
          template_used?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          email_type?: string
          error_details?: string | null
          form_data?: Json | null
          form_type?: string | null
          id?: string
          message_id?: string | null
          provider?: string | null
          recipient_email?: string
          sender_email?: string
          sent_at?: string
          status?: string
          subject?: string
          template_used?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      employees: {
        Row: {
          account_number: string | null
          address: string | null
          created_at: string | null
          date_of_birth: string | null
          date_of_exit: string | null
          date_of_joining: string
          deleted_at: string | null
          department: string
          education_certifications: string | null
          email: string
          emergency_contact: string | null
          emergency_phone: string | null
          employee_id: string
          employment_type: string
          exit_reason: string | null
          full_name: string
          gender: string | null
          id: string
          ifsc_code: string | null
          is_deleted: boolean | null
          notes: string | null
          phone_number: string | null
          profile_image_url: string | null
          resume_url: string | null
          role_designation: string
          salary: number | null
          supervisor: string | null
          updated_at: string | null
          upi_id: string | null
          work_status: string
        }
        Insert: {
          account_number?: string | null
          address?: string | null
          created_at?: string | null
          date_of_birth?: string | null
          date_of_exit?: string | null
          date_of_joining: string
          deleted_at?: string | null
          department: string
          education_certifications?: string | null
          email: string
          emergency_contact?: string | null
          emergency_phone?: string | null
          employee_id: string
          employment_type: string
          exit_reason?: string | null
          full_name: string
          gender?: string | null
          id?: string
          ifsc_code?: string | null
          is_deleted?: boolean | null
          notes?: string | null
          phone_number?: string | null
          profile_image_url?: string | null
          resume_url?: string | null
          role_designation: string
          salary?: number | null
          supervisor?: string | null
          updated_at?: string | null
          upi_id?: string | null
          work_status?: string
        }
        Update: {
          account_number?: string | null
          address?: string | null
          created_at?: string | null
          date_of_birth?: string | null
          date_of_exit?: string | null
          date_of_joining?: string
          deleted_at?: string | null
          department?: string
          education_certifications?: string | null
          email?: string
          emergency_contact?: string | null
          emergency_phone?: string | null
          employee_id?: string
          employment_type?: string
          exit_reason?: string | null
          full_name?: string
          gender?: string | null
          id?: string
          ifsc_code?: string | null
          is_deleted?: boolean | null
          notes?: string | null
          phone_number?: string | null
          profile_image_url?: string | null
          resume_url?: string | null
          role_designation?: string
          salary?: number | null
          supervisor?: string | null
          updated_at?: string | null
          upi_id?: string | null
          work_status?: string
        }
        Relationships: []
      }
      event_registrations: {
        Row: {
          created_at: string | null
          email: string
          event_id: string | null
          id: string
          name: string
          phone: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          event_id?: string | null
          id?: string
          name: string
          phone?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          event_id?: string | null
          id?: string
          name?: string
          phone?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "event_registrations_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "upcoming_events"
            referencedColumns: ["id"]
          },
        ]
      }
      innovation_lab_applications: {
        Row: {
          additional_info: string | null
          areas_of_interest: string[] | null
          availability: string | null
          collaboration_interest: string | null
          email: string
          experience_level: string
          id: string
          linkedin_profile: string | null
          name: string
          organization: string | null
          phone: string | null
          portfolio_url: string | null
          project_idea: string
          role: string | null
          submitted_at: string
        }
        Insert: {
          additional_info?: string | null
          areas_of_interest?: string[] | null
          availability?: string | null
          collaboration_interest?: string | null
          email: string
          experience_level?: string
          id?: string
          linkedin_profile?: string | null
          name: string
          organization?: string | null
          phone?: string | null
          portfolio_url?: string | null
          project_idea: string
          role?: string | null
          submitted_at?: string
        }
        Update: {
          additional_info?: string | null
          areas_of_interest?: string[] | null
          availability?: string | null
          collaboration_interest?: string | null
          email?: string
          experience_level?: string
          id?: string
          linkedin_profile?: string | null
          name?: string
          organization?: string | null
          phone?: string | null
          portfolio_url?: string | null
          project_idea?: string
          role?: string | null
          submitted_at?: string
        }
        Relationships: []
      }
      interns: {
        Row: {
          created_at: string
          deleted_at: string | null
          department: string
          email: string
          end_date: string | null
          id: string
          intern_id: string
          internship_year: number
          is_deleted: boolean | null
          linkedin_url: string | null
          location: string | null
          mentor_assigned: string | null
          name: string
          notes: string | null
          phone: string | null
          portfolio_url: string | null
          resume_url: string | null
          start_date: string | null
          status: string
          updated_at: string
          verification_token: string | null
          verified_at: string | null
        }
        Insert: {
          created_at?: string
          deleted_at?: string | null
          department: string
          email: string
          end_date?: string | null
          id?: string
          intern_id: string
          internship_year: number
          is_deleted?: boolean | null
          linkedin_url?: string | null
          location?: string | null
          mentor_assigned?: string | null
          name: string
          notes?: string | null
          phone?: string | null
          portfolio_url?: string | null
          resume_url?: string | null
          start_date?: string | null
          status?: string
          updated_at?: string
          verification_token?: string | null
          verified_at?: string | null
        }
        Update: {
          created_at?: string
          deleted_at?: string | null
          department?: string
          email?: string
          end_date?: string | null
          id?: string
          intern_id?: string
          internship_year?: number
          is_deleted?: boolean | null
          linkedin_url?: string | null
          location?: string | null
          mentor_assigned?: string | null
          name?: string
          notes?: string | null
          phone?: string | null
          portfolio_url?: string | null
          resume_url?: string | null
          start_date?: string | null
          status?: string
          updated_at?: string
          verification_token?: string | null
          verified_at?: string | null
        }
        Relationships: []
      }
      investment_inquiries: {
        Row: {
          company: string | null
          created_at: string | null
          email: string
          id: string
          investment_amount: string | null
          investment_type: string | null
          message: string | null
          name: string
          phone: string | null
        }
        Insert: {
          company?: string | null
          created_at?: string | null
          email: string
          id?: string
          investment_amount?: string | null
          investment_type?: string | null
          message?: string | null
          name: string
          phone?: string | null
        }
        Update: {
          company?: string | null
          created_at?: string | null
          email?: string
          id?: string
          investment_amount?: string | null
          investment_type?: string | null
          message?: string | null
          name?: string
          phone?: string | null
        }
        Relationships: []
      }
      jobs: {
        Row: {
          created_at: string
          department: string
          description: string
          id: number
          is_active: boolean
          location: string
          requirements: string
          salary_range: string | null
          title: string
          type: string
        }
        Insert: {
          created_at?: string
          department: string
          description: string
          id?: number
          is_active?: boolean
          location: string
          requirements: string
          salary_range?: string | null
          title: string
          type: string
        }
        Update: {
          created_at?: string
          department?: string
          description?: string
          id?: number
          is_active?: boolean
          location?: string
          requirements?: string
          salary_range?: string | null
          title?: string
          type?: string
        }
        Relationships: []
      }
      join_lab_forms: {
        Row: {
          created_at: string | null
          email: string
          id: string
          interest_area: string | null
          message: string | null
          name: string
          organization: string | null
          phone: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          interest_area?: string | null
          message?: string | null
          name: string
          organization?: string | null
          phone?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          interest_area?: string | null
          message?: string | null
          name?: string
          organization?: string | null
          phone?: string | null
        }
        Relationships: []
      }
      leadership_team: {
        Row: {
          achievements: string | null
          address: string | null
          awards: string | null
          biography: string | null
          contact_number: string | null
          created_at: string | null
          date_of_birth: string | null
          description: string | null
          education: string | null
          email: string | null
          emergency_contact: string | null
          experience_years: number | null
          expertise: string | null
          gender: string | null
          hobbies: string | null
          id: string
          image_url: string | null
          linkedin_url: string | null
          marital_status: string | null
          name: string
          nationality: string | null
          preference_number: number | null
          role: string
          twitter_url: string | null
          updated_at: string | null
          website_url: string | null
        }
        Insert: {
          achievements?: string | null
          address?: string | null
          awards?: string | null
          biography?: string | null
          contact_number?: string | null
          created_at?: string | null
          date_of_birth?: string | null
          description?: string | null
          education?: string | null
          email?: string | null
          emergency_contact?: string | null
          experience_years?: number | null
          expertise?: string | null
          gender?: string | null
          hobbies?: string | null
          id?: string
          image_url?: string | null
          linkedin_url?: string | null
          marital_status?: string | null
          name: string
          nationality?: string | null
          preference_number?: number | null
          role: string
          twitter_url?: string | null
          updated_at?: string | null
          website_url?: string | null
        }
        Update: {
          achievements?: string | null
          address?: string | null
          awards?: string | null
          biography?: string | null
          contact_number?: string | null
          created_at?: string | null
          date_of_birth?: string | null
          description?: string | null
          education?: string | null
          email?: string | null
          emergency_contact?: string | null
          experience_years?: number | null
          expertise?: string | null
          gender?: string | null
          hobbies?: string | null
          id?: string
          image_url?: string | null
          linkedin_url?: string | null
          marital_status?: string | null
          name?: string
          nationality?: string | null
          preference_number?: number | null
          role?: string
          twitter_url?: string | null
          updated_at?: string | null
          website_url?: string | null
        }
        Relationships: []
      }
      otp_verifications: {
        Row: {
          created_at: string | null
          email: string
          expires_at: string
          id: string
          otp_code: string
          otp_type: string
          user_id: string | null
          verified: boolean | null
        }
        Insert: {
          created_at?: string | null
          email: string
          expires_at: string
          id?: string
          otp_code: string
          otp_type: string
          user_id?: string | null
          verified?: boolean | null
        }
        Update: {
          created_at?: string | null
          email?: string
          expires_at?: string
          id?: string
          otp_code?: string
          otp_type?: string
          user_id?: string | null
          verified?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "otp_verifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      partners_inquiries: {
        Row: {
          company: string
          created_at: string | null
          email: string
          id: string
          industry: string | null
          name: string
          partnership_type: string | null
          phone: string | null
          proposal_details: string | null
          website: string | null
        }
        Insert: {
          company: string
          created_at?: string | null
          email: string
          id?: string
          industry?: string | null
          name: string
          partnership_type?: string | null
          phone?: string | null
          proposal_details?: string | null
          website?: string | null
        }
        Update: {
          company?: string
          created_at?: string | null
          email?: string
          id?: string
          industry?: string | null
          name?: string
          partnership_type?: string | null
          phone?: string | null
          proposal_details?: string | null
          website?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          blocked_reason: string | null
          concurrent_sessions: number | null
          created_at: string
          current_session_id: string | null
          email: string
          full_name: string | null
          id: string
          last_activity: string | null
          last_failed_ip: string | null
          last_failed_login: string | null
          last_login: string | null
          last_login_date: string | null
          last_password_change: string | null
          login_count: number | null
          login_history: Json | null
          login_status: string | null
          password_reset_status: string
          reset_expires_at: string | null
          reset_token: string | null
          role: Database["public"]["Enums"]["user_role"]
          session_end_time: string | null
          session_expires_at: string | null
          session_start_time: string | null
          session_token: string | null
          today_login_count: number | null
          two_fa_enabled: boolean | null
          two_fa_verified: boolean | null
          updated_at: string
        }
        Insert: {
          blocked_reason?: string | null
          concurrent_sessions?: number | null
          created_at?: string
          current_session_id?: string | null
          email: string
          full_name?: string | null
          id: string
          last_activity?: string | null
          last_failed_ip?: string | null
          last_failed_login?: string | null
          last_login?: string | null
          last_login_date?: string | null
          last_password_change?: string | null
          login_count?: number | null
          login_history?: Json | null
          login_status?: string | null
          password_reset_status?: string
          reset_expires_at?: string | null
          reset_token?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          session_end_time?: string | null
          session_expires_at?: string | null
          session_start_time?: string | null
          session_token?: string | null
          today_login_count?: number | null
          two_fa_enabled?: boolean | null
          two_fa_verified?: boolean | null
          updated_at?: string
        }
        Update: {
          blocked_reason?: string | null
          concurrent_sessions?: number | null
          created_at?: string
          current_session_id?: string | null
          email?: string
          full_name?: string | null
          id?: string
          last_activity?: string | null
          last_failed_ip?: string | null
          last_failed_login?: string | null
          last_login?: string | null
          last_login_date?: string | null
          last_password_change?: string | null
          login_count?: number | null
          login_history?: Json | null
          login_status?: string | null
          password_reset_status?: string
          reset_expires_at?: string | null
          reset_token?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          session_end_time?: string | null
          session_expires_at?: string | null
          session_start_time?: string | null
          session_token?: string | null
          today_login_count?: number | null
          two_fa_enabled?: boolean | null
          two_fa_verified?: boolean | null
          updated_at?: string
        }
        Relationships: []
      }
      recycle_bin: {
        Row: {
          can_restore: boolean | null
          data: Json
          deleted_at: string
          deleted_by: string | null
          id: string
          original_id: string
          original_table: string
        }
        Insert: {
          can_restore?: boolean | null
          data: Json
          deleted_at?: string
          deleted_by?: string | null
          id?: string
          original_id: string
          original_table: string
        }
        Update: {
          can_restore?: boolean | null
          data?: Json
          deleted_at?: string
          deleted_by?: string | null
          id?: string
          original_id?: string
          original_table?: string
        }
        Relationships: []
      }
      saas_project_requests: {
        Row: {
          budget_range: string | null
          company: string | null
          created_at: string | null
          email: string
          id: string
          key_features: string | null
          name: string
          project_idea: string
          target_users: string | null
          timeline: string | null
        }
        Insert: {
          budget_range?: string | null
          company?: string | null
          created_at?: string | null
          email: string
          id?: string
          key_features?: string | null
          name: string
          project_idea: string
          target_users?: string | null
          timeline?: string | null
        }
        Update: {
          budget_range?: string | null
          company?: string | null
          created_at?: string | null
          email?: string
          id?: string
          key_features?: string | null
          name?: string
          project_idea?: string
          target_users?: string | null
          timeline?: string | null
        }
        Relationships: []
      }
      salary_inquiries: {
        Row: {
          additional_info: string | null
          created_at: string
          current_salary: string | null
          deleted_at: string | null
          department: string
          email: string
          expected_salary: string | null
          experience_years: number | null
          id: string
          is_deleted: boolean | null
          job_title: string | null
          name: string
          phone: string | null
          status: string
          updated_at: string
        }
        Insert: {
          additional_info?: string | null
          created_at?: string
          current_salary?: string | null
          deleted_at?: string | null
          department: string
          email: string
          expected_salary?: string | null
          experience_years?: number | null
          id?: string
          is_deleted?: boolean | null
          job_title?: string | null
          name: string
          phone?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          additional_info?: string | null
          created_at?: string
          current_salary?: string | null
          deleted_at?: string | null
          department?: string
          email?: string
          expected_salary?: string | null
          experience_years?: number | null
          id?: string
          is_deleted?: boolean | null
          job_title?: string | null
          name?: string
          phone?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      scheduled_calls: {
        Row: {
          created_at: string
          date: string
          deleted_at: string | null
          id: number
          is_deleted: boolean | null
          is_done: boolean
          mobile: string | null
          name: string
          reason: string
          time: string
        }
        Insert: {
          created_at?: string
          date: string
          deleted_at?: string | null
          id?: number
          is_deleted?: boolean | null
          is_done?: boolean
          mobile?: string | null
          name: string
          reason: string
          time: string
        }
        Update: {
          created_at?: string
          date?: string
          deleted_at?: string | null
          id?: number
          is_deleted?: boolean | null
          is_done?: boolean
          mobile?: string | null
          name?: string
          reason?: string
          time?: string
        }
        Relationships: []
      }
      support_tickets: {
        Row: {
          company: string | null
          created_at: string
          deleted_at: string | null
          description: string
          email: string
          error_details: string | null
          id: string
          is_deleted: boolean | null
          issue_type: string
          name: string
          phone: string | null
          priority: string
          status: string
          subject: string
          system_info: string | null
          updated_at: string
        }
        Insert: {
          company?: string | null
          created_at?: string
          deleted_at?: string | null
          description: string
          email: string
          error_details?: string | null
          id?: string
          is_deleted?: boolean | null
          issue_type: string
          name: string
          phone?: string | null
          priority?: string
          status?: string
          subject: string
          system_info?: string | null
          updated_at?: string
        }
        Update: {
          company?: string | null
          created_at?: string
          deleted_at?: string | null
          description?: string
          email?: string
          error_details?: string | null
          id?: string
          is_deleted?: boolean | null
          issue_type?: string
          name?: string
          phone?: string | null
          priority?: string
          status?: string
          subject?: string
          system_info?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      technical_consultations: {
        Row: {
          company: string | null
          created_at: string | null
          current_system: string | null
          email: string
          id: string
          integration_needs: string | null
          name: string
          phone: string | null
          technical_requirements: string
          timeline: string | null
        }
        Insert: {
          company?: string | null
          created_at?: string | null
          current_system?: string | null
          email: string
          id?: string
          integration_needs?: string | null
          name: string
          phone?: string | null
          technical_requirements: string
          timeline?: string | null
        }
        Update: {
          company?: string | null
          created_at?: string | null
          current_system?: string | null
          email?: string
          id?: string
          integration_needs?: string | null
          name?: string
          phone?: string | null
          technical_requirements?: string
          timeline?: string | null
        }
        Relationships: []
      }
      upcoming_events: {
        Row: {
          created_at: string
          date: string
          description: string | null
          id: string
          image_url: string | null
          register_link: string | null
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          date: string
          description?: string | null
          id?: string
          image_url?: string | null
          register_link?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          date?: string
          description?: string | null
          id?: string
          image_url?: string | null
          register_link?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      website_case_studies: {
        Row: {
          case_id: string
          category: string | null
          challenge: string | null
          client_name: string | null
          client_role: string | null
          created_at: string | null
          custom_sections: Json | null
          duration: string | null
          gallery_images: Json | null
          industry: string | null
          is_featured: boolean | null
          key_features: Json | null
          main_image: string | null
          preference: number | null
          results: Json | null
          seo_description: string | null
          seo_keywords: Json | null
          seo_title: string | null
          solution: string | null
          status: string | null
          subtitle: string | null
          tags: Json | null
          team_size: number | null
          technologies: Json | null
          testimonial: string | null
          testimonial_author: string | null
          testimonial_role: string | null
          title: string
          updated_at: string | null
          video_links: Json | null
          view_count: number | null
        }
        Insert: {
          case_id: string
          category?: string | null
          challenge?: string | null
          client_name?: string | null
          client_role?: string | null
          created_at?: string | null
          custom_sections?: Json | null
          duration?: string | null
          gallery_images?: Json | null
          industry?: string | null
          is_featured?: boolean | null
          key_features?: Json | null
          main_image?: string | null
          preference?: number | null
          results?: Json | null
          seo_description?: string | null
          seo_keywords?: Json | null
          seo_title?: string | null
          solution?: string | null
          status?: string | null
          subtitle?: string | null
          tags?: Json | null
          team_size?: number | null
          technologies?: Json | null
          testimonial?: string | null
          testimonial_author?: string | null
          testimonial_role?: string | null
          title: string
          updated_at?: string | null
          video_links?: Json | null
          view_count?: number | null
        }
        Update: {
          case_id?: string
          category?: string | null
          challenge?: string | null
          client_name?: string | null
          client_role?: string | null
          created_at?: string | null
          custom_sections?: Json | null
          duration?: string | null
          gallery_images?: Json | null
          industry?: string | null
          is_featured?: boolean | null
          key_features?: Json | null
          main_image?: string | null
          preference?: number | null
          results?: Json | null
          seo_description?: string | null
          seo_keywords?: Json | null
          seo_title?: string | null
          solution?: string | null
          status?: string | null
          subtitle?: string | null
          tags?: Json | null
          team_size?: number | null
          technologies?: Json | null
          testimonial?: string | null
          testimonial_author?: string | null
          testimonial_role?: string | null
          title?: string
          updated_at?: string | null
          video_links?: Json | null
          view_count?: number | null
        }
        Relationships: []
      }
      website_content: {
        Row: {
          content: Json
          id: string
          section: string
          updated_at: string
        }
        Insert: {
          content: Json
          id?: string
          section: string
          updated_at?: string
        }
        Update: {
          content?: Json
          id?: string
          section?: string
          updated_at?: string
        }
        Relationships: []
      }
      website_visits: {
        Row: {
          browser_name: string | null
          city: string | null
          country: string | null
          device_brand: string | null
          device_model: string | null
          device_type: string | null
          id: string
          ip_address: string | null
          os_name: string | null
          path: string
          region: string | null
          user_agent: string | null
          visited_at: string
        }
        Insert: {
          browser_name?: string | null
          city?: string | null
          country?: string | null
          device_brand?: string | null
          device_model?: string | null
          device_type?: string | null
          id?: string
          ip_address?: string | null
          os_name?: string | null
          path: string
          region?: string | null
          user_agent?: string | null
          visited_at?: string
        }
        Update: {
          browser_name?: string | null
          city?: string | null
          country?: string | null
          device_brand?: string | null
          device_model?: string | null
          device_type?: string | null
          id?: string
          ip_address?: string | null
          os_name?: string | null
          path?: string
          region?: string | null
          user_agent?: string | null
          visited_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      employees_public: {
        Row: {
          date_of_joining: string | null
          department: string | null
          employee_id: string | null
          employment_type: string | null
          full_name: string | null
          profile_image_url: string | null
          role_designation: string | null
          supervisor: string | null
          work_status: string | null
        }
        Insert: {
          date_of_joining?: string | null
          department?: string | null
          employee_id?: string | null
          employment_type?: string | null
          full_name?: string | null
          profile_image_url?: string | null
          role_designation?: string | null
          supervisor?: string | null
          work_status?: string | null
        }
        Update: {
          date_of_joining?: string | null
          department?: string | null
          employee_id?: string | null
          employment_type?: string | null
          full_name?: string | null
          profile_image_url?: string | null
          role_designation?: string | null
          supervisor?: string | null
          work_status?: string | null
        }
        Relationships: []
      }
      leadership_team_public: {
        Row: {
          created_at: string | null
          description: string | null
          id: string | null
          image_url: string | null
          name: string | null
          preference_number: number | null
          role: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string | null
          image_url?: string | null
          name?: string | null
          preference_number?: number | null
          role?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string | null
          image_url?: string | null
          name?: string | null
          preference_number?: number | null
          role?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      check_email_rate_limit: {
        Args: {
          email_address: string
          table_name: string
          time_window_seconds?: number
        }
        Returns: boolean
      }
      cleanup_expired_otp: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      complete_password_reset: {
        Args: { p_new_password: string; p_user_id: string }
        Returns: boolean
      }
      example_function: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      extract_and_store_company_data: {
        Args: {
          address?: string
          company_name: string
          email?: string
          phone?: string
          social_platform?: string
          social_url?: string
          website?: string
        }
        Returns: string
      }
      generate_employee_id: {
        Args: { year: number }
        Returns: string
      }
      generate_intern_id: {
        Args: { year: number }
        Returns: string
      }
      generate_otp: {
        Args: {
          p_email: string
          p_expires_minutes?: number
          p_otp_type: string
          p_user_id: string
        }
        Returns: string
      }
      generate_otp_with_history: {
        Args: {
          p_email: string
          p_expires_minutes?: number
          p_otp_type: string
          p_user_id: string
        }
        Returns: string
      }
      get_user_role: {
        Args: { user_id: string }
        Returns: string
      }
      has_role: {
        Args: {
          required_role: Database["public"]["Enums"]["user_role"]
          user_id: string
        }
        Returns: boolean
      }
      is_super_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      is_valid_email: {
        Args: { email_text: string }
        Returns: boolean
      }
      log_admin_action: {
        Args: {
          p_action: string
          p_admin_id: string
          p_ip_address?: string
          p_new_data?: Json
          p_old_data?: Json
          p_record_id?: string
          p_table_name?: string
          p_user_agent?: string
        }
        Returns: undefined
      }
      log_security_event: {
        Args: {
          p_details?: Json
          p_event_type: string
          p_ip_address?: string
          p_user_id: string
        }
        Returns: undefined
      }
      secure_update_user_role: {
        Args: {
          p_new_role: Database["public"]["Enums"]["user_role"]
          p_target_user_id: string
        }
        Returns: boolean
      }
      soft_delete_record: {
        Args: { record_id: string; table_name: string; user_id: string }
        Returns: undefined
      }
      update_api_key_usage: {
        Args: { key_id: string }
        Returns: undefined
      }
      update_login_stats: {
        Args: { user_id: string }
        Returns: undefined
      }
      update_login_status: {
        Args: { p_session_token?: string; p_status: string; p_user_id: string }
        Returns: undefined
      }
      validate_reset_token: {
        Args: { p_token: string }
        Returns: {
          email: string
          is_valid: boolean
          user_id: string
        }[]
      }
      validate_text_lengths: {
        Args: {
          company_val?: string
          email_val?: string
          message_val?: string
          name_val?: string
          phone_val?: string
        }
        Returns: boolean
      }
      verify_otp: {
        Args: { p_otp_code: string; p_otp_type: string; p_user_id: string }
        Returns: boolean
      }
    }
    Enums: {
      user_role: "super_admin" | "admin" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      user_role: ["super_admin", "admin", "user"],
    },
  },
} as const
