'use strict';

// validate Date parameters
const dateValidator = ({ earlier, later }) => {
  const first = new Date(parseInt(earlier));
  const last = new Date(parseInt(later));
  if (
    last.getTime() > first.getTime() &&
    last.getTime() < new Date().getTime()
  ) {
    return { first, last };
  }
  return false;
};

export { dateValidator };
