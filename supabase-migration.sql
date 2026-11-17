-- =============================================
-- COMPLETE SUPABASE SETUP SCRIPT
-- Run this ENTIRE script in your Supabase SQL Editor
-- This will create tables, buckets, policies, and everything needed
-- =============================================

-- =============================================
-- 1. CREATE TABLES
-- =============================================

-- Table 1: reviews (Customer Feedback)
CREATE TABLE IF NOT EXISTS reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_name TEXT NOT NULL,
  feedback TEXT NOT NULL,
  stars INTEGER NOT NULL CHECK (stars >= 1 AND stars <= 5),
  status TEXT DEFAULT 'published' CHECK (status IN ('published', 'hidden')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table 2: media (Images and Videos)
CREATE TABLE IF NOT EXISTS media (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT,
  description TEXT,
  media_url TEXT NOT NULL,
  storage_path TEXT NOT NULL,
  media_type TEXT NOT NULL CHECK (media_type IN ('image', 'video')),
  is_active BOOLEAN DEFAULT TRUE,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table 3: admin_users (Admin Access Control)
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT DEFAULT 'admin',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id)
);

-- =============================================
-- 2. CREATE INDEXES
-- =============================================

CREATE INDEX IF NOT EXISTS idx_reviews_status ON reviews(status);
CREATE INDEX IF NOT EXISTS idx_reviews_created_at ON reviews(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_reviews_stars ON reviews(stars);

CREATE INDEX IF NOT EXISTS idx_media_active ON media(is_active);
CREATE INDEX IF NOT EXISTS idx_media_type ON media(media_type);
CREATE INDEX IF NOT EXISTS idx_media_order ON media(display_order, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_admin_users_user_id ON admin_users(user_id);

-- =============================================
-- 3. ROW LEVEL SECURITY (RLS) POLICIES
-- =============================================

-- Enable RLS on all tables
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE media ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- ========== REVIEWS POLICIES ==========

-- Public users can view published reviews
CREATE POLICY "Anyone can view published reviews"
  ON reviews FOR SELECT
  USING (status = 'published');

-- Public users can insert reviews (auto-published)
CREATE POLICY "Anyone can submit reviews"
  ON reviews FOR INSERT
  WITH CHECK (status = 'published');

-- Admins can view all reviews
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

-- Admins can update review status
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

-- Admins can delete reviews
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

-- Public users can view active media
CREATE POLICY "Anyone can view active media"
  ON media FOR SELECT
  USING (is_active = TRUE);

-- Admins can view all media
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

-- Admins can insert media
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

-- Admins can update media
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

-- Admins can delete media
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

-- Only admins can view admin_users table
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

-- =============================================
-- 4. STORAGE BUCKETS SETUP (AUTOMATIC)
-- =============================================

-- Create storage buckets via SQL
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES 
  ('website-images', 'website-images', true, 5242880, ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp']),
  ('website-videos', 'website-videos', true, 52428800, ARRAY['video/mp4', 'video/webm'])
ON CONFLICT (id) DO NOTHING;

-- =============================================
-- 5. STORAGE POLICIES (AUTOMATIC)
-- =============================================

-- Policies for website-images bucket

-- 1. Public read access for images
CREATE POLICY "Public read access for images"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'website-images');

-- 2. Admins can upload images
CREATE POLICY "Admins can upload images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'website-images' 
  AND auth.uid() IN (SELECT user_id FROM admin_users WHERE role = 'admin')
);

-- 3. Admins can delete images
CREATE POLICY "Admins can delete images"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'website-images' 
  AND auth.uid() IN (SELECT user_id FROM admin_users WHERE role = 'admin')
);

-- Policies for website-videos bucket

-- 4. Public read access for videos
CREATE POLICY "Public read access for videos"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'website-videos');

-- 5. Admins can upload videos
CREATE POLICY "Admins can upload videos"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'website-videos' 
  AND auth.uid() IN (SELECT user_id FROM admin_users WHERE role = 'admin')
);

-- 6. Admins can delete videos
CREATE POLICY "Admins can delete videos"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'website-videos' 
  AND auth.uid() IN (SELECT user_id FROM admin_users WHERE role = 'admin')
);

-- =============================================
-- 6. CREATE ADMIN USER (YOU NEED TO DO THIS MANUALLY)
-- =============================================

-- STEP 1: Create user in Supabase Authentication Dashboard
-- Go to: Authentication > Users > Add User
-- Email: your-email@example.com
-- Password: your-strong-password
-- Auto Confirm: YES

-- STEP 2: After creating the user, copy their UUID from the dashboard
-- Then run this query (replace YOUR_USER_UUID_HERE):

-- UNCOMMENT AND RUN THIS AFTER CREATING USER IN AUTH DASHBOARD:
-- INSERT INTO admin_users (user_id, role)
-- VALUES ('YOUR_USER_UUID_HERE', 'admin');

-- EXAMPLE (replace with your actual UUID):
-- INSERT INTO admin_users (user_id, role)
-- VALUES ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'admin');

-- =============================================
-- 7. VERIFICATION QUERIES
-- =============================================

-- Enable realtime for reviews table (optional but recommended)
ALTER PUBLICATION supabase_realtime ADD TABLE reviews;

-- =============================================
-- 7. VERIFICATION QUERIES
-- =============================================

-- Verify tables were created:
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('reviews', 'media', 'admin_users');

-- Verify RLS is enabled:
SELECT tablename, rowsecurity FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename IN ('reviews', 'media', 'admin_users');

-- Verify storage buckets:
SELECT id, name, public FROM storage.buckets 
WHERE name IN ('website-images', 'website-videos');

-- Verify storage policies:
SELECT schemaname, tablename, policyname 
FROM pg_policies 
WHERE tablename = 'objects' 
ORDER BY policyname;

-- Verify admin users (run AFTER you create admin user):
-- SELECT au.*, u.email
-- FROM admin_users au
-- JOIN auth.users u ON au.user_id = u.id;

-- =============================================
-- 8. REALTIME SUBSCRIPTIONS
-- =============================================

-- Enable realtime for reviews table (optional but recommended)
ALTER PUBLICATION supabase_realtime ADD TABLE reviews;

-- =============================================
-- ✅ MIGRATION COMPLETE
-- =============================================

-- What was created:
-- ✅ 3 database tables (reviews, media, admin_users)
-- ✅ All indexes for performance
-- ✅ Row Level Security policies
-- ✅ 2 storage buckets (website-images, website-videos)
-- ✅ 6 storage policies (3 per bucket)
-- ✅ Realtime enabled

-- What you still need to do:
-- ⚠️ Create admin user in Authentication dashboard
-- ⚠️ Run the INSERT INTO admin_users query with your user's UUID
-- ⚠️ Update .env file with your Supabase credentials

-- Test queries after admin user is created:
-- SELECT * FROM reviews;
-- SELECT * FROM media;
-- SELECT * FROM admin_users;
-- SELECT * FROM storage.buckets;

