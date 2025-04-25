"use client";

import Price from "components/price";
import { Product } from "lib/sfcc/types";
import { useProduct } from "./product-context";

export function ProductPrice({ product }: { product: Product }) {
  const { state } = useProduct();
  const { priceRange, currencyCode, variants } = product;

  const selectedVariant = variants.find((variant) =>
    variant.selectedOptions.every(
      (option) => option.value === state[option.name.toLowerCase()],
    ),
  );

  if (selectedVariant) {
    return (
      <Price
        amount={selectedVariant.price.amount}
        currencyCode={currencyCode}
      />
    );
  }

  return (
    <Price
      minAmount={priceRange.minVariantPrice.amount}
      maxAmount={priceRange.maxVariantPrice.amount}
      currencyCode={currencyCode}
    />
  );
}
