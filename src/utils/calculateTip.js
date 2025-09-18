export function tipPerPerson(billAmount, tipPercent, peopleAmount) {
  return (billAmount * (tipPercent / 100)) / peopleAmount;
}

export function totalPerPerson(billAmount, tipAmount, peopleAmount) {
  return billAmount / peopleAmount + tipAmount;
}
