import { CartSummary } from "@/components/checkout/checkout-cart";
import { LoadingCart } from "@/components/checkout/loading-cart";
import Price from "@/components/price";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { getCart } from "@/lib/sfcc";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Suspense } from "react";

export async function CollapsibleSummary() {
  const cart = await getCart();

  if (!cart) return null;

  return (
    <Collapsible
      className="border-t border-b sm:border sm:rounded-lg border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950/30"
      defaultOpen={false}
    >
      <CollapsibleTrigger className="group flex w-full items-center justify-between p-4 text-left">
        <div className="flex items-center gap-2">
          <ChevronDown className="h-5 w-5 group-data-[state=open]:hidden" />
          <ChevronUp className="h-5 w-5 group-data-[state=closed]:hidden" />
          <span className="font-medium">Order Summary</span>
        </div>
        <Price
          amount={cart.cost.totalAmount.amount}
          currencyCode={cart.cost.totalAmount.currencyCode}
          className="font-semibold"
          currencyCodeClassName="sr-only"
        />
      </CollapsibleTrigger>

      <CollapsibleContent className="p-4 data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
        <Suspense fallback={<LoadingCart />}>
          <CartSummary />
        </Suspense>
      </CollapsibleContent>
    </Collapsible>
  );
}
