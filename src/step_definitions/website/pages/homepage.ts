import { Given, Then } from "cucumber";
import { expect } from "chai";

import { getPageUrlByName, getCurrentUrl } from "../../../utils/pageUrls";

Given(/^I open the home page$/i, async (t) => {
  const url = getPageUrlByName("HOME");
  await t.navigateTo(url);
});

Then(/^I am on the home page$/i, async (t) => {
  const currentUrl = await getCurrentUrl();

  expect(currentUrl.toLowerCase()).to.contain(
    getPageUrlByName("HOME").toLowerCase()
  );
});
