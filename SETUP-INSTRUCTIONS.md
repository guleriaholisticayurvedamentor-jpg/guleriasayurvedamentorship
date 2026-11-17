# Supabase Integration Setup Instructions

## Overview
Your static React website has been converted to a fully dynamic website with Supabase integration for customer feedback, admin dashboard, and media gallery management.

## 🚀 Quick Start

### Step 1: Configure Environment Variables

1. Open the `.env` file in the project root
2. Replace the placeholder values with your actual Supabase credentials:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

**Where to find these:**
- Go to your Supabase project dashboard
- Navigate to Settings > API
- Copy the "Project URL" for `VITE_SUPABASE_URL`
- Copy the "anon/public" key for `VITE_SUPABASE_ANON_KEY`

⚠️ **IMPORTANT:** Never commit the `.env` file to Git. It's already in `.gitignore`.

### Step 2: Setup Supabase Database

1. Go to your Supabase project dashboard
2. Navigate to SQL Editor
3. Create a new query
4. Copy and paste the entire contents of `supabase-migration.sql`
5. Click "Run" to execute the script

This will create:
- `reviews` table (customer feedback)
- `media` table (images and videos)
- `admin_users` table (admin access control)
- All necessary indexes
- Row Level Security (RLS) policies

### Step 3: Create Storage Buckets

1. Go to Storage in Supabase dashboard
2. Create two new buckets:
   - **Name:** `website-images`
     - Public bucket: ✓ Yes
     - File size limit: 5 MB (recommended)
     - Allowed MIME types: image/jpeg, image/jpg, image/png, image/webp
   
   - **Name:** `website-videos`
     - Public bucket: ✓ Yes
     - File size limit: 50 MB (recommended)
     - Allowed MIME types: video/mp4, video/webm

### Step 4: Setup Storage Policies

For each bucket, create these policies:

#### Policy 1: Public Read Access
- Policy Name: "Public read access"
- Allowed Operations: SELECT
- Target Roles: public
- Policy Definition: `true`

#### Policy 2: Admin Upload
- Policy Name: "Admins can upload"
- Allowed Operations: INSERT
- Target Roles: authenticated
- Policy Definition:
```sql
(auth.uid() IN (SELECT user_id FROM admin_users WHERE role = 'admin'))
```

#### Policy 3: Admin Delete
- Policy Name: "Admins can delete"
- Allowed Operations: DELETE
- Target Roles: authenticated
- Policy Definition:
```sql
(auth.uid() IN (SELECT user_id FROM admin_users WHERE role = 'admin'))
```

### Step 5: Create First Admin User

1. Go to Authentication > Users in Supabase dashboard
2. Click "Add user" > "Create new user"
3. Enter:
   - Email: your-admin-email@example.com
   - Password: (choose a strong password)
   - Auto Confirm User: ✓ Yes
4. Click "Create user"
5. Copy the user's UUID from the users list

6. Go back to SQL Editor and run:
```sql
INSERT INTO admin_users (user_id, role)
VALUES ('paste-your-user-uuid-here', 'admin');
```

Replace `paste-your-user-uuid-here` with the actual UUID you copied.

### Step 6: Install Dependencies & Run

```bash
npm install
npm run dev
```

Your application should now be running at `http://localhost:5173`

## 📱 New Pages & Features

### Public Pages

1. **Customer Feedback Page** (`/feedback`)
   - Submit feedback with name, message, and star rating
   - View all published reviews
   - Real-time updates when new feedback is submitted
   - Average rating and total review count

2. **Gallery Page** (`/gallery`)
   - Dynamic image and video gallery
   - Lightbox for images
   - Video playback controls
   - Only shows active/published media

### Admin Pages

3. **Admin Login** (`/admin/login`)
   - Secure login for authorized admins only
   - Email and password authentication
   - Automatic redirect to dashboard on success

4. **Admin Dashboard** (`/admin/dashboard`)
   - **Overview Tab:**
     - Total reviews
     - Average rating
     - Total images/videos
     - Active/hidden media counts
   
   - **Feedback Tab:**
     - View all customer feedback
     - Search by customer name
     - Hide/show feedback
     - Delete inappropriate feedback
   
   - **Media Tab:**
     - Upload multiple images
     - Upload multiple videos
     - Preview all media
     - Toggle visibility
     - Delete media (removes from storage and database)

## 🔒 Security Features

### Row Level Security (RLS)
- Public users can only submit and view published feedback
- Public users can only view active media
- Admins can manage all content
- All policies verified at database level (not just frontend)

### Authentication
- Protected admin routes
- Session-based authentication
- Automatic redirect if not authenticated
- Admin role verification on database level

