const getDate = (date) => {
  const currTime = date.slice(11, 16);
  const currDate = date.slice(0, 10).split("-").reverse().join("-");
  return ` ${currDate} ${currTime}`;
};

export { getDate };
