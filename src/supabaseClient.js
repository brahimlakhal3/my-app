import {createClient} from "@supabase/supabase-js";

const supabaseUrl = 'https://tsodxpetpiqblomjaeit.supabase.co'
const supabaseApiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRzb2R4cGV0cGlxYmxvbWphZWl0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQzNDA3ODEsImV4cCI6MjA3OTkxNjc4MX0.m8Mi98h9G2MKVov1c2Kw6552cvMVqjSumO0oVLiqDHU'

export const supabaseClient = createClient(supabaseUrl, supabaseApiKey);