### Best Practices
- Environment variables for sensitive data
- No service-role key in frontend
- Input validation on all forms
- Proper error handling

## 🎨 Design Integration

All new features integrate seamlessly with your existing design:
- ✓ Preserved color scheme (green #16a34a, dark #0d2b1f)
- ✓ Maintained typography and spacing
- ✓ Responsive design for mobile/tablet/desktop
- ✓ Consistent button and form styles
- ✓ Smooth animations and transitions

## 📝 Testing Checklist

### Public Features
- [ ] Navigate to `/feedback`
- [ ] Submit a review (name, message, 1-5 stars)
- [ ] Verify review appears immediately
- [ ] Check average rating updates
- [ ] Test "Load More" if you have 6+ reviews
- [ ] Navigate to `/gallery`
- [ ] Verify no media shows empty state (before admin uploads)

### Admin Features
- [ ] Navigate to `/admin/login`
- [ ] Login with admin credentials
- [ ] Verify redirect to dashboard
- [ ] Check overview statistics
- [ ] Go to Feedback tab
- [ ] Hide/show a review
- [ ] Delete a review (test carefully!)
- [ ] Go to Media tab
- [ ] Upload an image (JPG, PNG, or WebP)
- [ ] Upload a video (MP4 or WebM)
- [ ] Verify media appears in public gallery
- [ ] Toggle media visibility
- [ ] Delete a media item
- [ ] Logout and verify redirect to login

### Cross-Verification
- [ ] Submit feedback as public user
- [ ] Verify it appears in admin dashboard immediately
- [ ] Upload media as admin
- [ ] Verify it appears in public gallery immediately

## 🐛 Troubleshooting

### Error: "Missing Supabase environment variables"
- Make sure `.env` file exists
- Verify the environment variables are spelled correctly
- Restart the dev server after changing `.env`

### Error: "Invalid credentials or unauthorized access"
- Verify the user exists in Supabase Authentication
- Check that the user's UUID is in the `admin_users` table
- Verify RLS policies are enabled

### Images/Videos not uploading
- Check storage buckets exist with exact names
- Verify storage policies are correctly set
- Check browser console for specific errors
- Verify file types and sizes are within limits

### Reviews not appearing
- Check `reviews` table exists
- Verify RLS policies on `reviews` table
- Check browser console for errors
- Verify Supabase URL and anon key are correct

### Realtime not working
- Check if Realtime is enabled for the `reviews` table:
  ```sql
  ALTER PUBLICATION supabase_realtime ADD TABLE reviews;
  ```
- Verify your Supabase project has Realtime enabled

## 📦 File Structure

```
src/
├── lib/
│   └── supabaseClient.js          # Supabase configuration
├── services/
│   ├── adminService.js            # Admin authentication
│   ├── feedbackService.js         # Feedback operations
│   └── mediaService.js            # Media operations
├── components/
│   ├── admin/
│   │   └── ProtectedRoute.jsx     # Route protection
│   ├── feedback/
│   │   ├── StarRating.jsx         # Star rating component
│   │   ├── FeedbackForm.jsx       # Feedback submission form
│   │   ├── ReviewCard.jsx         # Single review display
│   │   └── ReviewsList.jsx        # All reviews display
│   └── gallery/
│       ├── DynamicGallery.jsx     # Dynamic media gallery
│       └── ImageLightbox.jsx      # Image preview lightbox
├── pages/
│   ├── CustomerFeedback.jsx       # Public feedback page
│   ├── Gallery.jsx                # Public gallery page
│   └── admin/
│       ├── AdminLogin.jsx         # Admin login page
│       └── AdminDashboard.jsx     # Admin dashboard
└── App.jsx                        # Updated with new routes
```

## 🚀 Deployment

When deploying to production:

1. **Environment Variables:**
   - Add environment variables to your hosting platform (Vercel, Netlify, etc.)
   - Use the same variable names from `.env`

2. **Supabase Configuration:**
   - Your Supabase project is already production-ready
   - No additional configuration needed

3. **Build Command:**
   ```bash
   npm run build
   ```

## 📞 Support

If you encounter issues:

1. Check the browser console for errors
2. Check Supabase logs (Dashboard > Logs)
3. Verify all setup steps were completed
4. Review the SQL migration output for errors

## 🎉 What's Next?

Your website now has:
- ✅ Dynamic customer feedback system
- ✅ Secure admin authentication
- ✅ Media management (images & videos)
- ✅ Real-time updates
- ✅ Responsive design
- ✅ Production-ready security

You can now:
- Collect customer feedback automatically
- Manage your gallery from the admin dashboard
- Monitor reviews and ratings
- Control what content is visible to the public

Enjoy your fully dynamic website! 🎊
