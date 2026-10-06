const ONES = [
  '', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine',
  'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen',
  'Seventeen', 'Eighteen', 'Nineteen'
];

const TENS = [
  '', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'
];

const SCALES = ['', 'Thousand', 'Million', 'Billion', 'Trillion'];

function convertChunk(num: number): string {
  let chunk = '';
  if (num >= 100) {
    chunk += `${ONES[Math.floor(num / 100)]} Hundred `;
    num %= 100;
  }
  if (num >= 20) {
    chunk += `${TENS[Math.floor(num / 10)]} `;
    num %= 10;
  }
  if (num > 0) {
    chunk += `${ONES[num]} `;
  }
  return chunk.trim();
}

export function numberToWords(amount: number, currencyCode: string = 'USD'): string {
  if (isNaN(amount) || amount === 0) {
    return 'Zero ' + getCurrencyName(currencyCode) + ' Only';
  }

  const isNegative = amount < 0;
  const absAmount = Math.abs(amount);
  const dollars = Math.floor(absAmount);
  const cents = Math.round((absAmount - dollars) * 100);

  let result = '';

  if (dollars === 0) {
    result = 'Zero';
  } else {
    let scaleIndex = 0;
    let temp = dollars;
    const parts: string[] = [];

    while (temp > 0) {
      const chunk = temp % 1000;
      if (chunk !== 0) {
        const chunkText = convertChunk(chunk);
        const scaleText = SCALES[scaleIndex] ? ` ${SCALES[scaleIndex]}` : '';
        parts.unshift(`${chunkText}${scaleText}`);
      }
      temp = Math.floor(temp / 1000);
      scaleIndex++;
    }

    result = parts.join(' ');
  }

  const currencyName = getCurrencyName(currencyCode);
  let finalStr = `${isNegative ? 'Negative ' : ''}${result} ${currencyName}`;

  if (cents > 0) {
    const centsText = convertChunk(cents);
    finalStr += ` and ${centsText} Cents`;
  }

  return `${finalStr.trim()} Only`;
}

function getCurrencyName(code: string): string {
  switch (code.toUpperCase()) {
    case 'USD':
      return 'US Dollars';
    case 'EUR':
      return 'Euros';
    case 'GBP':
      return 'Pounds Sterling';
    case 'BDT':
      return 'Bangladeshi Taka';
    case 'INR':
      return 'Indian Rupees';
    case 'CAD':
      return 'Canadian Dollars';
    case 'AUD':
      return 'Australian Dollars';
    case 'SGD':
      return 'Singapore Dollars';
    case 'AED':
      return 'UAE Dirhams';
    case 'JPY':
      return 'Japanese Yen';
    default:
      return `${code} Currency Units`;
  }
}
