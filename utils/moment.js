const moment = require("moment");

module.exports = {
  getCurrentDate: (format = "YYYY-MM-DD") => {
    return moment().format(format);
  },

  getMonthsAgo: (months, format = "YYYY-MM-DD") => {
    return moment()
      .subtract({ months })
      .format(format);
  },

  addDays: (days, format = "YYYY-MM-DD") => {
    return moment()
      .add({ days })
      .format(format);
  },

  getAge: (birthday, deathday) => {
    return deathday
      ? moment(deathday).diff(birthday, "years")
      : moment().diff(birthday, "years");
  },

  convertToLocal: date => {
    return moment(date).format("LL");
  }
};
