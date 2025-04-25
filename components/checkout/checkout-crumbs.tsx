"use client";

import { CheckoutStep, checkoutStepRoutes } from "@/lib/sfcc/constants";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import React from "react";
import { useCheckout } from "./checkout-context";

export function CheckoutCrumbs() {
  const { currentStep } = useCheckout();

  if (currentStep === CheckoutStep.Confirmation) {
    return null;
  }

  const getLinkClasses = (step: CheckoutStep) => {
    if (currentStep === step) {
      return `font-medium`;
    }
    if (step < currentStep) {
      return `text-gray-400 hover:text-gray-300 underline underline-offset-2 cursor-pointer`;
    }
    return `text-gray-400 pointer-events-none`;
  };

  return (
    <nav className="flex items-center gap-1">
      {[
        { step: CheckoutStep.Information, label: "Information" },
        { step: CheckoutStep.Shipping, label: "Shipping Method" },
        { step: CheckoutStep.Payment, label: "Payment" },
      ].map((item, index, array) => (
        <React.Fragment key={item.step}>
          {item.step < currentStep ? (
            <Link
              href={checkoutStepRoutes[item.step]}
              className={cn("text-sm", getLinkClasses(item.step))}
            >
              {item.label}
            </Link>
          ) : (
            <span className={cn("text-sm", getLinkClasses(item.step))}>
              {item.label}
            </span>
          )}

          {index < array.length - 1 && (
            <ChevronRight className="text-gray-400 h-4 w-4" />
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}
