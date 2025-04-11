import { z } from "zod";

// Type for the state returned from our form actions. Provides
// additional type safety for error fields.
export type FormActionState<T extends z.ZodTypeAny = z.ZodTypeAny> =
  | {
      errors: {
        formErrors?: string[];
        fieldErrors?: z.inferFlattenedErrors<T>["fieldErrors"];
      };
    }
  | undefined;

export enum CheckoutStep {
  Information = 1,
  Shipping,
  Payment,
  Confirmation,
}

export const checkoutStepRoutes: Record<CheckoutStep, string> = {
  [CheckoutStep.Information]: "/checkout/information",
  [CheckoutStep.Shipping]: "/checkout/shipping",
  [CheckoutStep.Payment]: "/checkout/payment",
  [CheckoutStep.Confirmation]: "/checkout/confirmation",
};

export type CountryCode = "US" | "CA" | "UK";

export type PostalCodeConfig = {
  label: string;
  placeholder: string;
  format: (value: string) => string;
};
