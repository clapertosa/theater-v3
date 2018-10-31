import moment from "moment";

export const getToday = () => {
  return moment().format("YYYY-M-D");
};

export const getOneMonthAgo = () => {
  return moment()
    .subtract(30, "days")
    .format("YYYY-M-D");
};
//2018-10-31&primary_release_date.gte=2018-9-31
