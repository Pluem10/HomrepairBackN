 const {createClient} = require('@supabase/supabase-js');


 const supabase = createClient(  
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY
    , process.env.SUPABASE_SERVICE_ROLE_KEY,
    process.env.BASE_URL,
    process.env.DB_URL,
);

    module.exports = { supabase };