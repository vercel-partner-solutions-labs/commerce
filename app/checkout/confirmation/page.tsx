import { Summary } from "@/components/checkout/checkout-cart";
import { CheckoutProvider } from "@/components/checkout/checkout-context";
import { CheckoutStatus } from "@/components/checkout/checkout-status";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getCheckoutOrder } from "@/lib/sfcc";
import { CircleCheck, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function CheckoutConfirmationPage() {
  const order = await getCheckoutOrder();

  if (!order) {
    redirect("/");
  }

  return (
    <CheckoutProvider>
      <div className="container mx-auto p-4 md:p-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Checkout</h1>
        </div>

        <div className="grid gap-8 md:grid-cols-2 items-start">
          <div className="space-y-8">
            <Card>
              <CardContent className="p-6 flex items-center gap-3">
                <CircleCheck className="text-green-600 h-12 w-12" />
                <div>
                  <h2 className="text-sm text-neutral-500">
                    Order #{order.orderNumber}
                  </h2>
                  <p className="text-xl">
                    Thank you, {order.shippingAddress?.firstName}!
                  </p>
                </div>
              </CardContent>
            </Card>

            <CheckoutStatus order={order} editable={false} />

            <Link
              href="/"
              className="flex items-center justify-center gap-2 w-full rounded-full bg-blue-600 p-3 text-center text-sm font-medium text-white opacity-90 hover:opacity-100"
              aria-label="Continue Shopping"
            >
              <ShoppingBag className="h-4 w-4" />
              Continue Shopping
            </Link>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <Summary data={order} />
            </CardContent>
          </Card>
        </div>
      </div>
    </CheckoutProvider>
  );
}
