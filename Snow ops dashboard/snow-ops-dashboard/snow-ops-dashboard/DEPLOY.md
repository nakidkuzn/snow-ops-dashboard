# 🚀 Easy Deployment Guide

## Option 1: Vercel (Recommended - 2 Minutes)

Vercel is the easiest way to deploy Next.js apps. It's free and takes just 2 minutes!

### Steps:

1. **Create a GitHub Account** (if you don't have one)
   - Go to [github.com](https://github.com)
   - Sign up for free

2. **Push Your Code to GitHub**
   ```bash
   cd snow-ops-dashboard
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   # Create a new repository on GitHub, then:
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git push -u origin main
   ```

3. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Sign Up" and use your GitHub account
   - Click "New Project"
   - Import your GitHub repository
   - Click "Deploy" (it will automatically detect Next.js)

4. **Add Environment Variables**
   - Go to your project on Vercel
   - Click "Settings" → "Environment Variables"
   - Add these three variables:
     - `AIRTABLE_API_KEY`: `your_actual_key`
     - `AIRTABLE_BASE_ID`: `appXXXXXXXXXXXXXX`
     - `AIRTABLE_TABLE_NAME`: `Sites`
   - Click "Redeploy" to apply the changes

5. **Done!** 🎉
   - Your app is live at `https://your-project.vercel.app`
   - It will auto-deploy whenever you push to GitHub

---

## Option 2: Netlify (Alternative)

1. Sign up at [netlify.com](https://netlify.com)
2. Drag and drop your project folder
3. Add environment variables in Site Settings
4. Done!

---

## Option 3: Railway.app (With Database Support)

1. Sign up at [railway.app](https://railway.app)
2. Click "New Project" → "Deploy from GitHub"
3. Select your repository
4. Add environment variables
5. Done!

---

## Option 4: DigitalOcean App Platform

1. Sign up at [digitalocean.com](https://digitalocean.com)
2. Go to App Platform
3. Create a new app from GitHub
4. Configure environment variables
5. Deploy

---

## Option 5: Self-Hosted (Your Own Server)

If you have your own Linux server:

```bash
# Install Node.js (if not installed)
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Clone your project
cd /var/www
git clone YOUR_REPO
cd snow-ops-dashboard

# Install dependencies
npm install

# Create environment file
nano .env.local
# Add your environment variables, save and exit

# Build the project
npm run build

# Install PM2 for process management
sudo npm install -g pm2

# Start the app
pm2 start npm --name "snow-ops" -- start

# Make it start on boot
pm2 startup
pm2 save

# Your app is now running on http://your-server-ip:3000
```

### Set up Nginx (Optional - for custom domain)

```bash
sudo apt install nginx

sudo nano /etc/nginx/sites-available/snow-ops
```

Add this configuration:
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
sudo ln -s /etc/nginx/sites-available/snow-ops /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

---

## Getting Your Airtable Credentials

### AIRTABLE_API_KEY
1. Go to [airtable.com/account](https://airtable.com/account)
2. Scroll to "API" section
3. Click "Generate API key"
4. Copy the key

### AIRTABLE_BASE_ID
1. Open your Airtable base
2. Click "Help" → "API documentation"
3. The Base ID is shown at the top (starts with "app...")

### AIRTABLE_TABLE_NAME
- Just use the name of your table as it appears in Airtable
- Case-sensitive!
- Default: "Sites"

---

## Testing Your Deployment

After deploying, test these:

1. **Homepage loads**: Visit your URL
2. **API works**: Visit `https://your-url.com/api/airtable/sites`
3. **Data syncs**: Click "Sync Airtable" button
4. **Weather loads**: Check for weather alerts

---

## Need Help?

- **Vercel Issues**: Check [vercel.com/docs](https://vercel.com/docs)
- **Airtable Issues**: Check [airtable.com/api](https://airtable.com/api)
- **Next.js Issues**: Check [nextjs.org/docs](https://nextjs.org/docs)

---

## Quick Comparison

| Platform | Difficulty | Cost | Best For |
|----------|-----------|------|----------|
| Vercel | ⭐ Easy | Free tier | Most users (recommended) |
| Netlify | ⭐ Easy | Free tier | Alternative to Vercel |
| Railway | ⭐⭐ Medium | Free trial | Need database later |
| Self-hosted | ⭐⭐⭐ Hard | Server cost | Full control |

---

**Recommendation**: Start with Vercel. It's free, easy, and you can always move later if needed.
