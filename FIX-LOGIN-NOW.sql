-- =============================================
-- FIX ADMIN LOGIN - RUN THIS NOW!
-- =============================================

-- This fixes the "Unauthorized: Admin access only" error
-- The problem: RLS policy prevents users from checking their own admin status

-- STEP 1: Remove the problematic policy
DROP POLICY IF EXISTS "Admins can view admin users" ON admin_users;

-- STEP 2: Create a policy that allows users to check if THEY are admin
CREATE POLICY "Users can check own admin status"
  ON admin_users FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

-- STEP 3: Also allow admins to view all admin users (for the dashboard)
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

-- =============================================
-- VERIFY IT WORKED
-- =============================================

-- Should show 2 policies for admin_users table
SELECT policyname 
FROM pg_policies 
WHERE tablename = 'admin_users'
ORDER BY policyname;

-- Expected output:
-- "Admins can view all admin users"
-- "Users can check own admin status"

-- =============================================
-- ✅ DONE! NOW TRY LOGGING IN AGAIN
-- Go to: http://localhost:5173/admin/login
-- =============================================
