# Testing Checklist

Use this checklist to verify all features are working correctly after setup.

## ✅ Initial Setup

### Environment Configuration
- [ ] `.env` file created with correct values
- [ ] `VITE_SUPABASE_URL` is set
- [ ] `VITE_SUPABASE_ANON_KEY` is set
- [ ] Dev server starts without errors (`npm run dev`)

### Supabase Database
- [ ] SQL migration script executed successfully
- [ ] `reviews` table created
- [ ] `media` table created
- [ ] `admin_users` table created
- [ ] RLS is enabled on all tables
- [ ] Indexes created successfully

### Supabase Storage
- [ ] `website-images` bucket created
- [ ] `website-videos` bucket created
- [ ] Storage policies configured for both buckets
- [ ] Public read access enabled

### Admin User
- [ ] First admin user created in Supabase Authentication
- [ ] User's UUID copied
- [ ] UUID added to `admin_users` table
- [ ] Can see admin user in SQL query results

## ✅ Public Features Testing

### Navigation
- [ ] Navigate to home page (`/`)
- [ ] Click "Feedback" in navigation menu
- [ ] Navigate to `/feedback` successfully
- [ ] Click "Gallery" in navigation menu
- [ ] Navigate to `/gallery` successfully
- [ ] All pages load without console errors

### Customer Feedback - Submission
- [ ] Navigate to `/feedback`
- [ ] Form displays correctly
- [ ] All form fields present (Name, Message, Stars)
- [ ] Star rating is clickable
- [ ] Stars highlight when clicked
- [ ] Try to submit empty form (should show validation error)
- [ ] Enter name only (should show validation error)
- [ ] Enter name and message only (should show validation error)
- [ ] Fill all fields correctly
- [ ] Submit form
- [ ] Success message appears
- [ ] Form clears after submission
- [ ] New review appears in list immediately

### Customer Feedback - Display
- [ ] Reviews list displays below form
- [ ] Can see customer name
- [ ] Can see feedback message
- [ ] Can see star rating
- [ ] Can see submission date
- [ ] Stats show correct total reviews
- [ ] Stats show correct average rating
- [ ] If 6+ reviews exist, "Load More" button appears
- [ ] Click "Load More" loads additional reviews

### Real-time Updates (Advanced Test)
- [ ] Open `/feedback` in two browser windows
- [ ] Submit feedback in window 1
- [ ] Verify feedback appears in window 2 automatically (no refresh needed)
- [ ] Average rating updates in both windows

### Gallery - Before Upload
- [ ] Navigate to `/gallery`
- [ ] Page loads successfully
- [ ] Empty state message displays (if no media uploaded yet)
- [ ] OR media displays if already uploaded

## ✅ Admin Features Testing

### Admin Login
- [ ] Navigate to `/admin/login`
- [ ] Login page displays correctly
- [ ] Try to login with wrong email (should show error)
- [ ] Try to login with wrong password (should show error)
- [ ] Login with correct admin credentials
- [ ] Redirected to `/admin/dashboard`
- [ ] No console errors

### Admin Dashboard - Overview
- [ ] Dashboard displays correctly
- [ ] Sidebar shows three tabs: Overview, Feedback, Media
- [ ] Overview tab is active by default
- [ ] Statistics cards display:
  - [ ] Total Reviews count
  - [ ] Average Rating (with star)
  - [ ] Total Images count
  - [ ] Total Videos count
  - [ ] Active Media count
  - [ ] Hidden Media count

### Admin Dashboard - Feedback Management
- [ ] Click "Feedback" tab in sidebar
- [ ] All submitted reviews display in table
- [ ] Table shows: Customer, Feedback, Rating, Date, Status, Actions
- [ ] Search box appears above table
- [ ] Type customer name in search box
- [ ] Table filters results correctly
- [ ] Clear search box
- [ ] All reviews appear again

