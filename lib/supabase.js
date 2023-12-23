import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://mbvmzxahclvkjtxkkmjp.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1idm16eGFoY2x2a2p0eGtrbWpwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDE0NjE2MDcsImV4cCI6MjAxNzAzNzYwN30.nMNPqHEs9LpdCT1Aly4TGpZA5U3Uu4JChkIUXmNoxLg";

export const supabase = createClient(supabaseUrl, supabaseKey);