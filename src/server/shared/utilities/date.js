export const getToday = () => {
  let date = new Date();

  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
};

export const getOneMonthAgo = () => {
  let date = new Date();

  return `${
    date.getMonth() === 0 ? date.getFullYear() - 1 : date.getFullYear()
  }-${
    date.getMonth() === 0 ? date.getMonth() + 12 : date.getMonth()
  }-${date.getDate()}`;
};
