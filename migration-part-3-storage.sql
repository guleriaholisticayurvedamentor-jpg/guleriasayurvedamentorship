-- =============================================
-- PART 3: STORAGE BUCKETS AND POLICIES
-- Run this AFTER Part 2 completes successfully
-- =============================================

-- Create storage buckets
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES 
  ('website-images', 'website-images', true, 5242880, ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp']),
  ('website-videos', 'website-videos', true, 52428800, ARRAY['video/mp4', 'video/webm'])
ON CONFLICT (id) DO NOTHING;

-- Verify buckets created
SELECT id, name, public FROM storage.buckets 
WHERE name IN ('website-images', 'website-videos');

-- Should show 2 buckets
