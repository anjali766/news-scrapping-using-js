This Node.js script is tailored to offer users rapid updates on the most recent stories from the Time website. 
It functions by retrieving the HTML content of the Time website and extracting the titles along with their corresponding links. 
Instead of the requests library, it utilizes the built-in https module to make an HTTP GET request to the Time website. 
Subsequently, it parses the HTML content to extract the titles and links of the latest stories. 
Finally, the extracted information is formatted and displayed in the console, providing users with easy access to the latest news articles.

########################################################################################
Apart form this, we can also run this script on the console of time website to get the latest stories 

const stories = [];
document.querySelectorAll('.latest-stories__item').forEach(storyElement => {
    const linkElement = storyElement.querySelector('a');
    const titleElement = storyElement.querySelector('.latest-stories__item-headline');   
    if (linkElement && titleElement) {
        const link = linkElement.getAttribute('href').trim();   
        const title = titleElement.textContent.trim();
        stories.push({ "title": title, "link": link });
    }
});
console.log(JSON.stringify(stories, null, 2));
