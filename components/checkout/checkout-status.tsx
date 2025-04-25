"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CheckoutStep, checkoutStepRoutes } from "@/lib/sfcc/constants";
import { Order } from "@/lib/sfcc/types";
import { CreditCard } from "lucide-react";
import Link from "next/link";
import { useCart } from "../cart/cart-context";
import {
  AmexIcon,
  DiscoverIcon,
  MasterCardIcon,
  VisaIcon,
} from "../icons/cc-icons";
import Price from "../price";
import { useCurrentCheckoutStep } from "./checkout-context";

export function CheckoutStatus({
  order,
  editable = true,
}: {
  order?: Order;
  editable?: boolean;
}) {
  const { cart } = useCart();
  const checkoutStep = useCurrentCheckoutStep();

  const data = order || cart;

  if (!data) {
    return null;
  }

  const {
    customerEmail,
    shippingAddress,
    shippingMethod,
    paymentInstruments,
    billingAddress,
  } = data;
  const payment = paymentInstruments?.[0];

  const CardIcon = {
    Visa: VisaIcon,
    MasterCard: MasterCardIcon,
    Amex: AmexIcon,
    Discover: DiscoverIcon,
  }[payment?.paymentCard?.cardType || ""];

  const isBillingSameAsShipping =
    billingAddress &&
    shippingAddress &&
    billingAddress.address1 === shippingAddress.address1 &&
    billingAddress.city === shippingAddress.city &&
    billingAddress.state === shippingAddress.state &&
    billingAddress.zip === shippingAddress.zip;

  return (
    <Card>
      {order && (
        <>
          <CardHeader>
            <CardTitle>Your order is confirmed</CardTitle>
            <CardDescription>
              You'll receive a confirmation email shortly.
            </CardDescription>
          </CardHeader>
          <Separator />
        </>
      )}
      <CardContent className="p-6 flex flex-col gap-4">
        {customerEmail && checkoutStep > CheckoutStep.Information && (
          <LineItem
            label="Contact"
            step={CheckoutStep.Information}
            editable={editable}
          >
            {customerEmail}
          </LineItem>
        )}

        {shippingAddress && checkoutStep > CheckoutStep.Information && (
          <>
            <Separator />
            <LineItem
              label="Ship to"
              step={CheckoutStep.Information}
              editable={editable}
            >
              {shippingAddress.address1}
              {shippingAddress.address2
                ? `, ${shippingAddress.address2}`
                : ""}, {shippingAddress.city} {shippingAddress.state},{" "}
              {shippingAddress.zip}, {shippingAddress.country}
            </LineItem>
          </>
        )}

        {shippingMethod && checkoutStep > CheckoutStep.Shipping && (
          <>
            <Separator />
            <LineItem
              label="Shipping Method"
              step={CheckoutStep.Shipping}
              editable={editable}
            >
              <div>
                {shippingMethod.name} -{" "}
                {shippingMethod.price && (
                  <Price
                    amount={shippingMethod.price.amount}
                    currencyCode={shippingMethod.price.currencyCode}
                    currencyCodeClassName="sr-only"
                    className="inline-block"
                  />
                )}
              </div>
              <p className="text-sm text-neutral-400">
                {shippingMethod.description}
              </p>
            </LineItem>
          </>
        )}

        {payment && checkoutStep > CheckoutStep.Payment && (
          <>
            <Separator />
            <LineItem
              label="Payment"
              step={CheckoutStep.Payment}
              editable={editable}
            >
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                  {CardIcon ? (
                    <CardIcon className="w-6 h-5" />
                  ) : (
                    <CreditCard className="w-6 h-6 opacity-50" />
                  )}
                  <span>
                    Ending in{" "}
                    <span className="font-bold">
                      {payment.paymentCard?.numberLastDigits}
                    </span>
                  </span>
                </div>
                {billingAddress && (
                  <div>
                    <p className="text-sm text-neutral-400">
                      {isBillingSameAsShipping ? (
                        "Billing address same as shipping"
                      ) : (
                        <>
                          {billingAddress.address1}
                          {billingAddress.address2
                            ? `, ${billingAddress.address2}`
                            : ""}
                          , {billingAddress.city} {billingAddress.state},{" "}
                          {billingAddress.zip}, {billingAddress.country}
                        </>
                      )}
                    </p>
                  </div>
                )}
              </div>
            </LineItem>
          </>
        )}
      </CardContent>
    </Card>
  );
}

function LineItem({
  label,
  step,
  editable = true,
  children,
}: {
  label: string;
  step: CheckoutStep;
  children: React.ReactNode;
  editable?: boolean;
}) {
  return (
    <div className="flex gap-2">
      <div className="flex flex-grow">
        <div className="w-22 flex-shrink-0">
          <p className="text-sm text-neutral-500">{label}</p>
        </div>
        <div className="text-sm">{children}</div>
      </div>
      {editable && <EditLink step={step} />}
    </div>
  );
}

function EditLink({ step }: { step: CheckoutStep }) {
  return (
    <Link
      href={checkoutStepRoutes[step]}
      className="text-sm text-blue-600 hover:text-blue-700"
    >
      Edit
    </Link>
  );
}
