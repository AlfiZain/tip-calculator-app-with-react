import { tipPerPerson, totalPerPerson } from './calculateTip';

const billAmount = 142.55;
const tipPercent = 15;
const peopleAmount = 5;

describe('calculateTip', () => {
  it('should calculate tip per person correctly', () => {
    const expectedResult = 4.28;

    const result = tipPerPerson(billAmount, tipPercent, peopleAmount);

    expect(result).toBeCloseTo(expectedResult, 2);
  });

  it('should calculate total per person correctly', () => {
    const expectedResult = 32.79;

    const result = totalPerPerson(
      billAmount,
      tipPerPerson(billAmount, tipPercent, peopleAmount),
      peopleAmount,
    );

    expect(result).toBeCloseTo(expectedResult, 2);
  });
});
