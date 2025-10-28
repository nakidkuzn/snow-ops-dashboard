# Snow Operations Dashboard

Real-time monitoring and resource management for snow operations. Built with Next.js 14 (App Router), TypeScript, and Tailwind CSS.

![Dashboard Preview](https://img.shields.io/badge/Next.js-14-black?logo=next.js) ![TypeScript](https://img.shields.io/badge/TypeScript-5.4-blue?logo=typescript) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?logo=tailwindcss)

## Features

✨ **Real-time Dashboard**
- Live site status monitoring with sortable/filterable table
- Fleet vehicle tracking with fuel levels
- Weather alerts via Open-Meteo API (no API key needed)
- Auto-refresh capability with local storage persistence

📊 **Airtable Integration**
- Secure server-side API proxy (API keys never exposed to browser)
- Automatic data synchronization
- Configurable table and field mapping

🎨 **Modern UI**
- Responsive design optimized for digital signage (OptiSigns)
- Real-time clock display
- Color-coded status indicators and priority levels
- Smooth transitions and animations

## Quick Start

### 1. Deploy to Vercel (Easiest - 2 minutes)

Click the button below to deploy this project to Vercel in one click:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/snow-ops-dashboard)

After deployment:
1. Go to your Vercel dashboard → Your Project → Settings → Environment Variables
2. Add the following:
   - `AIRTABLE_API_KEY`: Your Airtable API key
   - `AIRTABLE_BASE_ID`: Your Airtable base ID (starts with "app...")
   - `AIRTABLE_TABLE_NAME`: Your table name (default: "Sites")
3. Redeploy the project for changes to take effect

### 2. Local Development

```bash
# Clone or extract the project
cd snow-ops-dashboard

# Install dependencies
npm install

# Create your environment file
cp .env.local.example .env.local

# Edit .env.local with your Airtable credentials
# AIRTABLE_API_KEY=your_actual_key
# AIRTABLE_BASE_ID=appXXXXXXXXXXXXXX
# AIRTABLE_TABLE_NAME=Sites

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Manual Deployment (Other Platforms)

#### Build for Production
```bash
npm install
npm run build
npm start
```

The app will be available on port 3000.

## Environment Variables

Create a `.env.local` file with:

```bash
AIRTABLE_API_KEY=your_airtable_key_here
AIRTABLE_BASE_ID=appXXXXXXXXXXXXXX
AIRTABLE_TABLE_NAME=Sites
```

### Getting Airtable Credentials:

1. **API Key**: Go to [Airtable Account](https://airtable.com/account) → Generate API key
2. **Base ID**: Open your base → Help → API documentation → The ID is shown at the top
3. **Table Name**: The name of your table in Airtable (case-sensitive)

### Expected Airtable Fields:

The app looks for these fields (with fallbacks):
- `Name` or `SiteName` → Site name
- `Address` or `ServiceAddress` → Location address
- `District` → Geographic district
- `Status` → Current status (Active, Pending, Completed, Issue)
- `Priority` → Priority level (High, Medium, Low)
- `Crew` or `AssignedCrew` → Assigned team
- `LastService` → Last service timestamp

## Project Structure

```
snow-ops-dashboard/
├── app/
│   ├── api/
│   │   └── airtable/
│   │       └── sites/
│   │           └── route.ts          # Airtable API proxy
│   ├── layout.tsx                     # Root layout
│   ├── page.tsx                       # Main dashboard page
│   └── globals.css                    # Global styles
├── components/
│   ├── WeatherAlerts.tsx              # Weather display component
│   ├── SiteStatus.tsx                 # Sites table component
│   ├── FleetStatus.tsx                # Fleet vehicles component
│   ├── Notifications.tsx              # Notifications component
│   └── StatsCards.tsx                 # Statistics cards
├── hooks/
│   └── useLocalStorage.ts             # LocalStorage persistence hook
├── lib/
│   ├── types.ts                       # TypeScript type definitions
│   ├── ui.tsx                         # UI utility functions
│   └── airtable.ts                    # Airtable client functions
├── styles/
│   └── tailwind.css                   # Tailwind directives
└── public/                            # Static assets

```

## Customization

### Change Weather Location

Edit `components/WeatherAlerts.tsx`:
```typescript
const lat = 42.4084;  // Your latitude
const lon = -71.0537; // Your longitude
```

### Modify Mock Data

Edit `app/page.tsx` to update `mockSites` and `fleetData` arrays.

### Add New Fields

1. Update types in `lib/types.ts`
2. Modify API route in `app/api/airtable/sites/route.ts`
3. Update components to display new fields

## Deployment Options

### Vercel (Recommended)
- Zero configuration
- Automatic HTTPS
- Global CDN
- Free tier available
- [Deploy now](https://vercel.com/new)

### Netlify
```bash
npm run build
# Deploy the .next folder
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### Traditional VPS
```bash
# Install Node.js 18+
npm install
npm run build
npm start

# Use PM2 for process management
npm install -g pm2
pm2 start npm --name "snow-ops" -- start
pm2 save
pm2 startup
```

## Troubleshooting

**"Missing Airtable env vars" error:**
- Verify your `.env.local` file exists and has correct values
- Restart the dev server after adding environment variables
- In production (Vercel), add env vars in dashboard settings

**Data not loading:**
- Check Airtable API key permissions
- Verify Base ID and Table Name are correct
- Open browser console to check for errors
- Test API route directly: `http://localhost:3000/api/airtable/sites`

**Styling issues:**
- Run `npm install` to ensure all dependencies are installed
- Clear `.next` folder: `rm -rf .next` and restart

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript 5.4
- **Styling**: Tailwind CSS 3.4
- **Icons**: Lucide React
- **Weather Data**: Open-Meteo API (free, no key required)
- **Data Source**: Airtable

## License

MIT License - feel free to use this project for your snow operations!

## Support

For issues or questions:
1. Check the troubleshooting section above
2. Review the [Next.js documentation](https://nextjs.org/docs)
3. Check [Airtable API docs](https://airtable.com/api)

---

Built with ❄️ for efficient snow operations management
