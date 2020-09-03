import { Selector as $ } from "gherkin-testcafe";
import { When, Then } from "cucumber";
import { expect } from "chai";
import { getCurrentUrl, getPageUrlByName } from "../../../utils/pageUrls";

const searchMenuButton = $("header button").withText("Search");
const searchBar = $("header form input").withAttribute("type", "search");

When(/^I search for "([^"]*)"$/, async (t, [searchText]) => {
  await t.click(searchMenuButton);
  await t.typeText(searchBar, searchText);
  await t.pressKey("enter");
});

When(/^I click on the first search result$/i, async (t) => {
  const showingSearchResultsMessage = $("p").withText("Showing results for");
  const firstResultLink = showingSearchResultsMessage.nextSibling().child("a");

  await t.click(firstResultLink);
});

Then(/^I am on the search page$/i, async (t) => {
  const currentUrl = await getCurrentUrl();

  expect(currentUrl.toLowerCase()).to.contain(
    getPageUrlByName("SEARCH").toLowerCase()
  );
});

Then(/there are search results for "([^"]*)"/i, async (t, [searchText]) => {
  const showingSearchResultsForMessage = $("p").withText(
    `Showing results for ${searchText}`
  );

  expect(await showingSearchResultsForMessage.exists).to.be.true;
});
