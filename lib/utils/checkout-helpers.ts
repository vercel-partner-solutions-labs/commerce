import { Cart } from "lib/sfcc/types";
import { CheckoutStep, checkoutStepRoutes } from "../constants";

/**
 * Get the current checkout step based on cart's data
 * @param cart - The cart object
 * @returns The current checkout step
 */
export function getCartCheckoutStep(cart: Cart | undefined): CheckoutStep {
  if (!cart) return CheckoutStep.Information;

  const hasPayment = !!cart.paymentInstruments?.length;
  const hasShippingMethod = !!cart.shippingMethod;
  const hasShippingAddress = !!cart.shippingAddress;

  if (hasShippingAddress && hasShippingMethod) {
    return CheckoutStep.Payment;
  }

  if (hasShippingAddress) {
    return CheckoutStep.Shipping;
  }

  return CheckoutStep.Information;
}

/**
 * Get the current checkout step path based on the cart's data
 * @param cart - The cart object
 * @returns The current checkout step pathname
 */
export function getPathForCartCheckoutStep(cart: Cart | undefined): string {
  const step = getCartCheckoutStep(cart);
  return checkoutStepRoutes[step];
}
