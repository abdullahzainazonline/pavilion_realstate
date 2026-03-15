const fs = require('fs');
const https = require('https');
const path = require('path');

const fetchImages = async () => {
    const res = await fetch('https://pavillionsquarebb.com/');
    const text = await res.text();
    
    // We get the 6 feature areas
    const featuresRegex = /<h4[^>]*><span>(.*?)<\/span><\/h4>.*?<p>(.*?)<\/p>/gs;
    let m;
    let index = 1;
    const publicDir = path.join(__dirname, 'public', 'features');
    if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir);

    const matches = [...text.matchAll(featuresRegex)];
    for (const match of matches) {
        const title = match[1].trim();
        const desc = match[2].trim();
        
        // Next, search backwards from this h4 for the closest img src
        const beforeHTML = text.substring(0, match.index);
        const imgRegex = /<img[^>]+src=["'](https:\/\/pavillionsquarebb.com\/wp-content\/uploads\/[^"']+)["']/g;
        let lastImg;
        let imgMatch;
        while ((imgMatch = imgRegex.exec(beforeHTML)) !== null) {
            lastImg = imgMatch[1];
        }
        
        if (title.includes('Gym') || title.includes('Bridge') || title.includes('Exchange') || title.includes('Triangle') || title.includes('Furnished') || title.includes('Pool')) {
            console.log(`Title: ${title}`);
            console.log(`Img: ${lastImg}`);
            
            const filename = path.basename(lastImg);
            const localPath = path.join(publicDir, filename);

            if (!fs.existsSync(localPath)) {
                await new Promise((resolve) => {
                    https.get(lastImg, (res) => {
                        const file = fs.createWriteStream(localPath);
                        res.pipe(file);
                        file.on('finish', resolve);
                    });
                });
            }
        }
    }
};

fetchImages();
