const areArraysEqual = <T>(array1: T[], array2: T[]): boolean => {
  if (array1.length !== array2.length) {
    return false;
  }
  return array1.every((element, index) => element === array2[index]);
};

export { areArraysEqual };
