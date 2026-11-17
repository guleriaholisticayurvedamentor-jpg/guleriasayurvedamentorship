# 🧪 Test Admin Route

Your server has been **restarted** with the Supabase credentials!

---

## ✅ What Was Fixed:

1. ✅ Your `.env` file has Supabase credentials
2. ✅ Dev server restarted to load new variables
3. ✅ Database migration complete
4. ✅ Storage buckets created

---

## 🔍 Test Admin Route Now:

### **Step 1: Go to Admin Login**

Open in browser: **http://localhost:5173/admin/login**

You should see:
- ✅ A login page with email and password fields
- ✅ "Admin Login" heading
- ✅ No errors in browser console

---

### **Step 2: What You Need**

To login, you need:
1. **Admin user created in Supabase Authentication**
2. **User added to admin_users table**

---

## 👤 Did You Create Admin User?

### ❓ **Check If You Have Admin User:**

Run this in Supabase SQL Editor:

```sql
-- Check if you have any admin users
SELECT au.id, au.role, u.email, u.created_at
FROM admin_users au
JOIN auth.users u ON au.user_id = u.id;
```

**If it returns ZERO rows:** You need to create the admin user!

---

## 🚀 Create Admin User (If Not Done):

### **Step 1: Create User in Supabase Dashboard**

1. Go to https://supabase.com → Your Project
2. Click **"Authentication"** → **"Users"**
3. Click **"Add user"** → **"Create new user"**
4. Fill in:
   ```
   Email: your-email@example.com (use YOUR real email!)
   Password: YourStrongPassword123! (choose a good password!)
   ☑️ Auto Confirm User (CHECK THIS!)
   ```
5. Click **"Create user"**
6. **COPY the user's UUID** from the list

### **Step 2: Make Them Admin**

1. Go to **SQL Editor**
2. Replace `YOUR_UUID_HERE` with the UUID you copied:

```sql
INSERT INTO admin_users (user_id, role)
VALUES ('YOUR_UUID_HERE', 'admin');
```

Example:
```sql
INSERT INTO admin_users (user_id, role)
VALUES ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'admin');
```

3. Run the query
4. Should see: "Success. 1 row affected"

---

## 🧪 Test Login:

1. Go to: **http://localhost:5173/admin/login**
2. Enter the email and password you just created
3. Click **"Login"**
4. Should redirect to: **http://localhost:5173/admin/dashboard**

---

## ❌ Troubleshooting:

### "Invalid credentials or unauthorized access"
**Causes:**
1. User doesn't exist in Authentication
2. User not in admin_users table
3. Wrong email or password

**Fix:** Run the check query above to verify admin user exists

### "Missing Supabase environment variables"
**Fix:** Server is already restarted, refresh your browser (Ctrl+F5)

### Page shows "Loading..." forever
**Causes:**
1. Supabase URL or key is wrong
2. Network issue

**Fix:** 
- Check browser console for errors (F12)
- Verify .env file has correct values
- Check your internet connection

### Redirects back to login immediately
**Cause:** User exists but not in admin_users table

**Fix:** Run the INSERT INTO admin_users query

---

## ✅ Success Checklist:

- [ ] Can access http://localhost:5173/admin/login
- [ ] Login page displays correctly
- [ ] Admin user exists in Authentication
- [ ] Admin user in admin_users table
- [ ] Can login with correct credentials
- [ ] Redirects to dashboard after login
- [ ] Dashboard shows statistics

---

## 📊 After Successful Login:

You should see:
- **Overview tab** with statistics
- **Feedback tab** for managing reviews
- **Media tab** for uploading images/videos
- Logout button in sidebar

---

## 🎯 Test Other Routes:

| Route | What to Test |
|-------|-------------|
| `/feedback` | Submit a test review |
| `/gallery` | Should be empty (until you upload) |
| `/admin/dashboard` | View stats, upload media |

---

**Need the admin user creation SQL?** 
Check: `create-admin-user.sql` file

**Need to verify setup?**
Run: `check-progress.sql` file

---

**Your server is ready! Test the admin login now!** 🚀
