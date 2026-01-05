const fs = require('fs');

function updateQuote() {
  try {
    const quotes = require('./quotes.json');

    if (!Array.isArray(quotes) || quotes.length === 0) {
      throw new Error('quotes.json is empty or not an array');
    }

    const randomIndex = Math.floor(Math.random() * quotes.length);
    const { quote, author } = quotes[randomIndex];

    const cardDesign = `
<!--STARTS_HERE_QUOTE_CARD-->
<p align="center">
  <img src="https://readme-daily-quotes.vercel.app/api?author=${encodeURIComponent(author)}&quote=${encodeURIComponent(quote)}&theme=dark&bg_color=220a28&author_color=ffeb95&accent_color=c56a90">
</p>
<!--ENDS_HERE_QUOTE_CARD-->
`;

    const readmePath = './README.md';
    let readmeContent = fs.readFileSync(readmePath, 'utf-8');

    readmeContent = readmeContent.replace(
      /<!--STARTS_HERE_QUOTE_CARD-->[\s\S]*?<!--ENDS_HERE_QUOTE_CARD-->/,
      cardDesign
    );

    fs.writeFileSync(readmePath, readmeContent, 'utf-8');
    console.log('✅ Quote updated successfully!');
  } catch (error) {
    console.error('❌ Error updating quote:', error.message);
  }
}

updateQuote();
