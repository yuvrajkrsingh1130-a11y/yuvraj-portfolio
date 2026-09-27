import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, '../dist');
const indexPath = path.join(distDir, 'index.html');
const fallbackPath = path.join(distDir, '200.html');
const cnamePath = path.join(distDir, 'CNAME');

// 1. Ensure dist directory exists
if (!fs.existsSync(distDir)) {
  console.error('[SURGE PREP] Error: dist directory does not exist. Run vite build first.');
  process.exit(1);
}

// 2. Create 200.html for Surge SPA routing fallback
// Surge natively checks for 200.html when a requested route has no matching file/folder.
// This prevents 404 errors when reloading or directly visiting sub-routes on any device/network.
if (fs.existsSync(indexPath)) {
  fs.copyFileSync(indexPath, fallbackPath);
  console.log('[SURGE PREP] ✓ Successfully generated dist/200.html (Surge SPA fallback)');
} else {
  console.error('[SURGE PREP] Error: dist/index.html not found!');
  process.exit(1);
}

// 3. Create CNAME file so Surge locks the deployment to the custom subdomain
// Replace or configure default domain here
const DOMAIN = process.env.SURGE_DOMAIN || 'yuvrajportfolio.surge.sh';
fs.writeFileSync(cnamePath, DOMAIN.trim() + '\n', 'utf8');
console.log(`[SURGE PREP] ✓ Generated dist/CNAME configured for: ${DOMAIN}`);

// 4. Create robots.txt
const robotsContent = `User-agent: *\nAllow: /\nSitemap: https://${DOMAIN}/sitemap.xml\n`;
fs.writeFileSync(path.join(distDir, 'robots.txt'), robotsContent, 'utf8');
console.log('[SURGE PREP] ✓ Generated dist/robots.txt');

console.log('[SURGE PREP] Ready for live deployment with: npx surge dist\n');
