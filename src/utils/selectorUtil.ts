/**
 * Iterates through an array of selectors returning the first selector that matches a DOM element on the current screen
 * @param selectors List of selectors to test
 */
export const selectorWithFallback = async (selectors: Selector[]) => {
  for (const selector of selectors) {
    if (await selector.exists) {
      return selector;
    }
  }

  throw new Error(`Unable to select element with any of ${selectors}`);
};

/**
 * Iterates through an array of selectors and returns true if an element is returned by any selector
 * @param selectors List of selectors to test
 */
export const anyExist = async (selectors: Selector[]) => {
  for (const selector of selectors) {
    if (await selector.exists) {
      return true;
    }
  }
  return false;
};
