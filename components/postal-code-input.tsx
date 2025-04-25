import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CountryCode, PostalCodeConfig } from "@/lib/sfcc/constants";
import {
  formatCAPostal,
  formatUKPostcode,
  formatUSZip,
} from "@/lib/sfcc/utils";
import { useEffect, useState } from "react";

export interface PostalCodeInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  country: CountryCode;
  onValueChange?: (value: string) => void;
  label?: boolean;
  name: string;
  labelText?: string;
  error?: string;
  id?: string;
}

const POSTAL_CODE_CONFIG: Record<CountryCode, PostalCodeConfig> = {
  US: {
    label: "ZIP Code",
    placeholder: "12345",
    format: formatUSZip,
  },
  CA: {
    label: "Postal Code",
    placeholder: "A1A 1A1",
    format: formatCAPostal,
  },
  UK: {
    label: "Postcode",
    placeholder: "AB1 1BC",
    format: formatUKPostcode,
  },
};

export function PostalCodeInput({
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
}: PostalCodeInputProps) {
  const [inputValue, setInputValue] = useState<string>(
    typeof value === "string"
      ? value
      : typeof defaultValue === "string"
        ? defaultValue
        : "",
  );

  // Get the configuration for the selected country
  const config = POSTAL_CODE_CONFIG[country] || POSTAL_CODE_CONFIG.US;

  // Update internal value when the controlled value changes
  useEffect(() => {
    if (typeof value === "string" && value !== inputValue) {
      setInputValue(value);
    }
  }, [value]);

  // Format postal code when country changes
  useEffect(() => {
    if (inputValue) {
      const formattedValue = config.format(inputValue);
      setInputValue(formattedValue);
      onValueChange?.(formattedValue);
    }
  }, [country, config]);

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
  const inputId = id || `postal-code-${name}`;
  const errorId = error ? `${inputId}-error` : undefined;

  return (
    <div className="space-y-1.5">
      {label && <Label htmlFor={inputId}>{labelText || config.label}</Label>}
      <Input
        id={inputId}
        name={name}
        placeholder={config.placeholder}
        value={inputValue}
        onChange={handleChange}
        disabled={disabled}
        required={required}
        className={className}
        aria-invalid={error ? "true" : "false"}
        aria-errormessage={errorId}
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
