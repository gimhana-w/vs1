# VS One - IT Distributor Website

Sri Lanka's fastest growing value-added IT distributor website.

## 🚀 Deployment on Vercel

This project is configured for automatic deployment on Vercel with Git integration.

### Quick Setup

1. **Push to GitHub/GitLab/Bitbucket**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your Git repository
   - Vercel will automatically detect the settings
   - Click "Deploy"

### Automatic Updates

Once connected to Vercel:
- ✅ Every push to `main` branch = Automatic production deployment
- ✅ Every push to other branches = Automatic preview deployment
- ✅ Pull Requests = Automatic preview deployment with unique URL

### Manual Deployment

You can also deploy manually using Vercel CLI:

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Deploy to production
vercel --prod
```

## 📁 Project Structure

```
├── index.html          # Main HTML file
├── styles.css         # All styles
├── script.js          # JavaScript functionality
└── vercel.json        # Vercel configuration
```

## 🛠️ Local Development

Simply open `index.html` in a browser or use a local server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js (http-server)
npx http-server

# Using PHP (XAMPP)
# Place in htdocs folder and access via localhost
```

## 📝 Notes

- The site is a static website (HTML/CSS/JS)
- No build process required
- All assets are included in the repository
- Vercel will serve the files directly

## 🔗 Links

- Production: [Your Vercel URL]
- Preview: [Auto-generated on each PR]

