# 🔧 Fixed Setup Guide - No Deadlocks!

The migration is now split into 4 small parts to avoid deadlock errors.

---

## ✅ Run These Scripts IN ORDER (One at a Time)

### **Part 1: Create Tables** (30 seconds)

1. Open Supabase SQL Editor
2. Open file: `migration-part-1-tables.sql`
3. Copy ALL content
4. Paste in SQL Editor
5. Click **"Run"**
6. ✅ Wait for "Success" before continuing

**What it creates:**
- reviews table
- media table  
- admin_users table
- All indexes

---

### **Part 2: Security Policies** (30 seconds)

1. Open file: `migration-part-2-rls-policies.sql`
2. Copy ALL content
3. Paste in SQL Editor (clear previous query first)
4. Click **"Run"**
5. ✅ Wait for "Success" before continuing

**What it creates:**
- Row Level Security policies
- Permission rules for public users
- Permission rules for admins
- Realtime subscriptions

---

### **Part 3: Storage Buckets** (10 seconds)

1. Open file: `migration-part-3-storage.sql`
2. Copy ALL content
3. Paste in SQL Editor
4. Click **"Run"**
5. ✅ Wait for "Success" before continuing

**What it creates:**
- website-images bucket
- website-videos bucket

---

### **Part 4: Storage Policies** (30 seconds)

1. Open file: `migration-part-4-storage-policies.sql`
2. Copy ALL content
3. Paste in SQL Editor
4. Click **"Run"**
5. ✅ Done!

**What it creates:**
- 6 storage policies
- Public read permissions
- Admin upload/delete permissions

---

## 👤 Create Admin User (Still Required)

### Step 1: Create User in Dashboard

1. Go to **Authentication** → **Users**
2. Click **"Add user"** → **"Create new user"**
3. Enter:
   ```
   Email: your-email@example.com
   Password: your-strong-password
   ☑️ Auto Confirm User
   ```
4. Click **"Create user"**
5. **COPY the user's UUID**

### Step 2: Make User an Admin

1. Open file: `create-admin-user.sql`
2. Replace `YOUR_USER_UUID_HERE` with your UUID
3. Run in SQL Editor
4. Done!

---

## 🔑 Update .env File

1. Go to **Settings** → **API** in Supabase
2. Copy:
   - Project URL
   - anon public key
3. Update your `.env` file (already open in editor)
4. Save

---

## 🎉 Test Your Website

Go to: **http://localhost:5173**

Test these pages:
- `/feedback` - Submit a review
- `/gallery` - View gallery (empty until you upload)
- `/admin/login` - Login with your credentials
- `/admin/dashboard` - Upload media, manage feedback

---

## ⏱️ Total Time

- Part 1: 30 seconds
- Part 2: 30 seconds  
- Part 3: 10 seconds
- Part 4: 30 seconds
- Admin user: 1 minute
- .env file: 30 seconds

**Total: ~3.5 minutes**

---

## 🐛 If You Still Get Errors

### "Relation already exists"
**Solution:** That's fine! It means it's already created. Continue to next part.

### "Policy already exists"  
**Solution:** That's fine! It means it's already created. Continue to next part.

### "Cannot create bucket"
**Solution:** The bucket might already exist. Check in Storage section of Supabase dashboard.

### Any other error
**Solution:** Send me the exact error message and I'll help fix it!

---

## ✅ Verification

After all 4 parts, run this to verify everything:

```sql
-- Check tables
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('reviews', 'media', 'admin_users');
-- Should return 3 rows

-- Check buckets
SELECT name, public FROM storage.buckets;
-- Should show website-images and website-videos

-- Check RLS enabled
SELECT tablename, rowsecurity FROM pg_tables 
WHERE schemaname = 'public';
-- All should show rowsecurity = true
```

---

## 📁 Files Summary

| File | Purpose | When to Run |
|------|---------|-------------|
| `migration-part-1-tables.sql` | Create tables | Run 1st |
| `migration-part-2-rls-policies.sql` | Security | Run 2nd |
| `migration-part-3-storage.sql` | Buckets | Run 3rd |
| `migration-part-4-storage-policies.sql` | Storage security | Run 4th |
| `create-admin-user.sql` | Admin user | Run after creating user in dashboard |

---

**Each part is small and safe - no more deadlocks!** ✅
