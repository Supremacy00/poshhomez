export const formattedAmount = (price: number | string) => {
    const amountValue = typeof price === "string" ? parseFloat(price) : price;
    const roundedValue = Math.round(amountValue);
    const formattedValue =
      roundedValue % 1 === 0
        ? roundedValue.toLocaleString() + ".00"
        : amountValue.toLocaleString();
    return formattedValue;
  };