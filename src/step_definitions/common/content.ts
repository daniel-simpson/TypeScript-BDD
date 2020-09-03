import { Then } from "cucumber";
import { Selector as $ } from "testcafe";
import { expect } from "chai";

import { ExpectedVisibility } from "../../@types";
import { expectElementVisibility } from "../../utils/visibility";
import { anyExist } from "../../utils/selectorUtil";
import { getCurrentUrl, relativeOrAbsoluteUrl } from "../../utils/pageUrls";
import { getPageContentByUrl } from "../../utils/pageContent";

Then(
  /^the message "([^"]*)" is (visible|hidden|enableed|disabled)$/i,
  async (_, [x, visibility]) => {
    const expectedVisibility = visibility.toUpperCase() as ExpectedVisibility;

    await expectElementVisibility(
      `Message: ${x}`,
      $("p, span").withText(x),
      expectedVisibility
    );
  }
);

// TODO: refactor to use same ExpectedVisibility set up as above
Then(
  /^the error "([^"]*)" is (visible|hidden)$/i,
  async (_, [error, visibility]) => {
    const expectedVisibility = visibility.toUpperCase() as ExpectedVisibility;

    const hasErrors = await anyExist([
      $('div[data-id="FormErrorWarn.default"]').withText(error), // Sales Funnel
    ]);

    switch (expectedVisibility) {
      case "VISIBLE":
        expect(hasErrors).to.be.true;
        break;

      case "HIDDEN":
        expect(hasErrors).to.be.false;
        break;

      default:
        throw new Error(`Unknown visibility ${expectedVisibility}`);
    }
  }
);
Then(/^a title "([^"]*)" is visible$/i, async (t, [title]) => {
  t.expect($("h1, h2, h3, h4, h5, h6").withText(title).exists);
});

Then(/^the url contains "([^"]*)"$/i, async (t, [urlPart]) => {
  const currentUrl = await getCurrentUrl();

  expect(currentUrl.toLowerCase()).to.contain(urlPart.toLowerCase());
});

Then(
  /^"([^"]*)" and "([^"]*)" have the same page content$/i,
  async (t, [url1, url2]) => {
    const pageInfo1 = await getPageContentByUrl(relativeOrAbsoluteUrl(url1));
    const pageInfo2 = await getPageContentByUrl(relativeOrAbsoluteUrl(url2));

    expect(pageInfo1.status).to.equal(pageInfo2.status);
    expect(pageInfo1.text).to.equal(pageInfo2.text);

    expect(pageInfo1.text.length).not.to.equal(0);
    expect(pageInfo1.status).not.to.equal(404);
  }
);
