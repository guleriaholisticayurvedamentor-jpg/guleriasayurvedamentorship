# 🚀 Automated Setup Guide (3 Steps Only!)

This guide uses SQL scripts to automate everything. No manual clicking required!

---

## ⚡ Step 1: Run Main Migration (2 minutes)

1. Go to **https://supabase.com**
2. Sign in and open your project
3. Click **"SQL Editor"** in the left sidebar
4. Click **"New query"**
5. Open the file: `supabase-migration.sql` (in this folder)
6. **Copy ALL the content** (Ctrl+A, Ctrl+C)
7. **Paste** into Supabase SQL Editor
8. Click **"Run"** (or press Ctrl+Enter)
9. Wait for "Success" message

**What this does:**
- ✅ Creates 3 tables (reviews, media, admin_users)
- ✅ Sets up Row Level Security
- ✅ Creates 2 storage buckets (website-images, website-videos)
- ✅ Creates 6 storage policies (automatic upload/delete permissions)
- ✅ Enables realtime updates

---

## 👤 Step 2: Create Admin User (1 minute)

### 2a. Create User in Dashboard (MUST be done manually)

Unfortunately, Supabase requires this step to be done in the dashboard:

1. In Supabase, click **"Authentication"** → **"Users"**
2. Click **"Add user"** → **"Create new user"**
3. Enter:
   ```
   Email: your-email@example.com
   Password: your-strong-password
   ☑️ Auto Confirm User (CHECK THIS!)
   ```
4. Click **"Create user"**
5. **COPY the user's UUID** from the list (looks like: `a1b2c3d4-e5f6-7890-abcd-ef1234567890`)

### 2b. Make User an Admin (SQL - Automatic)

1. Go back to **SQL Editor**
2. Open the file: `create-admin-user.sql`
3. Replace `YOUR_USER_UUID_HERE` with the UUID you copied
4. Example:
   ```sql
   INSERT INTO admin_users (user_id, role)
   VALUES ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'admin');
   ```
5. **Run** the query
6. You should see: "Success. 1 row affected"

---

## 🔑 Step 3: Add Supabase Credentials (30 seconds)

1. In Supabase, click **"Settings"** (⚙️ icon) → **"API"**
2. Copy these two values:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon/public** key (long string starting with `eyJ...`)

3. Open your **`.env`** file (it's already open in your editor!)
4. Replace the placeholder values:
   ```env
   VITE_SUPABASE_URL=https://xxxxx.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGc...your-long-key-here
   ```
5. **Save** the file (Ctrl+S)

---

## ✅ Done! Test Your Website

Your website is already running at: **http://localhost:5173**

### Test These URLs:

1. **Home page**: http://localhost:5173/
   - Should work perfectly

2. **Feedback page**: http://localhost:5173/feedback
   - Submit a review with your name, message, and star rating
   - Should save and appear immediately

3. **Gallery page**: http://localhost:5173/gallery
   - Will be empty until you upload media
   - Should show "No media available" message

4. **Admin login**: http://localhost:5173/admin/login
   - Use the email and password you created in Step 2
   - Should redirect to admin dashboard

5. **Admin dashboard**: http://localhost:5173/admin/dashboard
   - View statistics
   - Upload images/videos in Media tab
   - Manage feedback in Feedback tab

---

## 🎯 Quick Verification

Run this in SQL Editor to verify everything:

```sql
-- Check tables exist
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('reviews', 'media', 'admin_users');
-- Should return 3 rows

-- Check storage buckets exist
SELECT name, public FROM storage.buckets;
-- Should show website-images and website-videos

-- Check admin user
SELECT au.role, u.email
FROM admin_users au
JOIN auth.users u ON au.user_id = u.id;
-- Should show your email with role = 'admin'
```

---

## 🐛 Troubleshooting

### Error: "relation storage.buckets does not exist"
**Solution:** Your Supabase project might not have storage enabled. Contact Supabase support or enable it in project settings.

### Error: "duplicate key value violates unique constraint"
**Solution:** That resource already exists! This is fine, just continue to the next step.

### Error: "Missing Supabase environment variables"
**Solution:** 
1. Make sure `.env` file has correct values
2. Restart the dev server: Stop it (Ctrl+C) and run `npm run dev` again

### Cannot login to admin
**Solution:**
1. Verify user exists in Authentication → Users
2. Verify you ran the `INSERT INTO admin_users` query
3. Run the verification query to check admin_users table

---

## 📊 What Each SQL Script Does

### `supabase-migration.sql`
- Creates database tables
- Sets up security policies
- Creates storage buckets
- Configures storage permissions
- **RUN THIS FIRST** (once only)

### `create-admin-user.sql`
- Adds a user to admin_users table
- Gives them admin privileges
- **RUN AFTER** creating user in dashboard
- Can be run multiple times for multiple admins

---

## 🎉 Summary

You completed:
- ✅ Database tables created
- ✅ Security policies enabled
- ✅ Storage buckets created
- ✅ Storage permissions configured
- ✅ Admin user created and authorized
- ✅ Environment variables configured

Your website is now **fully functional**!

You can:
- Collect customer feedback automatically
- Upload and manage images/videos
- Control content from admin dashboard
- Everything updates in real-time

**Total setup time:** ~5 minutes

**Need help?** Check the other documentation files in this folder.

---

**Files in This Folder:**
- `supabase-migration.sql` - Main setup (run first)
- `create-admin-user.sql` - Admin user setup (run second)
- `SETUP-AUTOMATED.md` - This guide
- `START-HERE.md` - Alternative detailed guide
- `QUICK-REFERENCE.md` - Common operations
- `.env` - Your Supabase credentials (DO NOT COMMIT TO GIT)
