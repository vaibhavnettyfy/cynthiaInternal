// URL
// https://thvsfjnazyqsbjrmrupr.supabase.co
// key
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRodnNmam5henlxc2Jqcm1ydXByIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTQ2MDE3NzYsImV4cCI6MjAxMDE3Nzc3Nn0.JI69Tr4mrGgySDWSt1bHudmF1MbYpyl5jHrOp_sGR1g

import { createClient } from "@supabase/supabase-js";


const supabaseUrl = process.env.NEXT_PUBLIC_SupaBaseUrl
// "https://thvsfjnazyqsbjrmrupr.supabase.co";
const supabasekey = process.env.NEXT_PUBLIC_SupaBaseKey
  // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRodnNmam5henlxc2Jqcm1ydXByIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTQ2MDE3NzYsImV4cCI6MjAxMDE3Nzc3Nn0.JI69Tr4mrGgySDWSt1bHudmF1MbYpyl5jHrOp_sGR1g";

export const supabase = createClient(supabaseUrl,supabasekey);
