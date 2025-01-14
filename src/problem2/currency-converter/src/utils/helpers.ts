export const convertMoney = (
  rates: Record<string, number>,
  value: string,
  convertTo: string
) => {
  const moneyRate = rates[convertTo];
  if (!moneyRate || isNaN(Number(value))) {
    return null;
  }
  const convertedMoney = Number(value) * moneyRate;

  return convertedMoney;
};

export const preventKeyInput = (
  event: React.KeyboardEvent<HTMLInputElement>
) => {
  const allowedKeys = [
    "Backspace",
    "Tab",
    "ArrowLeft",
    "ArrowRight",
    "Delete",
    "Enter",
    ".",
  ];
  const isNumber = /^[0-9]$/.test(event.key);

  if (!isNumber && !allowedKeys.includes(event.key)) {
    event.preventDefault();
  }
};

export const formatNumber = (value: string | number | undefined) => {
  if (!value) return "";
  const [integerPart, decimalPart] = `${value}`.split(".");
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return decimalPart ? `${formattedInteger}.${decimalPart}` : formattedInteger;
};

export const parserNumberFormItem = (value?: string) => {
  if (!value) return "";
  return value?.replace(/\$\s?|(,*)/g, "") as unknown as number;
};
