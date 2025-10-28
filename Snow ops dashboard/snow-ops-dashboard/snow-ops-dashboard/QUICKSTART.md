# ⚡ Quick Start - Snow Operations Dashboard

## 🎯 Choose Your Path

### Path 1: Deploy Online (Recommended - 5 minutes)
**Best for**: Most users, no coding required

1. Download and extract the zip file
2. Create a free account at [vercel.com](https://vercel.com)
3. Drag and drop the extracted folder onto Vercel
4. Add your Airtable credentials in Settings → Environment Variables:
   - `AIRTABLE_API_KEY`
   - `AIRTABLE_BASE_ID`
   - `AIRTABLE_TABLE_NAME`
5. Your dashboard is live! 🎉

**See DEPLOY.md for detailed deployment instructions**

---

### Path 2: Run Locally (10 minutes)
**Best for**: Testing or development

**Requirements:**
- Node.js 18+ ([download here](https://nodejs.org))
- A code editor (optional)

**Steps:**
```bash
# 1. Extract the zip file
# 2. Open terminal/command prompt in the folder
# 3. Run the setup script:
./setup.sh      # On Mac/Linux
# OR manually:
npm install

# 4. Create .env.local and add your Airtable credentials:
cp .env.local.example .env.local
# Edit .env.local with your credentials

# 5. Start the server:
npm run dev

# 6. Open http://localhost:3000 in your browser
```

---

## 📋 What You Need

### Airtable Setup

1. **API Key**
   - Go to [airtable.com/account](https://airtable.com/account)
   - Generate an API key
   - Copy it

2. **Base ID**
   - Open your Airtable base
   - Click Help → API documentation
   - Find your Base ID (starts with "app...")

3. **Table Name**
   - Use the exact name of your table
   - Default: "Sites"

### Expected Airtable Fields

Your table should have these columns:
- `Name` or `SiteName` - Location name
- `Address` or `ServiceAddress` - Street address
- `District` - Area/district
- `Status` - Active, Pending, Completed, or Issue
- `Priority` - High, Medium, or Low
- `Crew` or `AssignedCrew` - Team assigned
- `LastService` - When last serviced

*Don't have all these? No problem! The app uses fallback values.*

---

## 🎨 What This Dashboard Does

- **Real-time Site Monitoring** - See all your locations at a glance
- **Fleet Tracking** - Monitor vehicles and fuel levels
- **Weather Integration** - Get live weather alerts (no key needed!)
- **Auto-Sync** - Pulls data from Airtable automatically
- **Search & Filter** - Find sites quickly by name, district, or crew
- **Mobile Friendly** - Works on any device
- **Digital Signage Ready** - Perfect for OptiSigns displays

---

## 🐛 Troubleshooting

**"npm: command not found"**
→ Install Node.js from [nodejs.org](https://nodejs.org)

**"Module not found" errors**
→ Run `npm install` again

**Data not loading**
→ Check your `.env.local` file has correct Airtable credentials
→ Verify your Airtable table has the expected fields

**Page is blank**
→ Open browser console (F12) and check for errors
→ Make sure you ran `npm run build` or `npm run dev`

---

## 📁 Project Structure

```
snow-ops-dashboard/
├── app/                    # Next.js pages
│   ├── page.tsx           # Main dashboard
│   └── api/               # API routes
├── components/            # React components
├── lib/                   # Utilities and types
├── hooks/                 # Custom React hooks
├── styles/                # CSS files
├── README.md              # Full documentation
├── DEPLOY.md              # Deployment guide
└── setup.sh               # Quick setup script
```

---

## 🚀 Next Steps

1. ✅ Get the app running (locally or deployed)
2. ✅ Connect your Airtable
3. ✅ Test the sync button
4. ✅ Customize for your needs (see README.md)

---

## 💡 Tips

- **First Time?** Use Vercel - it's the easiest
- **Want to Customize?** Run locally first, then deploy
- **Production Ready?** Add your domain in Vercel settings
- **Need Help?** Check README.md for detailed docs

---

## 📚 Documentation

- **README.md** - Complete project documentation
- **DEPLOY.md** - Detailed deployment options
- **package.json** - Available npm scripts

---

**Ready to deploy?** See **DEPLOY.md** for step-by-step instructions!

**Running into issues?** Check **README.md** troubleshooting section!
