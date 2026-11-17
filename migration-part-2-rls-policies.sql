-- =============================================
-- PART 2: ROW LEVEL SECURITY POLICIES (SAFE VERSION)
-- Run this AFTER Part 1 completes successfully
-- This version skips policies that already exist
-- =============================================

-- Enable RLS on all tables (safe - won't error if already enabled)
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE media ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- ========== REVIEWS POLICIES ==========

-- Drop existing policies if they exist (to avoid duplicates)
DROP POLICY IF EXISTS "Anyone can view published reviews" ON reviews;
DROP POLICY IF EXISTS "Anyone can submit reviews" ON reviews;
DROP POLICY IF EXISTS "Admins can view all reviews" ON reviews;
DROP POLICY IF EXISTS "Admins can update reviews" ON reviews;
DROP POLICY IF EXISTS "Admins can delete reviews" ON reviews;

-- Now create them fresh
CREATE POLICY "Anyone can view published reviews"
  ON reviews FOR SELECT
  USING (status = 'published');

CREATE POLICY "Anyone can submit reviews"
  ON reviews FOR INSERT
  WITH CHECK (status = 'published');

CREATE POLICY "Admins can view all reviews"
  ON reviews FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.user_id = auth.uid()
      AND admin_users.role = 'admin'
    )
  );

CREATE POLICY "Admins can update reviews"
  ON reviews FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.user_id = auth.uid()
      AND admin_users.role = 'admin'
    )
  );

CREATE POLICY "Admins can delete reviews"
  ON reviews FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.user_id = auth.uid()
      AND admin_users.role = 'admin'
    )
  );

-- ========== MEDIA POLICIES ==========

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Anyone can view active media" ON media;
DROP POLICY IF EXISTS "Admins can view all media" ON media;
DROP POLICY IF EXISTS "Admins can insert media" ON media;
DROP POLICY IF EXISTS "Admins can update media" ON media;
DROP POLICY IF EXISTS "Admins can delete media" ON media;

-- Now create them fresh
CREATE POLICY "Anyone can view active media"
  ON media FOR SELECT
  USING (is_active = TRUE);

CREATE POLICY "Admins can view all media"
  ON media FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.user_id = auth.uid()
      AND admin_users.role = 'admin'
    )
  );

CREATE POLICY "Admins can insert media"
  ON media FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.user_id = auth.uid()
      AND admin_users.role = 'admin'
    )
  );

CREATE POLICY "Admins can update media"
  ON media FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.user_id = auth.uid()
      AND admin_users.role = 'admin'
    )
  );

CREATE POLICY "Admins can delete media"
  ON media FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.user_id = auth.uid()
      AND admin_users.role = 'admin'
    )
  );

-- ========== ADMIN_USERS POLICIES ==========

-- Drop existing policy if it exists
DROP POLICY IF EXISTS "Admins can view admin users" ON admin_users;

-- Now create it fresh
CREATE POLICY "Admins can view admin users"
  ON admin_users FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users au
      WHERE au.user_id = auth.uid()
      AND au.role = 'admin'
    )
  );

-- Enable realtime (skip if already added)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables 
    WHERE pubname = 'supabase_realtime' 
    AND tablename = 'reviews'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE reviews;
  END IF;
END $$;

-- Verify RLS is enabled
SELECT tablename, rowsecurity FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename IN ('reviews', 'media', 'admin_users');

-- All 3 should show rowsecurity = true

-- Count policies created
SELECT tablename, COUNT(*) as policy_count
FROM pg_policies 
WHERE schemaname = 'public'
GROUP BY tablename
ORDER BY tablename;

-- Should show:
-- admin_users: 1 policy
-- media: 5 policies
-- reviews: 5 policies
