export const formatBalance = (balance: string) => {
  const num = parseFloat(balance);
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 5,
  }).format(num);
};
