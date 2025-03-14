"use client";

import { AlertCircle } from "lucide-react";
import { Alert, AlertTitle } from "../ui/alert";
import { useCheckout } from "./checkout-context";

export function CheckoutError() {
  const { globalError } = useCheckout();

  if (!globalError) return null;

  return (
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>{globalError}</AlertTitle>
    </Alert>
  );
}
