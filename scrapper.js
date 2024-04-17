const https = require('https');

const quick_updates = () => {
  return new Promise((resolve, reject) => {
    https.get('https://time.com', (response) => {
      let html = '';

      response.on('data', (chunk) => {
        html += chunk;
      });

      response.on('end', () => {
        const stories = [];

        // Regular expressions to extract story titles and links
        const titleRegex = /<h3[^>]>(.?)<\/h3>/gi;
        const linkRegex = /<a\s+(?:[^>]?\s+)?href="([^"])"/gi;

        let titleMatch;
        let linkMatch;
        let storyCount = 0;

        while ((titleMatch = titleRegex.exec(html)) !== null && storyCount < 6) {
          const title = titleMatch[1].trim();
          linkRegex.lastIndex = titleRegex.lastIndex; // Set the starting index for link search
          linkMatch = linkRegex.exec(html);
          if (linkMatch) {
            const link = linkMatch[1];
            stories.push({ title, link });
            storyCount++;
          }
        }

        resolve(stories);
      });
    }).on('error', (error) => {
      console.error(error);
      reject([]);
    });
  });
};

quick_updates().then(stories => {
  console.log(JSON.stringify(stories, null, 2));
});
