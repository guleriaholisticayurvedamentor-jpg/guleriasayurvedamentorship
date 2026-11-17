-- =============================================
-- CHECK YOUR SETUP PROGRESS
-- Run this to see what's already done
-- =============================================

-- 1. Check if tables exist
SELECT 'Tables Created:' as status;
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('reviews', 'media', 'admin_users');
-- Should show 3 tables

-- 2. Check if RLS is enabled
SELECT 'RLS Enabled:' as status;
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename IN ('reviews', 'media', 'admin_users');
-- All should show rowsecurity = true

-- 3. Check if policies exist
SELECT 'Policies Created:' as status;
SELECT tablename, COUNT(*) as policy_count
FROM pg_policies 
WHERE schemaname = 'public'
AND tablename IN ('reviews', 'media', 'admin_users')
GROUP BY tablename
ORDER BY tablename;
-- Should show: admin_users=1, media=5, reviews=5

-- 4. Check if storage buckets exist
SELECT 'Storage Buckets:' as status;
SELECT name, public, created_at 
FROM storage.buckets 
WHERE name IN ('website-images', 'website-videos');
-- Should show 2 buckets

-- 5. Check if storage policies exist
SELECT 'Storage Policies:' as status;
SELECT policyname 
FROM pg_policies 
WHERE tablename = 'objects'
AND policyname LIKE '%images%' OR policyname LIKE '%videos%'
ORDER BY policyname;
-- Should show 6 policies

-- 6. Check if admin users exist
SELECT 'Admin Users:' as status;
SELECT COUNT(*) as admin_count FROM admin_users;
-- Should show 1 or more

-- 7. Check if realtime is enabled
SELECT 'Realtime Enabled:' as status;
SELECT tablename 
FROM pg_publication_tables 
WHERE pubname = 'supabase_realtime' 
AND tablename = 'reviews';
-- Should show 'reviews'

-- =============================================
-- SUMMARY
-- =============================================
-- ✅ If all checks pass, your setup is COMPLETE!
-- ⚠️ If storage buckets = 0, run Part 3
-- ⚠️ If storage policies = 0, run Part 4
-- ⚠️ If admin_count = 0, create admin user
