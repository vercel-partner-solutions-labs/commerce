/**
 * Format a credit card number with spaces
 * @param value The credit card number to format
 * @returns The formatted credit card number
 */
export function formatCreditCardNumber(value: string): string {
  // Remove all non-digit characters
  const digits = value.replace(/\D/g, "");

  // Format based on card type
  const cardType = getCardType(digits);

  if (cardType === "Amex") {
    // Format as XXXX XXXXXX XXXXX for Amex
    return digits
      .replace(/(\d{4})/, "$1 ")
      .replace(/(\d{4}) (\d{6})/, "$1 $2 ")
      .substring(0, 17); // Limit to 15 digits + 2 spaces
  } else {
    // Format as XXXX XXXX XXXX XXXX for other cards
    return digits
      .replace(/(\d{4})/g, "$1 ")
      .trim()
      .substring(0, 19); // Limit to 16 digits + 3 spaces
  }
}

/**
 * Determine the credit card type based on the card number
 * @param cardNumber The credit card number
 * @returns The card type (Visa, MasterCard, Amex, Discover, or Unknown)
 */
export function getCardType(cardNumber: string): string {
  // Remove all non-digit characters
  const digits = cardNumber.replace(/\D/g, "");

  // Basic card type detection based on first digits
  if (digits.startsWith("4")) {
    return "Visa";
  } else if (/^5[1-5]/.test(digits)) {
    return "MasterCard";
  } else if (/^3[47]/.test(digits)) {
    return "Amex";
  } else if (/^6(?:011|5)/.test(digits)) {
    return "Discover";
  } else {
    return "Unknown";
  }
}

/**
 * Strip all non-digit characters from a credit card number
 * @param cardNumber The credit card number with formatting
 * @returns The card number with only digits
 */
export function stripCardFormatting(cardNumber: string): string {
  return cardNumber.replace(/\D/g, "");
}

/**
 * Validate a credit card number using the Luhn algorithm
 * @param cardNumber The credit card number to validate
 * @returns Whether the card number is valid
 */
export function validateCardNumber(cardNumber: string): boolean {
  const digits = cardNumber.replace(/\D/g, "");

  // Check if the card number is empty or has invalid length
  if (!digits || digits.length < 12 || digits.length > 19) {
    return false;
  }

  // Luhn algorithm
  let sum = 0;
  let shouldDouble = false;

  // Loop through the digits in reverse
  for (let i = digits.length - 1; i >= 0; i--) {
    let digit = parseInt(digits.charAt(i));

    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;
    shouldDouble = !shouldDouble;
  }

  return sum % 10 === 0;
}

/**
 * Mask all but the last 4 digits of a credit card number
 * @param cardNumber The credit card number to mask
 * @returns The masked card number with only the last 4 digits visible
 */
export function maskCardNumber(cardNumber: string): string {
  if (cardNumber.length < 4) return cardNumber;
  const lastFourDigits = cardNumber.slice(-4);
  return `************${lastFourDigits}`;
}

export const months = Array.from({ length: 12 }, (_, i) => {
  const month = i + 1;
  return {
    value: month.toString().padStart(2, "0"),
    label: month.toString().padStart(2, "0"),
  };
});

const currentYear = new Date().getFullYear();
export const years = Array.from({ length: 10 }, (_, i) => {
  const year = currentYear + i;
  return {
    value: year.toString(),
    label: year.toString(),
  };
});

// Format functions for different postal code types
export const formatUSZip = (value: string): string => {
  // Remove non-numeric characters
  const nums = value.replace(/[^\d]/g, "");

  // Format as XXXXX or XXXXX-XXXX
  if (nums.length <= 5) {
    return nums;
  } else {
    return `${nums.slice(0, 5)}-${nums.slice(5, 9)}`;
  }
};

export const formatCAPostal = (value: string): string => {
  // Remove non-alphanumeric characters
  const cleaned = value.replace(/[^a-zA-Z0-9]/g, "").toUpperCase();

  // Format as A1A 1A1
  if (cleaned.length <= 3) {
    return cleaned;
  } else {
    return `${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)}`.trim();
  }
};

export const formatUKPostcode = (value: string): string => {
  // Remove non-alphanumeric characters and convert to uppercase
  const cleaned = value.replace(/[^a-zA-Z0-9]/g, "").toUpperCase();

  // UK postcodes have variable length but generally split into outward + inward codes
  if (cleaned.length <= 4) {
    return cleaned;
  } else {
    // Split between outward code and inward code (last 3 characters)
    const outwardLength = cleaned.length - 3;
    return `${cleaned.slice(0, outwardLength)} ${cleaned.slice(outwardLength)}`.trim();
  }
};

// Format phone for US: (XXX) XXX-XXXX
export const formatUSPhone = (value: string): string => {
  // Remove non-numeric characters
  const nums = value.replace(/[^\d]/g, "");

  if (nums.length <= 3) {
    return nums;
  } else if (nums.length <= 6) {
    return `(${nums.slice(0, 3)}) ${nums.slice(3)}`;
  } else {
    return `(${nums.slice(0, 3)}) ${nums.slice(3, 6)}-${nums.slice(6, 10)}`;
  }
};

// Format phone for Canada: (XXX) XXX-XXXX (same as US)
export const formatCAPhone = (value: string): string => {
  return formatUSPhone(value);
};

// No formatting for UK phone numbers to keep things simple
export const formatUKPhone = (value: string): string => {
  return value;
};