#### Feedback Actions
- [ ] Find a published review
- [ ] Click eye icon (👁️) to hide it
- [ ] Status changes to "hidden"
- [ ] Click lock icon (🔒) to republish it
- [ ] Status changes to "published"
- [ ] Click trash icon (🗑️) on a test review
- [ ] Confirmation dialog appears
- [ ] Click "OK" to confirm
- [ ] Review is deleted
- [ ] Table updates automatically

#### Verify Hidden Reviews
- [ ] Hide a review in admin dashboard
- [ ] Open `/feedback` in new tab (logged out)
- [ ] Hidden review does NOT appear in public list
- [ ] Average rating recalculates without hidden review

### Admin Dashboard - Media Management
- [ ] Click "Media" tab in sidebar
- [ ] Two upload buttons appear: "📷 Upload Images" and "🎥 Upload Videos"

#### Image Upload
- [ ] Click "📷 Upload Images"
- [ ] File selector opens
- [ ] Select 1-3 image files (JPG, PNG, or WebP)
- [ ] "Uploading..." message appears
- [ ] Upload completes
- [ ] Success message displays
- [ ] Images appear in media grid
- [ ] Each image card shows:
  - [ ] Image preview
  - [ ] Title
  - [ ] Active status badge
  - [ ] Eye icon and trash icon

#### Video Upload
- [ ] Click "🎥 Upload Videos"
- [ ] File selector opens
- [ ] Select 1-2 video files (MP4 or WebM, under 50MB)
- [ ] "Uploading..." message appears
- [ ] Upload completes
- [ ] Success message displays
- [ ] Videos appear in media grid
- [ ] Each video card shows:
  - [ ] Video preview with controls
  - [ ] Title
  - [ ] Active status badge
  - [ ] Eye icon and trash icon

#### Media Visibility Toggle
- [ ] Find an active media item
- [ ] Click eye icon (👁️) to hide it
- [ ] Status badge changes to "Hidden"
- [ ] Icon changes to lock (🔒)
- [ ] Click lock icon to show it again
- [ ] Status badge changes to "Active"
- [ ] Icon changes to eye (👁️)

#### Media Deletion
- [ ] Find a test media item
- [ ] Click trash icon (🗑️)
- [ ] Confirmation dialog appears
- [ ] Click "OK" to confirm
- [ ] Media is deleted
- [ ] Grid updates automatically
- [ ] Statistics update (active count decreases)

#### Verify Media Visibility
- [ ] Upload a new image (should be active by default)
- [ ] Open `/gallery` in new tab (logged out)
- [ ] New image appears in public gallery
- [ ] Go back to admin dashboard
- [ ] Hide the image
- [ ] Refresh `/gallery` tab
- [ ] Hidden image does NOT appear

### Gallery - After Upload
- [ ] Navigate to `/gallery` (logged out)
- [ ] Only active/visible media displays
- [ ] Images appear in grid
- [ ] Videos appear in grid (if uploaded)
- [ ] Click an image
- [ ] Lightbox opens
- [ ] Image displays in full screen
- [ ] Navigation buttons appear (if multiple images)
- [ ] Click right arrow
- [ ] Next image loads
- [ ] Click left arrow
- [ ] Previous image loads
- [ ] Press Escape key
- [ ] Lightbox closes
- [ ] Click a video
- [ ] Video plays with native controls

### Admin Logout
- [ ] In admin dashboard, click "🚪 Logout" button
- [ ] Redirected to `/admin/login`
- [ ] Try to navigate to `/admin/dashboard` manually
- [ ] Automatically redirected back to `/admin/login`

## ✅ Security Testing

### Protected Routes
- [ ] Clear browser cookies/session
- [ ] Try to access `/admin/dashboard` directly
- [ ] Should redirect to `/admin/login`
- [ ] Login as admin
- [ ] Now can access `/admin/dashboard`

### Public Restrictions
- [ ] Open browser console on `/feedback`
- [ ] Try to manually call delete or update functions
- [ ] Should fail with permission error (if attempted)

### RLS Verification (Advanced)
- [ ] Open Supabase SQL Editor
- [ ] Run: `SELECT * FROM reviews;` (as anon user)
- [ ] Should only see published reviews
- [ ] Try: `UPDATE reviews SET status = 'hidden' WHERE id = 'some-id';`
- [ ] Should fail with permission denied

