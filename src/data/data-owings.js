import { fromToday } from "../utilities/helpers";

/**
 * Generates random owings for each person in the input array.
 *
 * @param {Array} persons - An array of person objects
 * @return {Array} An array of randomly generated owings
 */
const generateRandomOwings = (persons) => {
  const owings = [];
  persons.forEach((p) => {
    const numberOfOwings = Math.floor(Math.random() * 4);
    for (let i = 1; i <= numberOfOwings; i++) {
      const amountOwed = Math.floor(Math.random() * 100 + 1) * 10;
      const direction = !!Math.floor(Math.random() * 2);
      const dateOfOwing = fromToday(-Math.floor(Math.random() * 365 + 1));
      const newOwing = {
        movementDate: dateOfOwing,
        amount: direction ? amountOwed : -amountOwed,
        personId: p.id,
      };
      owings.push(newOwing);
    }
  });
  return owings;
};

export default generateRandomOwings;
