import { PhoneInput } from "@/components/phone-input";
import { PostalCodeInput } from "@/components/postal-code-input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CountryCode } from "@/lib/sfcc/constants";
import { addressFormSchema } from "@/lib/sfcc/schemas";
import { useState } from "react";
import { z } from "zod";

type AddressData = z.infer<typeof addressFormSchema>;
type PartialAddressData = Partial<AddressData>;

export type AddressFormProps = {
  title: string;
  defaultValues?: PartialAddressData;
  errors?: Record<string, string[]>;
  pending?: boolean;
  prefix?: string;
};

export function AddressForm({
  title,
  defaultValues = {},
  errors = {},
  pending = false,
  prefix = "",
}: AddressFormProps) {
  const getFieldName = (name: string) => (prefix ? `${prefix}.${name}` : name);
  const [selectedCountry, setSelectedCountry] = useState<string>(
    defaultValues.country || "US",
  );

  const handleCountryChange = (value: string) => {
    setSelectedCountry(value);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor={getFieldName("firstName")}>First Name</Label>
            <Input
              id={getFieldName("firstName")}
              name={getFieldName("firstName")}
              placeholder=""
              required
              disabled={pending}
              defaultValue={defaultValues.firstName}
              aria-invalid={
                errors?.[getFieldName("firstName")] ? "true" : "false"
              }
              aria-errormessage={
                errors?.[getFieldName("firstName")]
                  ? `${getFieldName("firstName")}-error`
                  : undefined
              }
            />
            {errors?.[getFieldName("firstName")] && (
              <p
                id={`${getFieldName("firstName")}-error`}
                className="text-sm text-red-500"
                role="alert"
              >
                {errors[getFieldName("firstName")]![0]}
              </p>
            )}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor={getFieldName("lastName")}>Last Name</Label>
            <Input
              id={getFieldName("lastName")}
              name={getFieldName("lastName")}
              placeholder=""
              required
              disabled={pending}
              defaultValue={defaultValues.lastName}
              aria-invalid={
                errors?.[getFieldName("lastName")] ? "true" : "false"
              }
              aria-errormessage={
                errors?.[getFieldName("lastName")]
                  ? `${getFieldName("lastName")}-error`
                  : undefined
              }
            />
            {errors?.[getFieldName("lastName")] && (
              <p
                id={`${getFieldName("lastName")}-error`}
                className="text-sm text-red-500"
                role="alert"
              >
                {errors[getFieldName("lastName")]![0]}
              </p>
            )}
          </div>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor={getFieldName("address1")}>Address</Label>
          <Input
            id={getFieldName("address1")}
            name={getFieldName("address1")}
            placeholder=""
            required
            disabled={pending}
            defaultValue={defaultValues.address1}
            aria-invalid={errors?.[getFieldName("address1")] ? "true" : "false"}
            aria-errormessage={
              errors?.[getFieldName("address1")]
                ? `${getFieldName("address1")}-error`
                : undefined
            }
          />
          {errors?.[getFieldName("address1")] && (
            <p
              id={`${getFieldName("address1")}-error`}
              className="text-sm text-red-500"
              role="alert"
            >
              {errors[getFieldName("address1")]![0]}
            </p>
          )}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor={getFieldName("address2")}>
            Apartment, suite, etc. (optional)
          </Label>
          <Input
            id={getFieldName("address2")}
            name={getFieldName("address2")}
            placeholder=""
            disabled={pending}
            defaultValue={defaultValues.address2}
            aria-invalid={errors?.[getFieldName("address2")] ? "true" : "false"}
            aria-errormessage={
              errors?.[getFieldName("address2")]
                ? `${getFieldName("address2")}-error`
                : undefined
            }
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor={getFieldName("city")}>City</Label>
            <Input
              id={getFieldName("city")}
              name={getFieldName("city")}
              placeholder=""
              required
              disabled={pending}
              defaultValue={defaultValues.city}
              aria-invalid={errors?.[getFieldName("city")] ? "true" : "false"}
              aria-errormessage={
                errors?.[getFieldName("city")]
                  ? `${getFieldName("city")}-error`
                  : undefined
              }
            />
            {errors?.[getFieldName("city")] && (
              <p
                id={`${getFieldName("city")}-error`}
                className="text-sm text-red-500"
                role="alert"
              >
                {errors[getFieldName("city")]![0]}
              </p>
            )}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor={getFieldName("state")}>State</Label>
            <Input
              id={getFieldName("state")}
              name={getFieldName("state")}
              placeholder=""
              required
              disabled={pending}
              defaultValue={defaultValues.state}
              aria-invalid={errors?.[getFieldName("state")] ? "true" : "false"}
              aria-errormessage={
                errors?.[getFieldName("state")]
                  ? `${getFieldName("state")}-error`
                  : undefined
              }
            />
            {errors?.[getFieldName("state")] && (
              <p
                id={`${getFieldName("state")}-error`}
                className="text-sm text-red-500"
                role="alert"
              >
                {errors[getFieldName("state")]![0]}
              </p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <PostalCodeInput
            id={getFieldName("zip")}
            name={getFieldName("zip")}
            country={selectedCountry as "US" | "CA" | "UK"}
            defaultValue={defaultValues.zip}
            disabled={pending}
            required
            error={
              errors?.[getFieldName("zip")]
                ? errors[getFieldName("zip")]![0]
                : undefined
            }
          />
          <div className="space-y-1.5">
            <Label htmlFor={getFieldName("country")}>Country</Label>
            <Select
              name={getFieldName("country")}
              required
              disabled={pending}
              defaultValue={defaultValues.country || "US"}
              onValueChange={handleCountryChange}
              aria-invalid={
                errors?.[getFieldName("country")] ? "true" : "false"
              }
              aria-errormessage={
                errors?.[getFieldName("country")]
                  ? `${getFieldName("country")}-error`
                  : undefined
              }
            >
              <SelectTrigger id={getFieldName("country")}>
                <SelectValue placeholder="Select country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="US">United States</SelectItem>
                <SelectItem value="CA">Canada</SelectItem>
                <SelectItem value="UK">United Kingdom</SelectItem>
              </SelectContent>
            </Select>
            {errors?.[getFieldName("country")] && (
              <p
                id={`${getFieldName("country")}-error`}
                className="text-sm text-red-500"
                role="alert"
              >
                {errors[getFieldName("country")]![0]}
              </p>
            )}
          </div>
        </div>
        <PhoneInput
          id={getFieldName("phone")}
          name={getFieldName("phone")}
          country={selectedCountry as CountryCode}
          defaultValue={defaultValues.phone}
          disabled={pending}
          labelText="Phone (optional)"
          error={
            errors?.[getFieldName("phone")]
              ? errors[getFieldName("phone")]![0]
              : undefined
          }
        />
      </CardContent>
    </Card>
  );
}
