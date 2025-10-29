#!/bin/bash

###############################################################################
# GodlikeMusic - Vercel Deployment Script
# 
# This script helps deploy GodlikeMusic to Vercel with proper configuration
###############################################################################

set -e

echo "🎵 GodlikeMusic Deployment Script"
echo "=================================="
echo ""

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "⚠️  Vercel CLI is not installed."
    echo "Installing Vercel CLI..."
    npm install -g vercel
fi

echo "✅ Vercel CLI is installed"
echo ""

# Check for API key
if [ -z "$YOUTUBE_API_KEY" ]; then
    echo "⚠️  YOUTUBE_API_KEY environment variable is not set"
    echo ""
    echo "You need to set up your YouTube Data API v3 key in Vercel:"
    echo "1. Go to https://console.cloud.google.com/apis/credentials"
    echo "2. Create a new API key or use an existing one"
    echo "3. Enable YouTube Data API v3"
    echo "4. After deployment, go to Vercel Dashboard → Settings → Environment Variables"
    echo "5. Add: YOUTUBE_API_KEY = your_api_key"
    echo ""
    read -p "Do you want to continue with deployment? (y/n) " -n 1 -r
    echo ""
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "Deployment cancelled."
        exit 1
    fi
fi

echo "📦 Installing dependencies..."
npm install

echo ""
echo "🔨 Building project..."
npm run build

echo ""
echo "🚀 Deploying to Vercel..."
echo ""
echo "Follow the prompts to link or create a new Vercel project."
echo ""

# Deploy to Vercel
vercel --prod

echo ""
echo "✅ Deployment complete!"
echo ""
echo "⚠️  IMPORTANT: Remember to add environment variables in Vercel Dashboard:"
echo "   1. Go to your project in Vercel Dashboard"
echo "   2. Navigate to Settings → Environment Variables"
echo "   3. Add the following variable:"
echo "      - Name: YOUTUBE_API_KEY"
echo "      - Value: your_youtube_api_key"
echo "      - Environments: Production, Preview, Development"
echo "   4. Redeploy if needed: vercel --prod"
echo ""
echo "📖 For more information, see README.md"
echo ""
