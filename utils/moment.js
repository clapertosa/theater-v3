const moment = require("moment");

module.exports = {
  getCurrentDate: (format = "YYYY-MM-DD") => {
    return moment().format(format);
  },

  getMonthsAgo: (months, format = "YYYY-MM-DD") => {
    return moment()
      .subtract({ months })
      .format(format);
  }
};
