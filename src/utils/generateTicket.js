export const generateTicket = (numberOfTickets = 1, array) => {
  let numbers = [];
  let maxNumberOfTickets;
  numberOfTickets >= 8 || numberOfTickets <= 0
    ? (maxNumberOfTickets = 1)
    : (maxNumberOfTickets = numberOfTickets);

  while (numbers.length < maxNumberOfTickets * 5) {
    let randomNumber = Math.floor(Math.random() * array.length + 1);

    if (!numbers.includes(randomNumber)) {
      numbers.push(randomNumber);
    }
  }

  const newArray = array.filter((number) => !numbers.includes(number));

  const numbersPerArray = 5;

  const randomNumbersArray = Array.from(
    { length: maxNumberOfTickets },
    (_, i) => {
      const start = i * numbersPerArray;
      let temp = numbers.slice(start, start + numbersPerArray);
      return temp;
    }
  ).filter((array) => array.length !== 0);

  return { randomNumbersArray, newArray };
};
