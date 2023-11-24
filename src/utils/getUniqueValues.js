export const getUniqueValues = (data, attr) => {
  let unique = [...new Set(data.map((item) => item[attr]))];

  unique.sort((a, b) => {
    if (a) return a.localeCompare(b);
    return a;
  });

  return unique;
};

export const getUniqueLength = (data, attr) => {
  let unique = [
    ...new Set(data.map((item) => item[attr].length && item[attr].length)),
  ];

  unique.sort((a, b) => {
    if (a) return b - a;
    return a;
  });

  return unique;
};

export const filterUniqueValues = (data, attr) => {
  let unique = [
    ...new Set(data.filter((item) => item[attr] && !undefined && item)),
  ];

  unique.sort(function (a, b) {
    return b.length - a.length;
  });

  return unique;
};
