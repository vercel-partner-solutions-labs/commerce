import { getCardType, maskCardNumber } from "@/lib/utils/cc-helpers";
import {
  helpers,
  ShopperBaskets,
  ShopperBasketsTypes,
  ShopperLogin,
  ShopperOrders,
  ShopperOrdersTypes,
  ShopperProducts,
  ShopperSearch,
} from "commerce-sdk-isomorphic";
import { defaultSort, storeCatalog, TAGS } from "lib/constants";
import { unstable_cache as cache, revalidateTag } from "next/cache";
import { cookies, headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import {
  reshapeBasket,
  reshapeCategories,
  reshapeOrder,
  reshapeProduct,
  reshapeProductItem,
  reshapeProducts,
  reshapeShippingMethods,
} from "./reshape";
import { ensureSDKResponseError } from "./type-guards";
import { CartItem, Product, SortedProductResult } from "./types";
import { validateEnvironmentVariables } from "./utils";

const apiConfig = {
  throwOnBadResponse: true,
  parameters: validateEnvironmentVariables(),
};

// ... rest of the file unchanged ...