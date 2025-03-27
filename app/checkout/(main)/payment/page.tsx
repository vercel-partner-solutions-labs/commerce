import { CheckoutStatus } from "@/components/checkout/checkout-status";
import { PaymentForm } from "@/components/checkout/payment-form";
import { getCart } from "@/lib/sfcc";
import { redirect } from "next/navigation";

export default async function PaymentPage() {
  const cart = await getCart();

  if (!cart || cart.lines.length === 0) {
    redirect("/");
  }

  // In a real implementation, we would need to fetch the available payment methods
  // for the site. For demo purposes, we are only handling credit card payments.

  return (
    <div className="space-y-6 md:space-y-8">
      <CheckoutStatus />
      <PaymentForm />
    </div>
  );
}
