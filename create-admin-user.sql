-- =============================================
-- CREATE ADMIN USER
-- =============================================

-- STEP 1: First, create the user in Supabase Dashboard
-- 1. Go to: https://supabase.com → Your Project
-- 2. Click "Authentication" in sidebar
-- 3. Click "Users" tab
-- 4. Click "Add user" → "Create new user"
-- 5. Enter:
--    Email: your-email@example.com
--    Password: your-strong-password
--    ☑️ Auto Confirm User (CHECK THIS!)
-- 6. Click "Create user"
-- 7. COPY the user's UUID (ID) from the users list
--    It looks like: a1b2c3d4-e5f6-7890-abcd-ef1234567890

-- STEP 2: Run this query (replace YOUR_USER_UUID_HERE with the UUID you copied)

INSERT INTO admin_users (user_id, role)
VALUES ('YOUR_USER_UUID_HERE', 'admin');

-- EXAMPLE (replace with your actual UUID):
-- INSERT INTO admin_users (user_id, role)
-- VALUES ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'admin');

-- STEP 3: Verify it worked:

SELECT au.id, au.user_id, au.role, u.email, au.created_at
FROM admin_users au
JOIN auth.users u ON au.user_id = u.id;

-- You should see your email and role = 'admin'

-- =============================================
-- DONE! You can now login at:
-- http://localhost:5173/admin/login
-- =============================================
