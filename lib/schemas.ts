import { z } from "zod";

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
});

// Information form schema extends the address schema with email
export const informationFormSchema = addressFormSchema.extend({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
});

// Billing form schema is identical to the address schema
export const billingFormSchema = addressFormSchema;

export const shippingMethodFormSchema = z.object({
  shippingMethodId: z.string().min(1, "Shipping method is required"),
});

export const paymentFormSchema = z.object({
  cardholderName: z.string().min(1, "Cardholder name is required"),
  cardNumber: z.string().min(1, "Card number is required"),
  expirationMonth: z.string().min(1, "Expiration month is required"),
  expirationYear: z.string().min(1, "Expiration year is required"),
  securityCode: z.string().min(1, "Security code is required"),
});
