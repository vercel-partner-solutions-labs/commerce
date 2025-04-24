"use client";

import { Input } from "@/components/ui/input";
import {
  formatCreditCardNumber,
  getCardType,
  stripCardFormatting,
} from "@/lib/sfcc/utils";
import { CreditCard } from "lucide-react";
import { ChangeEvent, useEffect, useState } from "react";
import {
  AmexIcon,
  DiscoverIcon,
  MasterCardIcon,
  VisaIcon,
} from "./icons/cc-icons";

interface CreditCardInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  id: string;
  name: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  onChange?: (value: string) => void;
}

export function CreditCardInput({
  id,
  name,
  placeholder,
  required = false,
  disabled = false,
  error,
  onChange,
  ...props
}: CreditCardInputProps) {
  const [value, setValue] = useState(props.defaultValue || "");
  const [cardType, setCardType] = useState("Unknown");

  useEffect(() => {
    const digits = stripCardFormatting(value.toString());
    const type = getCardType(digits);
    setCardType(type);

    if (onChange) {
      onChange(digits);
    }
  }, [value, onChange]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const formattedValue = formatCreditCardNumber(inputValue);
    setValue(formattedValue);
  };

  const Icon = {
    Visa: VisaIcon,
    MasterCard: MasterCardIcon,
    Amex: AmexIcon,
    Discover: DiscoverIcon,
  }[cardType];

  return (
    <div className="relative">
      <Input
        id={id}
        name={name}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        inputMode="numeric"
        required={required}
        disabled={disabled}
        className="pr-12"
        {...props}
      />
      <div className="absolute right-2 top-1/2 -translate-y-1/2">
        {Icon ? (
          <Icon className="w-6 h-6" />
        ) : (
          <CreditCard className="w-6 h-6 opacity-50" />
        )}
      </div>
    </div>
  );
}
