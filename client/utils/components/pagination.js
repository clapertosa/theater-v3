export const getNumbers = (currentPage, totalPages) => {
  let numbers = [];

  if (totalPages <= 5) {
    for (let i = 0; i < totalPages; i++) {
      numbers.push(i + 1);
    }
  } else if (currentPage <= 1) {
    for (let i = 0; i < totalPages && i < 5; i++) {
      numbers.push(i + 1);
    }
  } else if (currentPage > 1) {
    for (let i = currentPage; i > 0 && numbers.length <= 2; i--) {
      numbers.push(i);
    }

    if (totalPages >= currentPage + 2) {
      for (let i = currentPage; i < totalPages && i < currentPage + 2; i++) {
        numbers.push(i + 1);
      }
    } else if (totalPages >= currentPage + 1) {
      for (let i = currentPage; i < totalPages && i < currentPage + 1; i++) {
        numbers.push(i + 1);
      }
    }
    numbers = numbers.sort((a, b) => a - b);
  }

  return numbers;
};
