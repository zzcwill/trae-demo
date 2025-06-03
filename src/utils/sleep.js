export const sleep = (millisecond) => {
  return new Promise((resolve) => setTimeout(resolve, millisecond));
};
