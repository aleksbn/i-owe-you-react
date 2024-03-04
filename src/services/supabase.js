import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://npxlhdgirqrkpiswxhsx.supabase.co";
const supabaseKey =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5weGxoZGdpcnFya3Bpc3d4aHN4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDkyOTI3MzQsImV4cCI6MjAyNDg2ODczNH0.kXoXrrBNPU9ATsC-2IklHcQBLY4XXJJBQ1KyhxyWJ6o";
const supabase = createClient(supabaseUrl, supabaseKey, {
	db: { schema: "e2897c1c-5417-4824-8e29-1a72576a2481" },
});

export default supabase;
