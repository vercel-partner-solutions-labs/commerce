import {
  ShopperBasketsTypes,
  ShopperProductsTypes,
} from "commerce-sdk-isomorphic";

export type Connection<T> = {
  edges: Array<Edge<T>>;
};

export type Edge<T> = {
  node: T;
};

export type Collection = {
  handle: string;
  title: string;
  description: string;
  seo: SEO;
  updatedAt: string;
  path: string;
};

export type SalesforceProduct = {
  id: string;
  title: string;
  handle: string;
  categoryId?: string;
  description: string;
  descriptionHtml: string;
  featuredImage: Image;
  currencyCode: string;
  priceRange: {
    maxVariantPrice: Money;
    minVariantPrice: Money;
  };
  seo: SEO;
  options: ProductOption[];
  tags: string[];
  variants: ProductVariant[];
  images: Image[];
  availableForSale: boolean;
  updatedAt: string;
  variationValues?: Record<string, string>;
};

export type Product = Omit<SalesforceProduct, "variants" | "images"> & {
  variants: ProductVariant[];
  images: Image[];
};

export type ProductVariant = {
  id: string;
  title: string;
  availableForSale: boolean;
  selectedOptions: {
    name: string;
    value: string;
  }[];
  price: Money;
};

export type ProductOption = {
  id: string;
  name: string;
  values: {
    id: string;
    name: string;
  }[];
};

export type Money = {
  amount: string;
  currencyCode: string;
};

export type Image = {
  url: string;
  altText: string;
  height: number;
  width: number;
};

export type SEO = {
  title: string;
  description: string;
};

export type ShippingMethod = {
  id: string;
  name?: string;
  description?: string;
  price?: Money;
  isDefault?: boolean;
};

export type SalesforceCart = {
  id: string | undefined;
  checkoutUrl: string;
  customerEmail?: string;
  cost: {
    subtotalAmount: Money;
    totalAmount: Money;
    totalTaxAmount: Money;
    shippingAmount?: Money;
  };
  lines: Connection<CartItem>;
  totalQuantity: number;
  shippingAddress?: Address;
  billingAddress?: Address;
  shippingMethod?: ShippingMethod;
  paymentInstruments?: ShopperBasketsTypes.OrderPaymentInstrument[];
};

export type Address = {
  firstName?: string;
  lastName?: string;
  address1?: string;
  address2?: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
  phone?: string;
};

export type Cart = Omit<SalesforceCart, "lines"> & {
  lines: CartItem[];
};

export type Order = Cart & {
  orderNumber: string;
};

export type CartItem = {
  id: string | undefined;
  quantity: number;
  cost: {
    totalAmount: Money;
  };
  merchandise: {
    id: string;
    title: string;
    selectedOptions: {
      name: string;
      value: string;
    }[];
    product: CartProduct;
  };
};

export type CartProduct = {
  id: string;
  handle: string;
  title: string;
  description?: string;
  featuredImage: Image;
};

export type ProductRecommendations = {
  id: string;
  name: string;
  recommendations: RecommendedProduct[];
};

export type RecommendedProduct = {
  recommended_item_id: string;
  recommendation_type: {
    _type: string;
    display_value: string;
    value: number;
  };
};

export type Menu = {
  title: string;
  path: string;
};

export type Page = {
  id: string;
  title: string;
  handle: string;
  body: string;
  bodySummary: string;
  seo?: SEO;
  createdAt: string;
  updatedAt: string;
};

export type SortedProductResult = {
  productResult: ShopperProductsTypes.Product;
  index: number;
};
