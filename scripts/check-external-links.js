import https from 'https';
import http from 'http';

const externalLinks = [
  'https://www.apple.com/education/',
  'https://www.edutopia.org/',
  'https://www.khanacademy.org/',
  'https://www.iste.org/'
];

async function checkLink(url) {
  return new Promise((resolve) => {
    const protocol = url.startsWith('https:') ? https : http;
    
    const req = protocol.get(url, (res) => {
      resolve({
        url,
        status: res.statusCode,
        working: res.statusCode >= 200 && res.statusCode < 400
      });
    });
    
    req.on('error', (err) => {
      resolve({
        url,
        status: 'ERROR',
        working: false,
        error: err.message
      });
    });
    
    req.setTimeout(5000, () => {
      req.destroy();
      resolve({
        url,
        status: 'TIMEOUT',
        working: false,
        error: 'Request timeout'
      });
    });
  });
}

async function checkAllLinks() {
  console.log('Checking external links...\n');
  
  for (const link of externalLinks) {
    const result = await checkLink(link);
    const status = result.working ? '✅ WORKING' : '❌ BROKEN';
    console.log(`${status} - ${result.url} (${result.status})`);
    if (!result.working && result.error) {
      console.log(`  Error: ${result.error}`);
    }
  }
  
  console.log('\nExternal link check complete!');
}

checkAllLinks(); 