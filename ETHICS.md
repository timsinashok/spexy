# Ethical Considerations of Web Scraping

This project scrapes the webpage [https://www.eyebuydirect.com/eyeglasses/](https://www.eyebuydirect.com/eyeglasses/) and I have made the following ethical considerations while working on the project: 

1. **Respect for Website Terms of Service** : Many websites have terms of service that explicitly prohibit or restrict web scraping. I have carefully reviewed `robots.txt` file of the website and have confirmed that Web-agents can ethically scrape `https://www.eyebuydirect.com/eyeglasses/` this webpage. 

2. **Data Privacy** : `https://www.eyebuydirect.com/eyeglasses/` is a publicly available website and we have only scrapped publicly available information which is the name price and available colors for the glasses. I have not scrapped any personal data from the website. 

3. **Rate Limiting**: Excessive scraping can put a significant load on a website's server, potentially affecting its performance and availability for other users.To minimize the impact on website performance, I implemented rate limiting in our scraping scripts. This ensures that I do not overwhelm the server with too many requests in a short period.

4. **Respect for Intellectual Property**: The content on websites is often protected by copyright laws. Scraping and using this content without permission can infringe on intellectual property rights. I only scrape data that is publicly available and do not use it for commercial purposes without proper authorization. I give credit to the original sources where applicable.

### Edited after 2nd Project was graded
What data are Scraped:
- Name of Glass
- Price of Glass
- Link to the product
- Color choices available

All these data are publicly avialiable in the website. And they do not contain any personal information.

## Why are you scraping the data? 
As the goal of the project is to recommend glasses to people based on the face shape, the project would need some data to make the recommendations.

### What purposes will the data be used for?
The data will be used only to recommend glasses to people based on the face shape. There will also be a link to the product on the original website. The data will be filtered based on user's query. 
 

By following the guidelines above, I conducted web scraping in an ethical and responsible manner.
