import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://furuiiaadggmsjadmzwe.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ1cnVpaWFhZGdnbXNqYWRtendlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzIwMDY1MzgsImV4cCI6MjA0NzU4MjUzOH0.GP9qb29d8mt9Qb0i3wVPvcEI4E0Nw1aG4UbE2INZ4K8";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
