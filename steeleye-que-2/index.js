function extractPlainTextFromHTML(htmlContent) {
  const plainText = htmlContent
    .replace(/<br\s*\/?>/g, " ")
    .replace(/<\/a>/g, " ")
    .replace(/<[^>]*>/g, "");

  const cleanPlainText = plainText.replace(/\s{2,}/g, " ").trim();
  return cleanPlainText;
}

function highlightHTMLContent(htmlContent, plainText, plainTextPositions) {
  // Find the corresponding positions in htmlContent and highlight the content
  let highlightedHtmlContent = htmlContent;
  for (const { start, end } of plainTextPositions) {
    // Wrap the word with <mark> tag to highlight it
    const wordToHighlight = plainText.slice(start, end);
    const regex = new RegExp(`\\b${wordToHighlight}\\b`, "g");
    highlightedHtmlContent = highlightedHtmlContent.replace(
      regex,
      (match, index) => {
        if (index >= start) {
          return `<mark>${wordToHighlight}</mark>`;
        } else {
          return match;
        }
      }
    );
  }

  return highlightedHtmlContent;
}

const plainTextPositions = [
  {
    start: 241,
    end: 247,
  },

  {
    start: 518,
    end: 525,
  },
];

const htmlContent = `<p><span>Hi David<br><br>Headline: Energix Closes $520 Million Financing and Tax Equity Deal to Fund New Solar Projects<br><br>Summary: Two deals with Morgan Stanley Renewables Inc. and Santander CIB will help finance the construction and operation of six utility Equity scale solar…<br><br>Read the full article <a href="https://content.seleritycorp.com/hosted/assets/www/UKMW47_hYz_RGzPSpHm44Hi1L49HdNBhs1OkKKW2OPI">here</a><br><br>-------------------------------------<br><br>You received this because you are subscribed to news related to <a href="https://iris.steeleye.co/market/instruments?search=ES0113900J37">ES0113900J37</a>, and this story was marked as 82% relevant.<br><br>Copyright of PR Newswire. All Rights Reserved. Terms and Conditions | Privacy Policy. To stop PR Newswire emails from getting removed by email filters please add our address (noreply@prnewswire.com) to your email address book. Registered Office: 3 Spring Mews, London SE11 5AN. Tel: +44 (0) 207 8405100. <br><br>To unsubscribe change  your email preferences, please click <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley">here</a>.<br><br>-------------------------------------<br><br><img src="https://context.seleritycorp.com/selerity/assets/sc_icons/pressRelease.png" alt="Rick Astley" style="width:100px;height:100px;"></span></p>`;

const plainText = extractPlainTextFromHTML(htmlContent);
//   console.log(plainText);

const highlightedContent = highlightHTMLContent(
  htmlContent,
  plainText,
  plainTextPositions
);
console.log(plainText);

// console.log(str.slice(400, 450));
// console.log(str.slice(241, 247));
// console.log(plainText.slice(400, 450));
// console.log(plainText.slice(241, 247));
// console.log(str.length);
// console.log(plainText.length);
console.log(highlightedContent);

document.querySelector("body").innerHTML = highlightedContent;
module.exports = { extractPlainTextFromHTML, highlightHTMLContent };
