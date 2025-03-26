"use client";

import { updateShippingContact } from "@/components/checkout/actions";
import { useCheckoutActionState } from "@/components/checkout/checkout-context";
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
import { useCart } from "../cart/cart-context";
import LoadingDots from "../loading-dots";

// The 'information' form is the first step of the checkout process, meant
// to capture the customer's email and shipping address before moving on
// to the shipping method selection.

export function InformationForm() {
  const { cart } = useCart();
  const [state, formAction, pending] = useCheckoutActionState(updateShippingContact);

  const errors = state?.errors?.fieldErrors;

  const defaultValues = {
    customerEmail: cart?.customerEmail,
    shippingAddress: cart?.shippingAddress,
  };

  return (
    <form action={formAction} className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Contact</CardTitle>
        </CardHeader>
        <CardContent className="space-y-1.5">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="jdoe@acme.com"
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

      <Card>
        <CardHeader>
          <CardTitle>Shipping Address</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                name="firstName"
                placeholder="John"
                required
                disabled={pending}
                defaultValue={defaultValues.shippingAddress?.firstName}
                aria-invalid={errors?.firstName ? "true" : "false"}
                aria-errormessage={errors?.firstName ? "firstName-error" : undefined}
              />
              {errors?.firstName && (
                <p id="firstName-error" className="text-sm text-red-500" role="alert">
                  {errors.firstName[0]}
                </p>
              )}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                name="lastName"
                placeholder="Doe"
                required
                disabled={pending}
                defaultValue={defaultValues.shippingAddress?.lastName}
                aria-invalid={errors?.lastName ? "true" : "false"}
                aria-errormessage={errors?.lastName ? "lastName-error" : undefined}
              />
              {errors?.lastName && (
                <p id="lastName-error" className="text-sm text-red-500" role="alert">
                  {errors.lastName[0]}
                </p>
              )}
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="address1">Address</Label>
            <Input
              id="address1"
              name="address1"
              placeholder="123 Main St"
              required
              disabled={pending}
              defaultValue={defaultValues.shippingAddress?.address1}
              aria-invalid={errors?.address1 ? "true" : "false"}
              aria-errormessage={errors?.address1 ? "address1-error" : undefined}
            />
            {errors?.address1 && (
              <p id="address1-error" className="text-sm text-red-500" role="alert">
                {errors.address1[0]}
              </p>
            )}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="address2">Apartment, suite, etc. (optional)</Label>
            <Input
              id="address2"
              name="address2"
              placeholder=""
              disabled={pending}
              defaultValue={defaultValues.shippingAddress?.address2}
              aria-invalid={errors?.address2 ? "true" : "false"}
              aria-errormessage={errors?.address2 ? "address2-error" : undefined}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                name="city"
                placeholder="Chicago"
                required
                disabled={pending}
                defaultValue={defaultValues.shippingAddress?.city}
                aria-invalid={errors?.city ? "true" : "false"}
                aria-errormessage={errors?.city ? "city-error" : undefined}
              />
              {errors?.city && (
                <p id="city-error" className="text-sm text-red-500" role="alert">
                  {errors.city[0]}
                </p>
              )}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="state">State</Label>
              <Input
                id="state"
                name="state"
                placeholder="Illinois"
                required
                disabled={pending}
                defaultValue={defaultValues.shippingAddress?.state}
                aria-invalid={errors?.state ? "true" : "false"}
                aria-errormessage={errors?.state ? "state-error" : undefined}
              />
              {errors?.state && (
                <p id="state-error" className="text-sm text-red-500" role="alert">
                  {errors.state[0]}
                </p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="zip">ZIP Code</Label>
              <Input
                id="zip"
                name="zip"
                placeholder="60606"
                required
                disabled={pending}
                defaultValue={defaultValues.shippingAddress?.zip}
                aria-invalid={errors?.zip ? "true" : "false"}
                aria-errormessage={errors?.zip ? "zip-error" : undefined}
              />
              {errors?.zip && (
                <p id="zip-error" className="text-sm text-red-500" role="alert">
                  {errors.zip[0]}
                </p>
              )}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="country">Country</Label>
              <Select
                name="country"
                required
                disabled={pending}
                defaultValue={defaultValues.shippingAddress?.country}
                aria-invalid={errors?.country ? "true" : "false"}
                aria-errormessage={errors?.country ? "country-error" : undefined}
              >
                <SelectTrigger id="country">
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="US">United States</SelectItem>
                  <SelectItem value="CA">Canada</SelectItem>
                  <SelectItem value="UK">United Kingdom</SelectItem>
                </SelectContent>
              </Select>
              {errors?.country && (
                <p id="country-error" className="text-sm text-red-500" role="alert">
                  {errors.country[0]}
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <button
        className="block w-full rounded-full bg-blue-600 p-3 text-center text-sm font-medium text-white opacity-90 hover:opacity-100"
        type="submit"
        disabled={pending}
        aria-busy={pending}
        aria-label={pending ? "Processing..." : "Continue to Shipping Method"}
      >
        {pending ? <LoadingDots className="bg-white" /> : "Continue to Shipping Method"}
      </button>
    </form>
  );
}
