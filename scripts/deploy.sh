#!/bin/bash

echo "🚀 Deploying Recipe Maker App..."

# Build the web version
echo "📦 Building web version..."
npm run build

# Create deployment package
echo "📱 Creating React Native package..."
zip -r recipe-maker-react-native.zip . -x "node_modules/*" ".next/*" ".git/*"

echo "✅ Deployment package created: recipe-maker-react-native.zip"
echo "🌐 Web version built and ready for deployment"
echo "📱 React Native package ready for distribution"

# GitHub repository setup
echo "🔗 Setting up GitHub repository..."
git init
git add .
git commit -m "Initial commit: Complete Recipe Maker App with all features"

echo "📋 Next steps:"
echo "1. Create a new repository on GitHub"
echo "2. Run: git remote add origin <your-repo-url>"
echo "3. Run: git push -u origin main"
echo "4. Deploy web version to Vercel/Netlify"
echo "5. Distribute React Native app via App Store/Play Store"
