-- =============================================
-- TEST ADMIN QUERY AS AUTHENTICATED USER
-- This simulates what your app does when checking admin status
-- =============================================

-- First, let's see if the query works at all
SELECT role
FROM admin_users
WHERE user_id = '1e05e2c9-e35c-4bb0-9934-52f0e5f0c089';

-- Should return: role = 'admin'

-- Now check if RLS policy allows authenticated users to query this
-- Run this to see the current policies:
SELECT schemaname, tablename, policyname, qual 
FROM pg_policies 
WHERE tablename = 'admin_users';

-- =============================================
-- POTENTIAL FIX: Update RLS Policy
-- =============================================

-- The issue might be that the RLS policy is too restrictive
-- Let's make sure authenticated users can check their own admin status

-- Drop the existing policy
DROP POLICY IF EXISTS "Admins can view admin users" ON admin_users;
DROP POLICY IF EXISTS "Users can check own admin status" ON admin_users;

-- Create a new policy that allows:
-- 1. Users to check their own admin status
-- 2. Admins to view all admin users

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

-- =============================================
-- VERIFY
-- =============================================

-- Check policies
SELECT policyname FROM pg_policies WHERE tablename = 'admin_users';

-- Should show 2 policies now
