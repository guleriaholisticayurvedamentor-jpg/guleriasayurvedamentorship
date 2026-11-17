# Quick Reference Guide

## 🔑 Admin Access

### Login URL
```
http://localhost:5173/admin/login (development)
https://yourdomain.com/admin/login (production)
```

### Admin Credentials
Use the email and password you created in Supabase Authentication.

## 📋 Common Admin Tasks

### Upload Images
1. Login to admin dashboard
2. Go to "Media" tab
3. Click "📷 Upload Images"
4. Select one or more image files (JPG, PNG, WebP)
5. Wait for upload confirmation
6. Images appear immediately in public gallery

### Upload Videos
1. Login to admin dashboard
2. Go to "Media" tab
3. Click "🎥 Upload Videos"
4. Select one or more video files (MP4, WebM)
5. Wait for upload confirmation
6. Videos appear immediately in public gallery

### Hide/Show Media
1. In Media tab, find the media item
2. Click the eye icon (👁️) to hide active media
3. Click the lock icon (🔒) to show hidden media

### Delete Media
1. In Media tab, find the media item
2. Click the trash icon (🗑️)
3. Confirm deletion
4. File is removed from storage AND database

### Manage Feedback
1. Go to "Feedback" tab
2. View all customer reviews
3. Search by customer name using search box
4. Click eye icon (👁️) to hide inappropriate reviews
5. Click trash icon (🗑️) to permanently delete

## 🌐 Public Pages

### Customer Feedback
- **URL:** `/feedback`
- **Purpose:** Customers submit reviews and see existing feedback
- **Features:**
  - Star rating (1-5 stars)
  - Customer name and message
  - Real-time updates
  - Load more pagination

### Gallery
- **URL:** `/gallery`
- **Purpose:** Display images and videos uploaded by admin
- **Features:**
  - Image lightbox with navigation
  - Video playback
  - Responsive grid layout
  - Shows only active media

## 🔧 Supabase Quick Commands

### Add New Admin User (SQL)
```sql
-- First create user in Authentication, then:
INSERT INTO admin_users (user_id, role)
VALUES ('user-uuid-from-auth', 'admin');
```

### View All Reviews (SQL)
```sql
SELECT * FROM reviews ORDER BY created_at DESC;
```

### View All Media (SQL)
```sql
SELECT * FROM media ORDER BY created_at DESC;
```

### Check Admin Users (SQL)
```sql
SELECT au.*, u.email
FROM admin_users au
JOIN auth.users u ON au.user_id = u.id;
```

### Manually Publish Hidden Review (SQL)
```sql
UPDATE reviews
SET status = 'published'
WHERE id = 'review-uuid-here';
```

### Manually Hide Review (SQL)
```sql
UPDATE reviews
SET status = 'hidden'
WHERE id = 'review-uuid-here';
```

## 🚨 Emergency Commands

### Delete All Reviews (DANGEROUS!)
```sql
-- Use with extreme caution
TRUNCATE TABLE reviews;
```

### Delete All Media Records (DANGEROUS!)
```sql
-- Use with extreme caution
-- Note: This doesn't delete files from storage
TRUNCATE TABLE media;
```

### Remove Admin Access
```sql
DELETE FROM admin_users WHERE user_id = 'user-uuid-here';
```

## 📊 Statistics Queries

### Get Average Rating
```sql
SELECT AVG(stars) as average_rating, COUNT(*) as total_reviews
FROM reviews
WHERE status = 'published';
```

### Count Media by Type
```sql
SELECT media_type, COUNT(*) as count
FROM media
WHERE is_active = TRUE
GROUP BY media_type;
```

### Recent Reviews (Last 7 Days)
```sql
SELECT * FROM reviews
WHERE created_at >= NOW() - INTERVAL '7 days'
ORDER BY created_at DESC;
```

## 🛠️ Development Commands

### Start Development Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Lint Code
```bash
npm run lint
```

## 📱 URLs Cheat Sheet

| Page | Development | Production |
|------|------------|------------|
| Home | `http://localhost:5173/` | `https://yourdomain.com/` |
| Feedback | `http://localhost:5173/feedback` | `https://yourdomain.com/feedback` |
| Gallery | `http://localhost:5173/gallery` | `https://yourdomain.com/gallery` |
| Admin Login | `http://localhost:5173/admin/login` | `https://yourdomain.com/admin/login` |
| Admin Dashboard | `http://localhost:5173/admin/dashboard` | `https://yourdomain.com/admin/dashboard` |

## 🔐 Security Reminders

1. ✅ Never share your `.env` file
2. ✅ Never commit `.env` to Git
3. ✅ Use strong passwords for admin accounts
4. ✅ Only give admin access to trusted users
5. ✅ Regularly review admin_users table
6. ✅ Monitor suspicious activity in Supabase logs

## 💡 Tips & Tricks

### Tip 1: Bulk Upload Media
You can select multiple files at once when uploading images or videos. They will upload one after another automatically.

### Tip 2: Search Feedback
Use the search box in Feedback tab to quickly find reviews by customer name.

### Tip 3: Keyboard Shortcuts in Lightbox
- **Arrow Left:** Previous image
- **Arrow Right:** Next image
- **Escape:** Close lightbox

### Tip 4: Test Before Deleting
Always toggle visibility (hide) first before permanently deleting feedback or media. This lets you test the impact.

### Tip 5: Monitor Real-time Updates
Keep the feedback page open in one tab and submit a review in another to see real-time updates in action!

## 📞 Need Help?

1. Check `SETUP-INSTRUCTIONS.md` for detailed setup
2. Check browser console for error messages
3. Check Supabase Dashboard > Logs for backend errors
4. Verify `.env` variables are correct
5. Ensure all migration scripts completed successfully

---

**Last Updated:** January 2025
**Version:** 1.0.0
