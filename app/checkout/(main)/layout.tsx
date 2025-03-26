import { CartSummary } from "@/components/checkout/checkout-cart";
import { CheckoutProvider } from "@/components/checkout/checkout-context";
import { CheckoutCrumbs } from "@/components/checkout/checkout-crumbs";
import { CheckoutError } from "@/components/checkout/checkout-error";
import { LoadingCart } from "@/components/checkout/loading-cart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Suspense } from "react";

export default async function CheckoutLayout({ children }: React.PropsWithChildren) {
  return (
    <CheckoutProvider>
      <div className="container mx-auto p-4 md:p-8">
        <div className="mb-6 flex flex-col gap-5">
          <h1 className="text-2xl font-bold">Checkout</h1>
          <CheckoutCrumbs />
        </div>

        <div className="grid gap-8 md:grid-cols-2 items-start">
          <div className="flex flex-col gap-6">
            <CheckoutError />
            {children}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <Suspense fallback={<LoadingCart />}>
                <CartSummary />
              </Suspense>
            </CardContent>
          </Card>
        </div>
      </div>
    </CheckoutProvider>
  );
}
