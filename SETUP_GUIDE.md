# Nuel Prototype - Quick Setup Guide

Copy and paste this entire prompt into a new Claude Code session to set up the project on a new local system.

---

## Prerequisites: Install Node.js (if not already installed)

**This project requires Node.js 18 or higher.**

### Check if Node.js is already installed:
```bash
node --version
npm --version
```

If you see version numbers (e.g., v20.x.x), you're good to go! Skip to the Setup Prompt below.

### Installing Node.js:

#### Option 1: Using NVM (Node Version Manager) - RECOMMENDED
NVM allows you to manage multiple Node.js versions easily.

**On macOS/Linux:**
```bash
# Install NVM
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Restart your terminal or run:
source ~/.bashrc  # or ~/.zshrc for zsh

# Install Node.js LTS (Long Term Support)
nvm install --lts

# Verify installation
node --version
npm --version
```

**On Windows:**
1. Download NVM for Windows from: https://github.com/coreybutler/nvm-windows/releases
2. Run the installer (nvm-setup.exe)
3. Open a new Command Prompt or PowerShell as Administrator
4. Run:
```bash
nvm install lts
nvm use lts
node --version
npm --version
```

#### Option 2: Direct Installation

**On macOS:**
```bash
# Using Homebrew (install Homebrew first from https://brew.sh if needed)
brew install node

# Verify installation
node --version
npm --version
```

**On Windows:**
1. Download the Windows Installer (.msi) from: https://nodejs.org/
2. Choose the LTS (Long Term Support) version
3. Run the installer and follow the setup wizard
4. Restart your terminal
5. Verify: `node --version` and `npm --version`

**On Linux (Ubuntu/Debian):**
```bash
# Update package index
sudo apt update

# Install Node.js 20.x (LTS)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify installation
node --version
npm --version
```

**On Linux (Fedora/RHEL/CentOS):**
```bash
# Install Node.js 20.x (LTS)
curl -fsSL https://rpm.nodesource.com/setup_20.x | sudo bash -
sudo dnf install -y nodejs

# Verify installation
node --version
npm --version
```

---

## SETUP PROMPT (Copy everything below this line)

```
Please help me set up the Nuel Prototype project on my local system. Follow these steps exactly:

## Step 0: Verify Node.js Installation

First, check if Node.js 18+ is installed:

node --version
npm --version

If Node.js is not installed or the version is below 18, please install it using one of these methods:

**Quick Install (macOS with Homebrew):**
brew install node

**Quick Install (Windows):**
Download from https://nodejs.org/ and install the LTS version

**Using NVM (Recommended for all platforms):**
# macOS/Linux:
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.bashrc  # or ~/.zshrc
nvm install --lts

# Windows: Download from https://github.com/coreybutler/nvm-windows/releases

## Step 1: Clone the Repository

Run the following command to clone the TDP repository:

git clone git@github.com:thedesignproject/Nuel.git "Nuel Prototype"
cd "Nuel Prototype"

## Step 2: Install Dependencies

Install all required Node.js packages:

npm install

## Step 3: Verify Installation

After installation completes, verify that all dependencies are installed correctly by checking if the node_modules directory exists and package-lock.json is created.

## Step 4: Start Development Server

Start the Next.js development server:

npm run dev

The application should now be running at http://localhost:3000

## Step 5: Verify the Application

Open http://localhost:3000 in your browser and confirm the application loads correctly.

---

## Project Information

This is a Next.js 14 application with the following tech stack:
- Next.js 14.2.5 with App Router
- React 18.3.1
- TypeScript 5.5.4
- Tailwind CSS 3.4.7
- Zustand for state management
- React Hook Form + Zod for forms
- Framer Motion for animations
- Recharts for data visualization
- Lucide React and Phosphor Icons for icons

## Available Commands

Once set up, you can use:
- `npm run dev` - Start development server (port 3000)
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Project Structure

The project follows Next.js 14 App Router structure:
- `app/` - Application pages and layouts
- `components/` - Reusable React components
- `components/ui/` - shadcn/ui components
- `lib/` - Utility functions and helpers
- `public/` - Static assets

## Notes

- Prerequisites: Node.js 18+ must be installed
- The project uses SSH for Git (git@github.com), ensure your SSH keys are configured
- Figma MCP is already configured in Claude Code for design integration
- No environment variables are required for basic setup
- The development server runs on port 3000 by default

If you encounter any issues during setup, please let me know!
```

---

## Alternative: HTTPS Clone (if SSH is not configured)

If SSH keys are not set up, use HTTPS instead:

```
git clone https://github.com/thedesignproject/Nuel.git "Nuel Prototype"
cd "Nuel Prototype"
npm install
npm run dev
```

---

## Troubleshooting

### If Node.js is not installed or version is too old:

**Check your current version:**
```bash
node --version  # Should be 18.x.x or higher
```

**Install or upgrade Node.js:**

*macOS (Homebrew):*
```bash
brew install node
# or to upgrade existing installation:
brew upgrade node
```

*Windows:*
- Download latest LTS from https://nodejs.org/
- Run the installer
- Restart your terminal/IDE

*Linux (Ubuntu/Debian):*
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
```

*Using NVM (any platform):*
```bash
nvm install --lts
nvm use --lts
```

### If npm install fails:

**Clear npm cache and retry:**
```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

**Try using a different registry (if network issues):**
```bash
npm install --registry=https://registry.npmjs.org/
```

### If port 3000 is already in use:
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill

# Or use a different port:
PORT=3001 npm run dev
```

### If Git SSH keys are not configured:
1. Generate SSH key: `ssh-keygen -t ed25519 -C "your_email@example.com"`
2. Add to SSH agent: `ssh-add ~/.ssh/id_ed25519`
3. Copy public key: `pbcopy < ~/.ssh/id_ed25519.pub`
4. Add to GitHub: Settings → SSH and GPG keys → New SSH key

---

## Quick Copy-Paste Commands Only

For a super quick setup, just run these commands in order:

```bash
# Verify Node.js is installed (18+)
node --version && npm --version

# Clone the repository
git clone git@github.com:thedesignproject/Nuel.git "Nuel Prototype"
cd "Nuel Prototype"

# Install dependencies
npm install

# Start development server
npm run dev
```

Then open http://localhost:3000

**If Node.js is not installed, run this first (macOS):**
```bash
brew install node
```

**Or use NVM (all platforms):**
```bash
# macOS/Linux
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.bashrc
nvm install --lts
```
