export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type RsvpAttendance = "Attending" | "Not Attending";

export type Database = {
  public: {
    Tables: {
      rsvp: {
        Row: {
          id: string;
          created_at: string;
          name: string;
          address: string | null;
          attendance: RsvpAttendance;
          guest_count: number | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          name: string;
          address?: string | null;
          attendance: RsvpAttendance;
          guest_count?: number | null;
        };
        Update: {
          id?: string;
          created_at?: string;
          name?: string;
          address?: string | null;
          attendance?: RsvpAttendance;
          guest_count?: number | null;
        };
        Relationships: [];
      };
      wishes: {
        Row: {
          id: string;
          created_at: string;
          name: string;
          message: string;
        };
        Insert: {
          id?: string;
          created_at?: string;
          name: string;
          message: string;
        };
        Update: {
          id?: string;
          created_at?: string;
          name?: string;
          message?: string;
        };
        Relationships: [];
      };
    };
    Views: { [_ in never]: never };
    Functions: { [_ in never]: never };
    Enums: { [_ in never]: never };
    CompositeTypes: { [_ in never]: never };
  };
};
