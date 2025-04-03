"use client";

import { CreditCardInput } from "@/components/cc-input";
import {
  addPaymentMethod,
  placeOrder,
  updateBillingAddress,
} from "@/components/checkout/actions";
import { useCheckoutActionState } from "@/components/checkout/checkout-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { months, years } from "@/lib/utils/cc-helpers";
import { useCart } from "../cart/cart-context";
import LoadingDots from "../loading-dots";

// The 'payment' form is the third step of the checkout process, meant
// to capture the customer's payment method before placing the order.

export function PaymentForm() {
  const { cart } = useCart();

  const [state, formAction, pending] = useCheckoutActionState(
    async (prevState, formData) => {
      const paymentState = await addPaymentMethod(undefined, formData);

      if (paymentState) {
        return paymentState;
      }

      if (formData.get("sameAsShipping") && cart?.shippingAddress) {
        const billingFormData = new FormData();

        Object.entries(cart.shippingAddress).forEach(([key, value]) => {
          billingFormData.append(key, value || "");
        });

        const billingState = await updateBillingAddress(undefined, billingFormData);

        if (billingState) {
          return billingState;
        }
      }

      return placeOrder(prevState, new FormData());
    }
  );

  const errors = state?.errors?.fieldErrors;

  return (
    <form action={formAction} className="space-y-6 md:space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Payment Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-1.5">
            <Label htmlFor="cardholderName">Cardholder Name</Label>
            <Input
              id="cardholderName"
              name="cardholderName"
              placeholder="John Doe"
              required
              pattern="[a-zA-Z\s]+"
              aria-invalid={errors?.cardholderName ? "true" : "false"}
              aria-errormessage={
                errors?.cardholderName ? "cardholderName-error" : undefined
              }
              disabled={pending}
            />
            {errors?.cardholderName && (
              <p id="cardholderName-error" className="text-sm text-red-500" role="alert">
                {errors.cardholderName}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="cardNumber">Card Number</Label>
            <CreditCardInput
              id="cardNumber"
              name="cardNumber"
              required
              aria-invalid={errors?.cardNumber ? true : false}
              disabled={pending}
              error={errors?.cardNumber?.[0]}
            />
            {errors?.cardNumber && (
              <p className="text-sm text-red-500">{errors.cardNumber[0]}</p>
            )}
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="expirationMonth">Month</Label>
              <Select name="expirationMonth" required disabled={pending}>
                <SelectTrigger
                  id="expirationMonth"
                  aria-invalid={errors?.expirationMonth ? "true" : "false"}
                >
                  <SelectValue placeholder="MM" />
                </SelectTrigger>
                <SelectContent>
                  {months.map((month) => (
                    <SelectItem key={month.value} value={month.value}>
                      {month.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors?.expirationMonth && (
                <p className="text-sm text-red-500">{errors.expirationMonth[0]}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="expirationYear">Year</Label>
              <Select name="expirationYear" required disabled={pending}>
                <SelectTrigger
                  id="expirationYear"
                  aria-invalid={errors?.expirationYear ? "true" : "false"}
                >
                  <SelectValue placeholder="YYYY" />
                </SelectTrigger>
                <SelectContent>
                  {years.map((year) => (
                    <SelectItem key={year.value} value={year.value}>
                      {year.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors?.expirationYear && (
                <p className="text-sm text-red-500">{errors.expirationYear[0]}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="securityCode">CVV</Label>
              <Input
                id="securityCode"
                name="securityCode"
                placeholder="123"
                maxLength={4}
                required
                inputMode="numeric"
                pattern="\d{3,4}"
                aria-invalid={errors?.securityCode ? "true" : "false"}
                aria-errormessage={
                  errors?.securityCode ? "securityCode-error" : undefined
                }
                disabled={pending}
              />
              {errors?.securityCode && (
                <p id="securityCode-error" className="text-sm text-red-500" role="alert">
                  {errors.securityCode[0]}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="sameAsShipping"
                name="sameAsShipping"
                disabled={pending}
                defaultChecked
              />
              <Label htmlFor="sameAsShipping">Billing address same as shipping</Label>
            </div>
            {errors?.sameAsShipping && (
              <p className="text-sm text-red-500">{errors.sameAsShipping[0]}</p>
            )}
          </div>
        </CardContent>
      </Card>

      <button
        className="block w-full rounded-full bg-blue-600 p-3 text-center text-sm font-medium text-white opacity-90 hover:opacity-100"
        type="submit"
        disabled={pending}
        aria-label={pending ? "Processing..." : "Place Order"}
      >
        {pending ? <LoadingDots className="bg-white" /> : "Place Order"}
      </button>
    </form>
  );
}
