export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      admin_sessions: {
        Row: {
          created_at: string
          expires_at: string
          id: string
          is_active: boolean | null
          session_token: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          expires_at: string
          id?: string
          is_active?: boolean | null
          session_token?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          expires_at?: string
          id?: string
          is_active?: boolean | null
          session_token?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      admin_users: {
        Row: {
          created_at: string
          email: string
          id: string
          last_login: string | null
          name: string
          password_hash: string
          session_expires_at: string | null
          session_token: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          last_login?: string | null
          name: string
          password_hash: string
          session_expires_at?: string | null
          session_token?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          last_login?: string | null
          name?: string
          password_hash?: string
          session_expires_at?: string | null
          session_token?: string | null
          updated_at?: string
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
      profiles: {
        Row: {
          created_at: string
          email: string
          full_name: string | null
          id: string
          last_login: string | null
          last_login_date: string | null
          login_count: number | null
          role: Database["public"]["Enums"]["user_role"]
          today_login_count: number | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          full_name?: string | null
          id: string
          last_login?: string | null
          last_login_date?: string | null
          login_count?: number | null
          role?: Database["public"]["Enums"]["user_role"]
          today_login_count?: number | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          full_name?: string | null
          id?: string
          last_login?: string | null
          last_login_date?: string | null
          login_count?: number | null
          role?: Database["public"]["Enums"]["user_role"]
          today_login_count?: number | null
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
      [_ in never]: never
    }
    Functions: {
      generate_intern_id: {
        Args: { year: number }
        Returns: string
      }
      get_user_role: {
        Args: { user_id: string }
        Returns: Database["public"]["Enums"]["user_role"]
      }
      has_role: {
        Args: {
          user_id: string
          required_role: Database["public"]["Enums"]["user_role"]
        }
        Returns: boolean
      }
      soft_delete_record: {
        Args: { table_name: string; record_id: string; user_id: string }
        Returns: undefined
      }
      update_login_stats: {
        Args: { user_id: string }
        Returns: undefined
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

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
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
