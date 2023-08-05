const { extractPlainTextFromHTML, highlightHTMLContent } = require("./index"); // Replace with the actual path to your implementation file.

describe("extractPlainTextFromHTML", () => {
  it("should remove HTML tags and convert <br> tags to spaces", () => {
    const htmlContent = "<p>Hello<br><br>World</p>";
    const expectedPlainText = "Hello World";
    expect(extractPlainTextFromHTML(htmlContent)).toBe(expectedPlainText);
  });

    it('should handle anchor tags', () => {
      const htmlContent = '<p><a href="https://example.com">Click here</a>world<p>';
      const expectedPlainText = 'Click here world';
      expect(extractPlainTextFromHTML(htmlContent)).toBe(expectedPlainText);
    });
});

describe("highlightHTMLContent", () => {
  const htmlContent = `<p>Hi David<br><br>Headline: Energix Closes $520 Million Financing and Tax Equity Deal to Fund New Solar Projects<br><br>Summary: Two deals with Morgan Stanley Renewables Inc. and Santander CIB will help finance the construction and operation of six utility Equity scale solar…<br><br>Read the full article <a href="https://content.seleritycorp.com/hosted/assets/www/UKMW47_hYz_RGzPSpHm44Hi1L49HdNBhs1OkKKW2OPI">here</a><br><br>-------------------------------------<br><br>You received this because you are subscribed to news related to <a href="https://iris.steeleye.co/market/instruments?search=ES0113900J37">ES0113900J37</a>, and this story was marked as 82% relevant.<br><br>Copyright of PR Newswire. All Rights Reserved. Terms and Conditions | Privacy Policy. To stop PR Newswire emails from getting removed by email filters please add our address (noreply@prnewswire.com) to your email address book. Registered Office: 3 Spring Mews, London SE11 5AN. Tel: +44 (0) 207 8405100. <br><br>To unsubscribe change  your email preferences, please click <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley">here</a>.<br><br>-------------------------------------<br><br><img src="https://context.seleritycorp.com/selerity/assets/sc_icons/pressRelease.png" alt="Rick Astley" style="width:100px;height:100px;"></p>`;

  it("should highlight the specified words", () => {
    const plainTextPositions = [
      { start: 241, end: 247 },
      { start: 518, end: 525 },
    ];
    const expectedHighlightedContent = `<p>Hi David<br><br>Headline: Energix Closes $520 Million Financing and Tax Equity Deal to Fund New Solar Projects<br><br>Summary: Two deals with Morgan Stanley Renewables Inc. and Santander CIB will help finance the construction and operation of six utility <mark>Equity</mark> scale solar…<br><br>Read the full article <a href="https://content.seleritycorp.com/hosted/assets/www/UKMW47_hYz_RGzPSpHm44Hi1L49HdNBhs1OkKKW2OPI">here</a><br><br>-------------------------------------<br><br>You received this because you are subscribed to news related to <a href="https://iris.steeleye.co/market/instruments?search=ES0113900J37">ES0113900J37</a>, and this story was marked as 82% relevant.<br><br>Copyright of PR Newswire. All Rights Reserved. Terms and Conditions | <mark>Privacy</mark> Policy. To stop PR Newswire emails from getting removed by email filters please add our address (noreply@prnewswire.com) to your email address book. Registered Office: 3 Spring Mews, London SE11 5AN. Tel: +44 (0) 207 8405100. <br><br>To unsubscribe change  your email preferences, please click <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley">here</a>.<br><br>-------------------------------------<br><br><img src="https://context.seleritycorp.com/selerity/assets/sc_icons/pressRelease.png" alt="Rick Astley" style="width:100px;height:100px;"></p>`;
    expect(
      highlightHTMLContent(
        htmlContent,
        extractPlainTextFromHTML(htmlContent),
        plainTextPositions
      )
    ).toBe(expectedHighlightedContent);
  });


  it("should handle no word to highlight", () => {
    const plainTextPositions = [];
    const expectedHighlightedContent = htmlContent;
    expect(
      highlightHTMLContent(
        htmlContent,
        extractPlainTextFromHTML(htmlContent),
        plainTextPositions
      )
    ).toBe(expectedHighlightedContent);
  });
});
