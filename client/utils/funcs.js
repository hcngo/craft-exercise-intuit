const filterFloat = (value) => {
  if (/^(\-|\+)?([0-9]+(\.[0-9]+)?|Infinity)$/.test(value)) {
    return Math.round(Number(value) * 100) / 100;
  }
  return NaN;
};

export { filterFloat };
