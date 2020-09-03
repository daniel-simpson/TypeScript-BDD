import { Then, When, Given } from 'cucumber';
import { expect } from 'chai';

import {
  getCurrentUrl,
  getCurrentUrlQuery,
  addQuery,
  relativeOrAbsoluteUrl,
} from '../../utils/pageUrls';

Given(/^I open url (\/[A-Za-z0-9\/-]+)$/i, async (t, [url]) => {
  await t.navigateTo(relativeOrAbsoluteUrl(url));
});

When(/^I wait ([0-9]+) seconds?$/i, async (t, [secondsToWait]) => {
  const millisecondsToWait = 1000 * parseInt(secondsToWait, 10);
  await t.wait(millisecondsToWait);
});

When(/^I add the query parameter "([^"]*)" with value "([^"]*)"$/i, async (t, [key, value]) => {
  const oldUrl = await getCurrentUrl();

  const newUrl = addQuery(oldUrl, key, value);
  await t.navigateTo(newUrl);
});

Then(/^the "([^"]*)" query is set to "([^"]*)"$/i, async (t, [key, value]) => {
  const query = await getCurrentUrlQuery();

  expect(query).has.property(key);

  expect(query[key].toLowerCase()).to.contain(value.toLowerCase());
});