## ✅ Responsive Design Testing

### Mobile View (< 768px)
- [ ] Open DevTools and set viewport to iPhone
- [ ] Navigate to `/feedback`
- [ ] Form displays in single column
- [ ] Form is easy to use on mobile
- [ ] Submit feedback successfully
- [ ] Reviews display in single column
- [ ] All text is readable
- [ ] Navigate to `/gallery`
- [ ] Media grid adapts to mobile
- [ ] Login to admin dashboard
- [ ] Sidebar converts to top navigation or hamburger menu
- [ ] All admin features accessible

### Tablet View (768px - 1024px)
- [ ] Set viewport to iPad
- [ ] Test all pages
- [ ] Layouts adapt appropriately
- [ ] Touch targets are large enough

### Desktop View (> 1024px)
- [ ] Set viewport to desktop (1920px)
- [ ] Test all pages
- [ ] Multi-column layouts display
- [ ] No content is cut off
- [ ] Hover effects work

## ✅ Error Handling

### Network Errors
- [ ] Disable internet connection
- [ ] Try to submit feedback
- [ ] Error message displays
- [ ] Re-enable internet
- [ ] Retry submission
- [ ] Works correctly

### Invalid Files
- [ ] Try to upload a .txt file as image
- [ ] Should reject or show error
- [ ] Try to upload very large file (> 50MB)
- [ ] Should show error or size warning

### Form Validation
- [ ] Try to submit feedback with empty name
- [ ] Error message displays
- [ ] Try to submit with very long name (> 100 chars)
- [ ] Should be limited by maxLength
- [ ] Try to submit with very long feedback (> 1000 chars)
- [ ] Should be limited by maxLength

## ✅ Browser Compatibility

Test in multiple browsers:
- [ ] Chrome/Edge (Chromium)
  - [ ] All features work
  - [ ] No console errors
- [ ] Firefox
  - [ ] All features work
  - [ ] No console errors
- [ ] Safari (if available)
  - [ ] All features work
  - [ ] No console errors

## ✅ Performance

### Load Times
- [ ] `/feedback` loads in under 2 seconds
- [ ] `/gallery` loads in under 2 seconds
- [ ] Admin dashboard loads in under 2 seconds
- [ ] Images load progressively
- [ ] No layout shift during load

### Large Data Sets
- [ ] If you have 20+ reviews, pagination works
- [ ] If you have 20+ media items, grid performs well
- [ ] Admin tables handle large datasets

## ✅ Final Verification

### Database
- [ ] Run in SQL Editor:
  ```sql
  SELECT COUNT(*) FROM reviews;
  SELECT AVG(stars) FROM reviews WHERE status = 'published';
  SELECT COUNT(*) FROM media WHERE is_active = TRUE;
  ```
- [ ] Counts match what's displayed in admin dashboard

### Storage
- [ ] Go to Supabase Storage dashboard
- [ ] Check `website-images` bucket
- [ ] Uploaded images are present
- [ ] Check `website-videos` bucket
- [ ] Uploaded videos are present

### No Console Errors
- [ ] Check browser console on all pages
- [ ] No red errors (warnings are OK)
- [ ] No unhandled promise rejections

## 📋 Summary

**Total Tests:** ~150
**Tests Passed:** _____
**Tests Failed:** _____
**Issues Found:** (list below)

### Issues Found:
1. 
2. 
3. 

### Notes:
- 
- 
- 

---

**Tested By:** _______________
**Date:** _______________
**Environment:** Development / Production
**Browser:** _______________
**Device:** _______________

## ✅ Ready for Production?

Once all tests pass:
- [ ] Environment variables set in production hosting
- [ ] Production build created (`npm run build`)
- [ ] Production build tested locally (`npm run preview`)
- [ ] Supabase production settings verified
- [ ] Admin credentials secured
- [ ] Backup plan in place
- [ ] Monitoring set up (optional)

**Status:** ⬜ Not Ready  |  ⬜ Ready for Production

---

Good luck! 🚀
