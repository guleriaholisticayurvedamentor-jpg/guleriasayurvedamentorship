-- =============================================
-- PART 4: STORAGE POLICIES
-- Run this AFTER Part 3 completes successfully
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

-- Verify storage policies
SELECT schemaname, tablename, policyname 
FROM pg_policies 
WHERE tablename = 'objects' 
ORDER BY policyname;

-- Should show 6 policies
