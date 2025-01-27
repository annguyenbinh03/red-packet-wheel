const formatVND = (amount, locale = 'vi-VN', currency = 'VND') => {
  const formatter = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  });
  return formatter.format(amount);
};

export default formatVND;
