
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// List of pages to prerender
const pages = [
  { 
    path: '/', 
    title: 'iSchedulEDU - Emergency Schedule Generator for Teachers',
    description: 'Create custom school schedules in under 2 minutes with iSchedulEDU. Perfect for emergency schedules, early dismissals, delays, and A/B rotations. Free teacher scheduling app for iOS.'
  },
  { 
    path: '/about', 
    title: 'About iSchedulEDU - Educational Technology Company',
    description: 'Learn about iSchedulEDU, the educational technology company helping teachers create emergency schedules quickly and efficiently.'
  },
  { 
    path: '/features', 
    title: 'Features - iSchedulEDU | Advanced Teacher Scheduling Features',
    description: 'Discover all the powerful features of iSchedulEDU including emergency scheduling, QR code sharing, rotating schedules, and more.'
  },
  { 
    path: '/faq', 
    title: 'FAQ - iSchedulEDU | Frequently Asked Questions',
    description: 'Get answers to frequently asked questions about iSchedulEDU, the emergency schedule generator app for teachers. Learn about features, technical support, and advanced scheduling capabilities.'
  },
  { 
    path: '/emergency-scheduling', 
    title: 'Emergency Schedule Generator for Teachers | iSchedulEDU',
    description: 'Generate emergency schedules for fire drills, weather delays, and unexpected events in under 2 minutes. Perfect for teachers and school administrators.'
  },
  { 
    path: '/equal-time-planning', 
    title: 'Equal Time Lesson Planning App | iSchedulEDU',
    description: 'Ensure fair time distribution across all class periods with iSchedulEDU\'s equal time planning feature. Perfect for abbreviated school days.'
  },
  { 
    path: '/shareable-plans', 
    title: 'Shareable School Day Plans for Teachers | iSchedulEDU',
    description: 'Share your school schedules instantly with QR codes, universal links, and text messages. Keep everyone informed about schedule changes.'
  },
  { 
    path: '/competitor-analysis', 
    title: 'Competitor Analysis - iSchedulEDU',
    description: 'See how iSchedulEDU compares to other teacher scheduling solutions and discover why educators choose our emergency schedule generator.'
  },
  { 
    path: '/strategy-review', 
    title: 'Strategy Review - iSchedulEDU',
    description: 'Learn about effective scheduling strategies for teachers and how iSchedulEDU supports different educational approaches.'
  },
  { 
    path: '/blog', 
    title: 'Teacher Blog | iSchedulEDU - Emergency Scheduling & Classroom Management Tips',
    description: 'Read the latest tips and insights on emergency scheduling, classroom management, and educational technology for teachers.'
  },
  { 
    path: '/privacy-policy', 
    title: 'Privacy Policy - iSchedulEDU',
    description: 'Read iSchedulEDU\'s privacy policy to understand how we protect your data and privacy when using our teacher scheduling app. Updated June 5, 2024.'
  }
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
  
  // Update HTML with page-specific meta tags
  let updatedHtml = mainHtml;
  
  if (page.path !== '/') {
    // Update title
    updatedHtml = updatedHtml.replace(
      /<title>.*?<\/title>/,
      `<title>${page.title}</title>`
    );
    
    // Update description
    updatedHtml = updatedHtml.replace(
      /<meta name="description" content=".*?">/,
      `<meta name="description" content="${page.description}">`
    );
    
    // Add canonical URL
    const canonicalRegex = /<link rel="canonical" href=".*?">/;
    if (canonicalRegex.test(updatedHtml)) {
      updatedHtml = updatedHtml.replace(
        canonicalRegex,
        `<link rel="canonical" href="https://ischeduledu.app${page.path}">`
      );
    } else {
      // Insert canonical tag after viewport meta tag
      updatedHtml = updatedHtml.replace(
        /<meta name="viewport" content=".*?">/,
        `<meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="canonical" href="https://ischeduledu.app${page.path}">`
      );
    }
  }
  
  // Write the prerendered file
  fs.writeFileSync(filePath, updatedHtml);
  console.log(`Prerendered: ${page.path} -> ${filePath}`);
});

console.log('Prerendering complete!');
