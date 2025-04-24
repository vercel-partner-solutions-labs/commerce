"use client";

import { updateShippingContact } from "@/components/checkout/actions";
import { useCheckoutActionState } from "@/components/checkout/checkout-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCart } from "../cart/cart-context";
import LoadingDots from "../loading-dots";
import { AddressForm } from "./address-form";

// The 'information' form is the first step of the checkout process, meant
// to capture the customer's email and shipping address before moving on
// to the shipping method selection.

export function InformationForm() {
  const { cart } = useCart();
  const [state, formAction, pending] = useCheckoutActionState(
    updateShippingContact,
  );

  const errors = state?.errors?.fieldErrors;

  const defaultValues = {
    customerEmail: cart?.customerEmail,
    shippingAddress: cart?.shippingAddress,
  };

  return (
    <form action={formAction} className="space-y-6 md:space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Contact</CardTitle>
        </CardHeader>
        <CardContent className="space-y-1.5">
          <Label htmlFor="email">Email</Label>
          <Input
            autoFocus={!defaultValues.customerEmail}
            id="email"
            name="email"
            type="email"
            placeholder=""
            disabled={pending}
            required
            defaultValue={defaultValues.customerEmail}
            aria-invalid={errors?.email ? "true" : "false"}
            aria-errormessage={errors?.email ? "email-error" : undefined}
          />
          {errors?.email && (
            <p id="email-error" className="text-sm text-red-500" role="alert">
              {errors.email[0]}
            </p>
          )}
        </CardContent>
      </Card>

      <AddressForm
        title="Shipping Address"
        defaultValues={defaultValues.shippingAddress}
        errors={errors}
        pending={pending}
      />

      <button
        className="block w-full rounded-full bg-blue-600 p-3 text-center text-sm font-medium text-white opacity-90 hover:opacity-100"
        type="submit"
        disabled={pending}
        aria-busy={pending}
        aria-label={pending ? "Processing..." : "Continue to Shipping Method"}
      >
        {pending ? (
          <LoadingDots className="bg-white" />
        ) : (
          "Continue to Shipping Method"
        )}
      </button>
    </form>
  );
}
