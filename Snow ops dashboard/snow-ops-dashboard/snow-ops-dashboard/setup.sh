#!/bin/bash

echo "🚀 Snow Operations Dashboard - Quick Setup"
echo "=========================================="
echo ""

# Check if node is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    echo "   Visit: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js $(node --version) detected"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo ""
echo "✅ Dependencies installed successfully"
echo ""

# Check if .env.local exists
if [ ! -f ".env.local" ]; then
    echo "📝 Creating .env.local file..."
    cp .env.local.example .env.local
    echo ""
    echo "⚠️  IMPORTANT: Edit .env.local and add your Airtable credentials:"
    echo "   - AIRTABLE_API_KEY"
    echo "   - AIRTABLE_BASE_ID"
    echo "   - AIRTABLE_TABLE_NAME"
    echo ""
else
    echo "✅ .env.local already exists"
    echo ""
fi

echo "🎉 Setup complete!"
echo ""
echo "Next steps:"
echo "  1. Edit .env.local with your Airtable credentials (if not done)"
echo "  2. Run: npm run dev"
echo "  3. Open: http://localhost:3000"
echo ""
echo "To deploy to Vercel:"
echo "  1. Push to GitHub"
echo "  2. Import on vercel.com"
echo "  3. Add environment variables in Vercel dashboard"
echo ""
