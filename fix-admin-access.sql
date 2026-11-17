-- =============================================
-- FIX ADMIN ACCESS
-- Your user logged in successfully but needs admin role!
-- =============================================

-- Step 1: Find your user's UUID
SELECT id, email, created_at 
FROM auth.users 
ORDER BY created_at DESC 
LIMIT 5;

-- Copy the UUID (id) of YOUR email from the results above
-- It looks like: a1b2c3d4-e5f6-7890-abcd-ef1234567890

-- Step 2: Add your user to admin_users table
-- REPLACE 'YOUR_USER_UUID_HERE' with the UUID you copied:

INSERT INTO admin_users (user_id, role)
VALUES ('YOUR_USER_UUID_HERE', 'admin');

-- Example (replace with YOUR UUID):
-- INSERT INTO admin_users (user_id, role)
-- VALUES ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'admin');

-- Step 3: Verify it worked
SELECT au.id, au.role, u.email, au.created_at
FROM admin_users au
JOIN auth.users u ON au.user_id = u.id;

-- You should see your email with role = 'admin'

-- =============================================
-- NOW TRY LOGGING IN AGAIN!
-- Go to: http://localhost:5173/admin/login
-- =============================================
