import { InformationForm } from "@/components/checkout/information-form";
import { getCart } from "@/lib/sfcc";
import { redirect } from "next/navigation";

export default async function InformationPage() {
  const cart = await getCart();

  if (!cart || cart.lines.length === 0) {
    redirect("/");
  }

  return <InformationForm />;
}
