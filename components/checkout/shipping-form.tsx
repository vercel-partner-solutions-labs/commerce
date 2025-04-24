"use client";

import { updateShippingMethod } from "@/components/checkout/actions";
import { useCheckoutActionState } from "@/components/checkout/checkout-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ShippingMethod } from "@/lib/sfcc/types";
import { Label } from "@radix-ui/react-label";
import { use } from "react";
import { useCart } from "../cart/cart-context";
import LoadingDots from "../loading-dots";
import Price from "../price";

// The 'shipping' form is the second step of the checkout process, meant
// to capture the customer's shipping method before moving on to the
// payment step.

type ShippingFormProps = {
  shippingMethodsPromise: Promise<ShippingMethod[]>;
};

export function ShippingForm({ shippingMethodsPromise }: ShippingFormProps) {
  const { cart } = useCart();
  const shippingMethods = use(shippingMethodsPromise);
  const [state, formAction, pending] =
    useCheckoutActionState(updateShippingMethod);

  const errors = state?.errors?.fieldErrors;

  return (
    <form action={formAction} className="space-y-6 md:space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Shipping Method</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup
            defaultValue={
              cart?.shippingMethod?.id ||
              shippingMethods?.find((m) => m.isDefault)?.id ||
              shippingMethods?.[0]?.id
            }
            name="shippingMethodId"
            className="flex flex-col gap-5"
            disabled={pending}
            aria-label="Available shipping methods"
            aria-invalid={errors?.shippingMethodId ? "true" : "false"}
            aria-errormessage={
              errors?.shippingMethodId ? "shipping-method-error" : undefined
            }
          >
            {shippingMethods?.map((method) => (
              <Label key={method.id} className="cursor-pointer">
                <div className="flex justify-between">
                  <div className="flex gap-3">
                    <div className="h-6 flex items-center justify-center">
                      <RadioGroupItem
                        id={`shipping-method-${method.id}`}
                        value={method.id}
                        aria-describedby={`shipping-method-${method.id}-description`}
                      />
                    </div>
                    <div>
                      <p className="font-medium">{method.name}</p>
                      <p
                        id={`shipping-method-${method.id}-description`}
                        className="text-sm text-gray-500"
                      >
                        {method.description}
                      </p>
                    </div>
                  </div>
                  <span className="font-medium">
                    {method.price && (
                      <Price
                        amount={method.price.amount}
                        currencyCode={method.price.currencyCode}
                        currencyCodeClassName="sr-only"
                      />
                    )}
                  </span>
                </div>
              </Label>
            ))}

            {errors?.shippingMethodId && (
              <p
                id="shipping-method-error"
                className="text-sm text-red-500"
                role="alert"
              >
                {errors.shippingMethodId[0]}
              </p>
            )}
          </RadioGroup>
        </CardContent>
      </Card>

      <button
        className="block w-full rounded-full bg-blue-600 p-3 text-center text-sm font-medium text-white opacity-90 hover:opacity-100"
        type="submit"
        disabled={pending}
        aria-label={pending ? "Processing..." : "Continue to Payment"}
      >
        {pending ? <LoadingDots className="bg-white" /> : "Continue to Payment"}
      </button>
    </form>
  );
}
