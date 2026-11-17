-- =============================================
-- DIAGNOSE ADMIN ACCESS ISSUE
-- You're already an admin but getting "Unauthorized" error
-- =============================================

-- 1. Check your admin user record
SELECT au.id, au.user_id, au.role, u.email, au.created_at
FROM admin_users au
JOIN auth.users u ON au.user_id = u.id
WHERE au.user_id = '1e05e2c9-e35c-4bb0-9934-52f0e5f0c089';

-- Should show: role = 'admin'

-- 2. Verify the role is exactly 'admin' (not 'Admin' or 'ADMIN')
SELECT role, length(role), role = 'admin' as is_correct
FROM admin_users
WHERE user_id = '1e05e2c9-e35c-4bb0-9934-52f0e5f0c089';

-- Should show: is_correct = true

-- 3. Check if there are any issues with the role
SELECT * FROM admin_users WHERE user_id = '1e05e2c9-e35c-4bb0-9934-52f0e5f0c089';

-- =============================================
-- IF ROLE IS NOT 'admin', FIX IT:
-- =============================================

UPDATE admin_users 
SET role = 'admin' 
WHERE user_id = '1e05e2c9-e35c-4bb0-9934-52f0e5f0c089';

-- =============================================
-- VERIFY FIX
-- =============================================

SELECT au.role, u.email
FROM admin_users au
JOIN auth.users u ON au.user_id = u.id
WHERE au.user_id = '1e05e2c9-e35c-4bb0-9934-52f0e5f0c089';

-- Should show role = 'admin' with your email
