-- =============================================
-- FINAL DEBUGGING - Find the exact issue
-- =============================================

-- 1. Verify your user exists and has the right ID
SELECT id, email, created_at 
FROM auth.users 
WHERE email = 'praveen@gmail.com';  -- Replace with YOUR email
-- Copy the ID

-- 2. Check if that ID is in admin_users
SELECT * FROM admin_users 
WHERE user_id = '1e05e2c9-e35c-4bb0-9934-52f0e5f0c089';  -- Replace with YOUR ID
-- Should show role = 'admin'

-- 3. Check ALL policies on admin_users table
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check
FROM pg_policies 
WHERE tablename = 'admin_users';

-- 4. Test if RLS is working correctly
-- This simulates what happens when your app tries to check admin status
SET LOCAL ROLE authenticated;
SET LOCAL request.jwt.claims.sub TO '1e05e2c9-e35c-4bb0-9934-52f0e5f0c089';  -- YOUR ID

SELECT role FROM admin_users WHERE user_id = '1e05e2c9-e35c-4bb0-9934-52f0e5f0c089';

RESET ROLE;

-- =============================================
-- IF THE QUERY ABOVE RETURNS NOTHING:
-- The RLS policy is still blocking the query!
-- =============================================

-- NUCLEAR OPTION: Temporarily disable RLS to test
ALTER TABLE admin_users DISABLE ROW LEVEL SECURITY;

-- Test your login now - it should work

-- After confirming it works, re-enable RLS:
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- And recreate the correct policies:
DROP POLICY IF EXISTS "Users can check own admin status" ON admin_users;
DROP POLICY IF EXISTS "Admins can view all admin users" ON admin_users;

CREATE POLICY "Users can check own admin status"
  ON admin_users FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Admins can view all admin users"
  ON admin_users FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users au
      WHERE au.user_id = auth.uid()
      AND au.role = 'admin'
    )
  );
