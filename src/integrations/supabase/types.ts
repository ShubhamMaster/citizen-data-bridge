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
      applications: {
        Row: {
          application_data: Json
          created_at: string
          data_source: string
          goal_id: string
          id: string
          status: string | null
          user_id: string
        }
        Insert: {
          application_data: Json
          created_at?: string
          data_source: string
          goal_id: string
          id?: string
          status?: string | null
          user_id: string
        }
        Update: {
          application_data?: Json
          created_at?: string
          data_source?: string
          goal_id?: string
          id?: string
          status?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "applications_goal_id_fkey"
            columns: ["goal_id"]
            isOneToOne: false
            referencedRelation: "goals"
            referencedColumns: ["id"]
          },
        ]
      }
      dna_analysis: {
        Row: {
          analysis_results: Json | null
          created_at: string
          file_path: string
          genes_analyzed: Json | null
          id: string
          recommendations: Json | null
          status: string | null
          user_id: string
        }
        Insert: {
          analysis_results?: Json | null
          created_at?: string
          file_path: string
          genes_analyzed?: Json | null
          id?: string
          recommendations?: Json | null
          status?: string | null
          user_id: string
        }
        Update: {
          analysis_results?: Json | null
          created_at?: string
          file_path?: string
          genes_analyzed?: Json | null
          id?: string
          recommendations?: Json | null
          status?: string | null
          user_id?: string
        }
        Relationships: []
      }
      fitness_plans: {
        Row: {
          application_id: string
          created_at: string
          difficulty_level: string
          id: string
          plan_data: Json
          user_id: string
          workout_schedule: Json
        }
        Insert: {
          application_id: string
          created_at?: string
          difficulty_level: string
          id?: string
          plan_data: Json
          user_id: string
          workout_schedule: Json
        }
        Update: {
          application_id?: string
          created_at?: string
          difficulty_level?: string
          id?: string
          plan_data?: Json
          user_id?: string
          workout_schedule?: Json
        }
        Relationships: [
          {
            foreignKeyName: "fitness_plans_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "applications"
            referencedColumns: ["id"]
          },
        ]
      }
      goals: {
        Row: {
          created_at: string
          custom_description: string | null
          goal_type: string
          id: string
          is_active: boolean | null
          target_date: string | null
          target_weight_kg: number | null
          user_id: string
        }
        Insert: {
          created_at?: string
          custom_description?: string | null
          goal_type: string
          id?: string
          is_active?: boolean | null
          target_date?: string | null
          target_weight_kg?: number | null
          user_id: string
        }
        Update: {
          created_at?: string
          custom_description?: string | null
          goal_type?: string
          id?: string
          is_active?: boolean | null
          target_date?: string | null
          target_weight_kg?: number | null
          user_id?: string
        }
        Relationships: []
      }
      meal_plans: {
        Row: {
          application_id: string
          created_at: string
          grocery_list: Json | null
          id: string
          macronutrients: Json
          plan_data: Json
          user_id: string
          weekly_plan: Json
        }
        Insert: {
          application_id: string
          created_at?: string
          grocery_list?: Json | null
          id?: string
          macronutrients: Json
          plan_data: Json
          user_id: string
          weekly_plan: Json
        }
        Update: {
          application_id?: string
          created_at?: string
          grocery_list?: Json | null
          id?: string
          macronutrients?: Json
          plan_data?: Json
          user_id?: string
          weekly_plan?: Json
        }
        Relationships: [
          {
            foreignKeyName: "meal_plans_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "applications"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          activity_level: string | null
          alcohol_consumption: string | null
          allergies: string[] | null
          body_fat_percentage: number | null
          created_at: string
          cultural_restrictions: string[] | null
          date_of_birth: string | null
          diet_type: string | null
          dna_report_status: string | null
          dna_report_url: string | null
          first_name: string | null
          gender: string | null
          height_cm: number | null
          id: string
          last_name: string | null
          medical_conditions: string[] | null
          phone_verified: boolean | null
          profile_completed: boolean | null
          religious_restrictions: string[] | null
          sleep_hours: number | null
          smoking_status: string | null
          stress_level: number | null
          updated_at: string
          user_id: string
          water_intake_liters: number | null
          weight_kg: number | null
        }
        Insert: {
          activity_level?: string | null
          alcohol_consumption?: string | null
          allergies?: string[] | null
          body_fat_percentage?: number | null
          created_at?: string
          cultural_restrictions?: string[] | null
          date_of_birth?: string | null
          diet_type?: string | null
          dna_report_status?: string | null
          dna_report_url?: string | null
          first_name?: string | null
          gender?: string | null
          height_cm?: number | null
          id?: string
          last_name?: string | null
          medical_conditions?: string[] | null
          phone_verified?: boolean | null
          profile_completed?: boolean | null
          religious_restrictions?: string[] | null
          sleep_hours?: number | null
          smoking_status?: string | null
          stress_level?: number | null
          updated_at?: string
          user_id: string
          water_intake_liters?: number | null
          weight_kg?: number | null
        }
        Update: {
          activity_level?: string | null
          alcohol_consumption?: string | null
          allergies?: string[] | null
          body_fat_percentage?: number | null
          created_at?: string
          cultural_restrictions?: string[] | null
          date_of_birth?: string | null
          diet_type?: string | null
          dna_report_status?: string | null
          dna_report_url?: string | null
          first_name?: string | null
          gender?: string | null
          height_cm?: number | null
          id?: string
          last_name?: string | null
          medical_conditions?: string[] | null
          phone_verified?: boolean | null
          profile_completed?: boolean | null
          religious_restrictions?: string[] | null
          sleep_hours?: number | null
          smoking_status?: string | null
          stress_level?: number | null
          updated_at?: string
          user_id?: string
          water_intake_liters?: number | null
          weight_kg?: number | null
        }
        Relationships: []
      }
      progress_tracking: {
        Row: {
          created_at: string
          date: string
          id: string
          meals_logged: Json | null
          notes: string | null
          user_id: string
          water_intake_liters: number | null
          weight_kg: number | null
          workouts_completed: Json | null
        }
        Insert: {
          created_at?: string
          date: string
          id?: string
          meals_logged?: Json | null
          notes?: string | null
          user_id: string
          water_intake_liters?: number | null
          weight_kg?: number | null
          workouts_completed?: Json | null
        }
        Update: {
          created_at?: string
          date?: string
          id?: string
          meals_logged?: Json | null
          notes?: string | null
          user_id?: string
          water_intake_liters?: number | null
          weight_kg?: number | null
          workouts_completed?: Json | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
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
    Enums: {},
  },
} as const
