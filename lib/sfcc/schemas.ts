import { z } from "zod";
import { prefixSchema } from "./utils";

// Base schema for address information
export const addressFormSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  address1: z.string().min(1, "Address is required"),
  address2: z.string().optional(),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zip: z.string().min(1, "Zip code is required"),
  country: z.string().min(1, "Country is required"),
  phone: z
    .string()
    .optional()
    .refine((val) => !val || val.replace(/\D/g, "").length >= 10, {
      message: "Please enter a valid phone number",
    }),
});

// Information form schema extends the address schema with email
export const informationFormSchema = addressFormSchema.extend({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
});

export const shippingMethodFormSchema = z.object({
  shippingMethodId: z.string().min(1, "Shipping method is required"),
});

export const paymentFormSchema = z.object({
  cardholderName: z
    .string()
    .min(1, "Cardholder name is required")
    .regex(
      /^[a-zA-Z\s]+$/,
      "Cardholder name should only contain letters and spaces",
    ),
  cardNumber: z.string().min(1, "Card number is required"),
  expirationMonth: z.string().min(1, "Expiration month is required"),
  expirationYear: z.string().min(1, "Expiration year is required"),
  billingSameAsShipping: z.enum(["on"]).optional(),
  securityCode: z
    .string()
    .min(1, "Security code is required")
    .regex(/^\d{3,4}$/, "Security code must be 3-4 digits")
    .refine(
      (val) => /^\d+$/.test(val),
      "Security code must contain only numbers",
    ),
});

export const billingAddressSchema = prefixSchema(
  addressFormSchema,
  "billingAddress",
);
