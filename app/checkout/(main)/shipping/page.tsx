import { CheckoutStatus } from "@/components/checkout/checkout-status";
import { LoadingShippingMethods } from "@/components/checkout/loading-shipping-methods";
import { ShippingForm } from "@/components/checkout/shipping-form";
import { getCart, getShippingMethods } from "@/lib/sfcc";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default async function ShippingPage() {
  const cart = await getCart();
  const shippingMethodsPromise = getShippingMethods();

  if (!cart || cart.lines.length === 0) {
    redirect("/");
  }

  return (
    <div className="space-y-6 md:space-y-8">
      <CheckoutStatus />
      <Suspense fallback={<LoadingShippingMethods />}>
        <ShippingForm shippingMethodsPromise={shippingMethodsPromise} />
      </Suspense>
    </div>
  );
}
