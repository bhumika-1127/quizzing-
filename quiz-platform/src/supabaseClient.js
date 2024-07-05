import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'postgresql://postgres.fxcomvptnebplkoxmvob:bhumikanegi@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres'; // Replace with your Supabase URL
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ4Y29tdnB0bmVicGxrb3htdm9iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjAwODY4OTMsImV4cCI6MjAzNTY2Mjg5M30.pZ231tToYqBphgMkZVaM7qjkSPfAi4AfDiwV30Ug2Hg'; // Replace with your Supabase API key
const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;
