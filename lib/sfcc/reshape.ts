import {
  ShopperBasketsTypes,
  ShopperOrdersTypes,
  ShopperProductsTypes,
} from "commerce-sdk-isomorphic";
import {
  Cart,
  CartItem,
  Collection,
  Image,
  Order,
  Product,
  ShippingMethod,
} from "./types";

export function reshapeShippingMethods(
  shippingMethods: ShopperBasketsTypes.ShippingMethodResult
): ShippingMethod[] {
  return (
    shippingMethods.applicableShippingMethods?.map((method) => ({
      id: method.id,
      name: method.name,
      description: method.description,
      price:
        method.price !== undefined
          ? {
              amount: method.price.toString(),
              currencyCode: method.currencyCode || "USD",
            }
          : undefined,
      isDefault: shippingMethods.defaultShippingMethodId === method.id,
    })) || []
  );
}

export function reshapeCategory(
  category: ShopperProductsTypes.Category
): Collection | undefined {
  if (!category) {
    return undefined;
  }

  return {
    handle: category.id,
    title: category.name || "",
    description: category.description || "",
    seo: {
      title: category.pageTitle || "",
      description: category.description || "",
    },
    updatedAt: "",
    path: `/search/${category.id}`,
  };
}

export function reshapeCategories(categories: ShopperProductsTypes.Category[]) {
  const reshapedCategories = [];
  for (const category of categories) {
    if (category) {
      const reshapedCategory = reshapeCategory(category);
      if (reshapedCategory) {
        reshapedCategories.push(reshapedCategory);
      }
    }
  }
  return reshapedCategories;
}

export function reshapeProduct(product: ShopperProductsTypes.Product) {
  if (!product.name) {
    throw new Error("Product name is not set");
  }

  const images = reshapeImages(product.imageGroups);

  if (!images[0]) {
    throw new Error("Product image is not set");
  }

  const flattenedPrices =
    product.variants
      ?.filter((variant) => variant.price !== undefined)
      .reduce((acc: number[], variant) => [...acc, variant.price!], [])
      .sort((a, b) => a - b) || [];

  return {
    id: product.id,
    handle: product.id,
    title: product.name,
    description: product.shortDescription || "",
    descriptionHtml: product.longDescription || "",
    categoryId: product.primaryCategoryId,
    tags: product["c_product-tags"] || [],
    featuredImage: images[0],
    // TODO: check dates for whether it is available
    availableForSale: true,
    priceRange: {
      maxVariantPrice: {
        // TODO: verify whether there is another property for this
        amount: flattenedPrices[flattenedPrices.length - 1]?.toString() || "0",
        currencyCode: product.currency || "USD",
      },
      minVariantPrice: {
        amount: flattenedPrices[0]?.toString() || "0",
        currencyCode: product.currency || "USD",
      },
    },
    images: images,
    options:
      product.variationAttributes?.map(
        (attribute: ShopperProductsTypes.VariationAttribute) => {
          return {
            id: attribute.id,
            name: attribute.name!,
            // TODO: might be a better way to do this, we are providing the name as the value
            values:
              attribute.values
                ?.filter((v) => v.value !== undefined)
                ?.map((v) => v.name!) || [],
          };
        }
      ) || [],
    seo: {
      title: product.pageTitle || "",
      description: product.pageDescription || "",
    },
    variants: reshapeVariants(product.variants || [], product),
    updatedAt: product["c_updated-date"],
  };
}

export function reshapeProducts(products: ShopperProductsTypes.Product[]) {
  const reshapedProducts = [];
  for (const product of products) {
    if (product) {
      const reshapedProduct = reshapeProduct(product);
      if (reshapedProduct) {
        reshapedProducts.push(reshapedProduct);
      }
    }
  }
  return reshapedProducts;
}

export function reshapeImages(
  imageGroups: ShopperProductsTypes.ImageGroup[] | undefined
): Image[] {
  if (!imageGroups) return [];

  const largeGroup = imageGroups.filter((g) => g.viewType === "large");

  const images = [...largeGroup].map((group) => group.images).flat();

  return images.map((image) => {
    return {
      altText: image.alt!,
      url: image.disBaseLink || image.link,
      width: image.width || 800,
      height: image.height || 800,
    };
  });
}

export function reshapeVariants(
  variants: ShopperProductsTypes.Variant[],
  product: ShopperProductsTypes.Product
) {
  return variants.map((variant) => reshapeVariant(variant, product));
}

