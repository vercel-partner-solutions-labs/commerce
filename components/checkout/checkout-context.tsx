"use client";

import {
  CheckoutStep,
  checkoutStepRoutes,
  FormActionState,
} from "@/lib/sfcc/constants";
import { usePathname, useRouter } from "next/navigation";
import {
  createContext,
  ReactNode,
  useActionState,
  useContext,
  useMemo,
  useState,
} from "react";
import { z } from "zod";

type CheckoutContextType = {
  currentStep: CheckoutStep;
  goToNextStep: () => void;
  goToStep: (step: CheckoutStep) => void;
  globalError: string | null | undefined;
  setGlobalError: (error: string | null | undefined) => void;
};

const CheckoutContext = createContext<CheckoutContextType | undefined>(
  undefined,
);

// Checkout Provider component, for handling client checkout state.
export function CheckoutProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [globalError, setGlobalError] =
    useState<CheckoutContextType["globalError"]>();
  const currentStep = useCurrentCheckoutStep();

  const goToNextStep = () => {
    const nextStep = currentStep + 1;
    if (nextStep in CheckoutStep) {
      router.push(
        checkoutStepRoutes[nextStep as keyof typeof checkoutStepRoutes],
      );
    }
  };

  const goToStep = (step: CheckoutStep) => {
    router.push(checkoutStepRoutes[step]);
  };

  const value = useMemo(
    () => ({
      currentStep,
      goToNextStep,
      goToStep,
      globalError,
      setGlobalError,
    }),
    [currentStep, globalError],
  );

  return (
    <CheckoutContext.Provider value={value}>
      {children}
    </CheckoutContext.Provider>
  );
}

// Returns the checkout context.
export function useCheckout() {
  const context = useContext(CheckoutContext);
  if (context === undefined) {
    throw new Error("useCheckout must be used within a CheckoutProvider");
  }
  return context;
}

// Wraps `useActionState` for our checkout forms. It manages top-level errors
// from actions and redirection to the next checkout step.
export function useCheckoutActionState<T extends z.ZodTypeAny>(
  action: (
    prevState: FormActionState<T>,
    formData: FormData,
  ) => Promise<FormActionState<T>>,
) {
  const { setGlobalError, goToNextStep } = useCheckout();

  return useActionState(
    async (prevState: FormActionState, formData: FormData) => {
      const state = await action(prevState, formData);

      if (!state) {
        goToNextStep();
      } else {
        setGlobalError(state?.errors?.formErrors?.[0]);
        return state;
      }
    },
    undefined,
  );
}

// Returns the current checkout step based on the pathname.
export function useCurrentCheckoutStep() {
  const pathname = usePathname();

  const currentStep = useMemo(() => {
    // Find which step corresponds to the current pathname
    const entries = Object.entries(checkoutStepRoutes);
    for (const [stepKey, route] of entries) {
      if (pathname === route) {
        return Number(stepKey) as CheckoutStep;
      }
    }
    // Default to first step if pathname doesn't match any route
    return CheckoutStep.Information;
  }, [pathname]);

  return currentStep;
}
