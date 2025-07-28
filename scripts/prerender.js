import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// List of pages to prerender
const pages = [
  { path: '/', title: 'iSchedulEDU - Emergency Schedule Generator for Teachers' },
  { path: '/about', title: 'About iSchedulEDU - Educational Technology Company' },
  { path: '/features', title: 'Features - iSchedulEDU | Advanced Teacher Scheduling Features' },
  { path: '/faq', title: 'FAQ - iSchedulEDU | Frequently Asked Questions' },
  { path: '/emergency-scheduling', title: 'Emergency Schedule Generator for Teachers | iSchedulEDU' },
  { path: '/equal-time-planning', title: 'Equal Time Lesson Planning App | iSchedulEDU' },
  { path: '/shareable-plans', title: 'Shareable School Day Plans for Teachers | iSchedulEDU' },
  { path: '/competitor-analysis', title: 'Competitor Analysis - iSchedulEDU' },
  { path: '/strategy-review', title: 'Strategy Review - iSchedulEDU' },
  { path: '/blog', title: 'Teacher Blog | iSchedulEDU - Emergency Scheduling & Classroom Management Tips' },
  { path: '/privacy-policy', title: 'Privacy Policy - iSchedulEDU' }
];

// Create prerendered HTML files
pages.forEach(page => {
  const fileName = page.path === '/' ? 'index' : page.path.slice(1);
  const filePath = path.join(__dirname, '../dist', fileName === 'index' ? 'index.html' : `${fileName}/index.html`);
  
  // Create directory if it doesn't exist
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  
  // Read the main index.html
  const mainHtml = fs.readFileSync(path.join(__dirname, '../dist/index.html'), 'utf8');
  
  // Update title for this page
  const updatedHtml = mainHtml.replace(
    /<title>.*?<\/title>/,
    `<title>${page.title}</title>`
  );
  
  // Write the prerendered file
  fs.writeFileSync(filePath, updatedHtml);
  console.log(`Prerendered: ${page.path}`);
});

console.log('Prerendering complete!'); 