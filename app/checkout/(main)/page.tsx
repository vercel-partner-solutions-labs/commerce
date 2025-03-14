import { getCart } from "@/lib/sfcc";
import { getPathForCartCheckoutStep } from "@/lib/utils/checkout-helpers";
import { redirect } from "next/navigation";

export default async function CheckoutPage() {
  const cart = await getCart();

  const currentCheckoutStepPath = getPathForCartCheckoutStep(cart);

  redirect(currentCheckoutStepPath);
}
