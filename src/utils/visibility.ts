import { ExpectedVisibility } from "../@types";
import { expect } from "chai";

/**
 * Applies an assertion about a generic elements status
 * @param name a name for what element is being tested
 * @param selector the element selector
 * @param expectedVisibility the element status to assert
 */
export const expectElementVisibility = async (
  name: string,
  selector: Selector,
  expectedVisibility: ExpectedVisibility
) => {
  switch (expectedVisibility) {
    case "VISIBLE":
      expect(await selector.exists, `Expected element ${name} to exist`).to.be
        .true;
      expect(await selector.visible, `Expected element ${name} to be visible`)
        .to.be.true;
      break;

    case "HIDDEN":
      const visibleElementExists = await selector.filterVisible().exists;
      expect(
        !visibleElementExists,
        `Expected no visible version of selector ${name}`
      );
      break;

    case "ENABLED":
      expect(
        await selector.hasAttribute("disabled"),
        `Expected ${name} not to be disabled`
      ).to.be.false;
      break;

    case "DISABLED":
      expect(
        await selector.hasAttribute("disabled"),
        `Expected ${name} to be disabled`
      ).to.be.true;
      break;

    default:
      throw new Error(
        `Unknown expectedVisibility ${expectedVisibility} to ${name}`
      );
  }
};
