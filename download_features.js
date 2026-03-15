const https = require('https');
const fs = require('fs');
const path = require('path');

const fetchImages = async () => {
    const res = await fetch('https://pavillionsquarebb.com/');
    const text = await res.text();
    
    const regex = /<img[^>]+src=["']([^"']+)["']/gi;
    let match;
    const urls = new Set();
    while ((match = regex.exec(text)) !== null) {
        if (match[1].includes('uploads') && (match[1].endsWith('.jpg') || match[1].endsWith('.png') || match[1].endsWith('.jpeg'))) {
            urls.add(match[1]);
        }
    }
    
    console.log("Found image URLs:", [...urls]);
    
    const publicDir = path.join(__dirname, 'public', 'features');
    if (!fs.existsSync(publicDir)){
        fs.mkdirSync(publicDir, { recursive: true });
    }
    
    for (const url of urls) {
        // filter for the feature images: gym, bridge, exchange 106, golden triangle, furnished, infinity pool
        if (
            url.toLowerCase().includes('gym') || url.toLowerCase().includes('fitness') ||
            url.toLowerCase().includes('bridge') || url.toLowerCase().includes('pavilion') ||
            url.toLowerCase().includes('exchange') || url.toLowerCase().includes('trx') ||
            url.toLowerCase().includes('triangle') || url.toLowerCase().includes('furnished') ||
            url.toLowerCase().includes('pool') || url.toLowerCase().includes('facility') ||
            url.toLowerCase().includes('feature') || url.toLowerCase().includes('img')
            // Let's just download all of them that have the word feature or look relevant
        ) {
            const filename = path.basename(url);
            console.log(`Downloading ${filename}...`);
            await new Promise((resolve) => {
                https.get(url, (res) => {
                    const file = fs.createWriteStream(path.join(publicDir, filename));
                    res.pipe(file);
                    file.on('finish', () => resolve());
                }).on('error', (e) => {
                    console.error(`Error downloading ${url}`, e);
                    resolve();
                });
            });
        }
    }
};

fetchImages();
