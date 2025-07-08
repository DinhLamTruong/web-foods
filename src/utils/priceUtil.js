export const formatPrice = (price) => {
  if (typeof price === 'number') {
    return price.toLocaleString('vi-VN') + 'đ';
  }
  if (typeof price === 'string') {
    const numericStr = price.replace(/\D/g, '');
    if (numericStr) {
      return parseInt(numericStr, 10).toLocaleString('vi-VN') + 'đ';
    }
  }
  return '0đ';
};
