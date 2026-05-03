const calculateFine = (dueDate, returnDate, finePerDay) => {
  const due = new Date(dueDate);
  const returned = new Date(returnDate);

  if (returned <= due) {
    return 0;
  }

  const msPerDay = 1000 * 60 * 60 * 24;
  const lateDays = Math.ceil((returned - due) / msPerDay);
  return lateDays * finePerDay;
};

module.exports = calculateFine;
