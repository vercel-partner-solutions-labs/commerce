import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CountryCode } from "@/lib/sfcc/constants";
import { formatCAPhone, formatUKPhone, formatUSPhone } from "@/lib/sfcc/utils";
import { useEffect, useState } from "react";

export interface PhoneInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  country: CountryCode;
  onValueChange?: (value: string) => void;
  label?: boolean;
  name: string;
  labelText?: string;
  error?: string;
  id?: string;
}

const PHONE_CONFIG: Record<
  CountryCode,
  {
    label: string;
    format: (value: string) => string;
  }
> = {
  US: {
    label: "Phone",
    format: formatUSPhone,
  },
  CA: {
    label: "Phone",
    format: formatCAPhone,
  },
  UK: {
    label: "Phone",
    format: formatUKPhone,
  },
};

export function PhoneInput({
  country,
  defaultValue = "",
  value,
  onChange,
  onValueChange,
  label = true,
  labelText,
  name,
  error,
  id,
  disabled = false,
  required = false,
  className,
  ...props
}: PhoneInputProps) {
  const [inputValue, setInputValue] = useState<string>(
    typeof value === "string"
      ? value
      : typeof defaultValue === "string"
        ? defaultValue
        : "",
  );

  // Get the configuration for the selected country
  const config = PHONE_CONFIG[country] || PHONE_CONFIG.US;

  // Update internal value when the controlled value changes
  useEffect(() => {
    if (typeof value === "string" && value !== inputValue) {
      setInputValue(value);
    }
  }, [value, inputValue]);

  // Format phone when country changes
  useEffect(() => {
    if (inputValue) {
      const formattedValue = config.format(inputValue);
      setInputValue(formattedValue);
      onValueChange?.(formattedValue);
    }
  }, [country, config, inputValue, onValueChange]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    const formattedValue = config.format(rawValue);

    setInputValue(formattedValue);

    // Call the original onChange if provided
    if (onChange) {
      // Create a synthetic event with the formatted value
      const syntheticEvent = {
        ...e,
        target: {
          ...e.target,
          value: formattedValue,
        },
      } as React.ChangeEvent<HTMLInputElement>;
      onChange(syntheticEvent);
    }

    // Call the value change callback if provided
    onValueChange?.(formattedValue);
  };

  // Use the provided id or generate one from the name
  const inputId = id || `phone-${name}`;
  const errorId = error ? `${inputId}-error` : undefined;

  return (
    <div className="space-y-1.5">
      {label && <Label htmlFor={inputId}>{labelText || config.label}</Label>}
      <Input
        id={inputId}
        name={name}
        value={inputValue}
        onChange={handleChange}
        disabled={disabled}
        required={required}
        className={className}
        aria-invalid={error ? "true" : "false"}
        aria-errormessage={errorId}
        type="tel"
        {...props}
      />
      {error && (
        <p id={errorId} className="text-sm text-red-500" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