export function reshapeVariant(
  variant: ShopperProductsTypes.Variant,
  product: ShopperProductsTypes.Product
) {
  return {
    id: variant.productId,
    title: product.name || "",
    availableForSale: variant.orderable || false,
    selectedOptions:
      Object.entries(variant.variationValues || {}).map(([key, value]) => ({
        // TODO: we use the name here instead of the key because the frontend only uses names
        name: product.variationAttributes?.find((attr) => attr.id === key)?.name || key,
        // TODO: might be a cleaner way to do this, we need to look up the name on the list of values from the variationAttributes
        value:
          product.variationAttributes
            ?.find((attr) => attr.id === key)
            ?.values?.find((v) => v.value === value)?.name || "",
      })) || [],
    price: {
      amount: variant.price?.toString() || "0",
      currencyCode: product.currency || "USD",
    },
  };
}

export function reshapeProductItem(
  item: ShopperBasketsTypes.ProductItem,
  currency: string,
  matchingProduct: Product
): CartItem {
  return {
    id: item.itemId || "",
    quantity: item.quantity || 0,
    cost: {
      totalAmount: {
        amount: item.price?.toString() || "0",
        currencyCode: currency,
      },
    },
    merchandise: {
      id: item.productId || "",
      title: item.productName || "",
      selectedOptions:
        item.optionItems?.map((o) => {
          return {
            name: o.optionId!,
            value: o.optionValueId!,
          };
        }) || [],
      product: matchingProduct,
    },
  };
}

export function reshapeBasket(
  basket: ShopperBasketsTypes.Basket,
  cartItems: CartItem[]
): Cart {
  // For demo purposes, we are assuming there's a single shipment.
  const shipment = basket.shipments?.[0];
  const shippingAddress = shipment?.shippingAddress;
  const shippingMethod = shipment?.shippingMethod;
  const billingAddress = basket.billingAddress;
  const customerEmail = basket.customerInfo?.email;

  const { orderTotal, productSubTotal = 0, merchandizeTotalTax = 0 } = basket;

  return {
    id: basket.basketId!,
    checkoutUrl: "/checkout/information",
    cost: {
      subtotalAmount: {
        amount: basket.productSubTotal?.toString() || "0",
        currencyCode: basket.currency || "USD",
      },
      totalAmount: {
        amount:
          orderTotal != null
            ? orderTotal.toString()
            : `${productSubTotal + merchandizeTotalTax}`,
        currencyCode: basket.currency || "USD",
      },
      totalTaxAmount: {
        amount: basket.merchandizeTotalTax?.toString() || "0",
        currencyCode: basket.currency || "USD",
      },
      shippingAmount: shippingMethod && {
        amount: shippingMethod?.price?.toString() || "0",
        currencyCode: basket.currency || "USD",
      },
    },
    totalQuantity: cartItems?.reduce((acc, item) => acc + (item?.quantity ?? 0), 0) ?? 0,
    lines: cartItems,
    shippingMethod: shippingMethod && {
      id: shippingMethod.id,
      name: shippingMethod.name,
      description: shippingMethod.description,
      price:
        shippingMethod.price !== undefined
          ? {
              amount: shippingMethod.price.toString(),
              currencyCode: basket.currency || "USD",
            }
          : undefined,
    },
    shippingAddress: shippingAddress && {
      firstName: shippingAddress.firstName,
      lastName: shippingAddress.lastName,
      address1: shippingAddress.address1,
      address2: shippingAddress.address2,
      city: shippingAddress.city,
      state: shippingAddress.stateCode,
      zip: shippingAddress.postalCode,
      country: shippingAddress.countryCode || "US",
      phone: shippingAddress.phone,
    },
    billingAddress: billingAddress && {
      firstName: billingAddress.firstName,
      lastName: billingAddress.lastName,
      address1: billingAddress.address1,
      address2: billingAddress.address2,
      city: billingAddress.city,
      state: billingAddress.stateCode,
      zip: billingAddress.postalCode,
      country: billingAddress.countryCode || "US",
      phone: billingAddress.phone,
    },
    customerEmail: customerEmail,
    paymentInstruments: basket.paymentInstruments,
  };
}

export function reshapeOrder(
  order: ShopperOrdersTypes.Order,
  cartItems: CartItem[]
): Order {
  const cart = reshapeBasket(order as ShopperBasketsTypes.Basket, cartItems);
  return {
    ...cart,
    id: order.orderNo || "",
    orderNumber: order.orderNo || "",
  };
}
