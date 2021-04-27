'use strict';

// validate Date parameters
const dateValidator = ({ earlier, later }, date) => {
  const first = new Date(parseInt(earlier));
  const last = new Date(parseInt(later));
  const bydate = new Date(parseInt(date));
  if (
    last.getTime() > first.getTime() &&
    last.getTime() < new Date().getTime()
  ) {
    return { first, last };
  } else if (bydate instanceof Date) {
    return bydate;
  }
  return false;
};

export { dateValidator };
