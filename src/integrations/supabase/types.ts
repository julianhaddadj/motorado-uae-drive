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
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      listings: {
        Row: {
          approval_status: string | null
          approved_at: string | null
          approved_by: string | null
          body_type: Database["public"]["Enums"]["body_type"]
          contact_phone_country_code: string | null
          contact_phone_has_whatsapp: boolean | null
          contact_phone_number: string | null
          created_at: string
          description: string | null
          doors: string | null
          emirate: string
          exterior_color: string | null
          fuel_type: string | null
          horsepower: string | null
          id: string
          images: string[] | null
          insured_in_uae: string | null
          interior_color: string | null
          is_premium: boolean | null
          is_published: boolean | null
          make: string
          mileage_km: number
          model: string
          price_aed: number
          regional_spec: Database["public"]["Enums"]["regional_spec"]
          rejection_reason: string | null
          slug: string
          steering_side: string | null
          transmission: string | null
          trim: string | null
          updated_at: string
          user_id: string
          warranty: string | null
          year: number
        }
        Insert: {
          approval_status?: string | null
          approved_at?: string | null
          approved_by?: string | null
          body_type: Database["public"]["Enums"]["body_type"]
          contact_phone_country_code?: string | null
          contact_phone_has_whatsapp?: boolean | null
          contact_phone_number?: string | null
          created_at?: string
          description?: string | null
          doors?: string | null
          emirate: string
          exterior_color?: string | null
          fuel_type?: string | null
          horsepower?: string | null
          id?: string
          images?: string[] | null
          insured_in_uae?: string | null
          interior_color?: string | null
          is_premium?: boolean | null
          is_published?: boolean | null
          make: string
          mileage_km: number
          model: string
          price_aed: number
          regional_spec: Database["public"]["Enums"]["regional_spec"]
          rejection_reason?: string | null
          slug: string
          steering_side?: string | null
          transmission?: string | null
          trim?: string | null
          updated_at?: string
          user_id: string
          warranty?: string | null
          year: number
        }
        Update: {
          approval_status?: string | null
          approved_at?: string | null
          approved_by?: string | null
          body_type?: Database["public"]["Enums"]["body_type"]
          contact_phone_country_code?: string | null
          contact_phone_has_whatsapp?: boolean | null
          contact_phone_number?: string | null
          created_at?: string
          description?: string | null
          doors?: string | null
          emirate?: string
          exterior_color?: string | null
          fuel_type?: string | null
          horsepower?: string | null
          id?: string
          images?: string[] | null
          insured_in_uae?: string | null
          interior_color?: string | null
          is_premium?: boolean | null
          is_published?: boolean | null
          make?: string
          mileage_km?: number
          model?: string
          price_aed?: number
          regional_spec?: Database["public"]["Enums"]["regional_spec"]
          rejection_reason?: string | null
          slug?: string
          steering_side?: string | null
          transmission?: string | null
          trim?: string | null
          updated_at?: string
          user_id?: string
          warranty?: string | null
          year?: number
        }
        Relationships: []
      }
      makes: {
        Row: {
          created_at: string
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
      models: {
        Row: {
          created_at: string
          id: string
          make_id: string
          name: string
        }
        Insert: {
          created_at?: string
          id?: string
          make_id: string
          name: string
        }
        Update: {
          created_at?: string
          id?: string
          make_id?: string
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "models_make_id_fkey"
            columns: ["make_id"]
            isOneToOne: false
            referencedRelation: "makes"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          created_at: string
          id: string
          is_read: boolean
          message: string
          title: string
          type: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_read?: boolean
          message: string
          title: string
          type: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          is_read?: boolean
          message?: string
          title?: string
          type?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          display_name: string | null
          id: string
          phone: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          display_name?: string | null
          id?: string
          phone?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          display_name?: string | null
          id?: string
          phone?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user"
      body_type:
        | "SUV"
        | "Hatchback"
        | "Sedan"
        | "Coupe"
        | "Convertible"
        | "Pickup"
        | "Wagon"
        | "Van/Minivan"
        | "Crossover"
        | "Other"
      regional_spec:
        | "GCC"
        | "Japanese"
        | "Chinese"
        | "American"
        | "Euro"
        | "Other"
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
      app_role: ["admin", "user"],
      body_type: [
        "SUV",
        "Hatchback",
        "Sedan",
        "Coupe",
        "Convertible",
        "Pickup",
        "Wagon",
        "Van/Minivan",
        "Crossover",
        "Other",
      ],
      regional_spec: [
        "GCC",
        "Japanese",
        "Chinese",
        "American",
        "Euro",
        "Other",
      ],
    },
  },
} as const
