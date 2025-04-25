import clsx from "clsx";

const formatPrice = (amount: string, currencyCode: string) => {
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: currencyCode,
    currencyDisplay: "narrowSymbol",
  }).format(parseFloat(amount));
};

const Price = ({
  amount,
  minAmount,
  maxAmount,
  prefix,
  className,
  currencyCode = "USD",
  currencyCodeClassName,
}: {
  amount?: string;
  minAmount?: string;
  maxAmount?: string;
  prefix?: string;
  className?: string;
  currencyCode: string;
  currencyCodeClassName?: string;
} & React.ComponentProps<"p">) => {
  let priceDisplay: string | null = null;

  if (minAmount && maxAmount && minAmount !== maxAmount) {
    priceDisplay = `${formatPrice(minAmount, currencyCode)} - ${formatPrice(maxAmount, currencyCode)}`;
  } else if (amount || minAmount || maxAmount) {
    priceDisplay = formatPrice(
      amount || minAmount || maxAmount || "9999.99",
      currencyCode,
    );
  }

  if (!priceDisplay) {
    return null;
  }

  return (
    <p suppressHydrationWarning={true} className={className}>
      {prefix ? `${prefix} ` : ""}
      {priceDisplay}
      <span
        className={clsx("ml-1 inline", currencyCodeClassName)}
      >{`${currencyCode}`}</span>
    </p>
  );
};

export default Price;
