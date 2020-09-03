import { Selector as $ } from "gherkin-testcafe";
import { When, Then } from "cucumber";
import { expect } from "chai";

import { ExpectedVisibility } from "../../@types";
import { expectElementVisibility } from "../../utils/visibility";

When(/^I click on "([^"]*)"( link)?$/i, async (t, [text]) => {
  await t.click($("a").withText(text));
});

When(/^I click on "([^"]*)" button$/i, async (t, [text]) => {
  await t.click($("button").withText(text));
});

Then(
  /^the "([^"]*)" link is (visible|enabled|disabled|hidden)$/i,
  async (_, [linkText, visibility]) => {
    const expectedVisibility = visibility.toUpperCase() as ExpectedVisibility;
    const linkElement = $("a").withText(linkText);

    await expectElementVisibility(
      `Link with text ${linkText}`,
      linkElement,
      expectedVisibility
    );
  }
);

Then(
  /^the "([^"]*)" button is (visible|enabled|disabled|hidden)$/i,
  async (_, [buttonText, visibility]) => {
    const expectedVisibility = visibility.toUpperCase() as ExpectedVisibility;
    const buttonElement = $("button").withText(buttonText);

    await expectElementVisibility(
      `Button with text ${buttonText}`,
      buttonElement,
      expectedVisibility
    );
  }
);
