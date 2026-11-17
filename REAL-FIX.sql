-- =============================================
-- REAL FIX - No Infinite Recursion!
-- =============================================

-- The problem: The "Admins can view all admin users" policy 
-- queries admin_users table, which triggers the same policy = infinite loop!

-- SOLUTION: Use only ONE simple policy

-- Step 1: Remove ALL existing policies
DROP POLICY IF EXISTS "Users can check own admin status" ON admin_users;
DROP POLICY IF EXISTS "Admins can view all admin users" ON admin_users;
DROP POLICY IF EXISTS "Admins can view admin users" ON admin_users;

-- Step 2: Create ONE simple policy - users can only see their own record
CREATE POLICY "Users can view own admin record"
  ON admin_users FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

-- That's it! No recursion, no complexity.
-- Users can check if THEY are admin (their own record)
-- Admins can see their own admin record (which is all they need for login)

-- =============================================
-- VERIFY
-- =============================================

SELECT policyname, cmd 
FROM pg_policies 
WHERE tablename = 'admin_users';

-- Should show only 1 policy: "Users can view own admin record"

-- =============================================
-- NOW TRY LOGGING IN!
-- http://localhost:5173/admin/login
-- =============================================
