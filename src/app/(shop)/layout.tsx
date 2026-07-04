import ShopNavbar from "@/components/shop/navbar/shop-navbar";
import ShopFooter from "@/components/shop/layout/shop-footer";

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ShopNavbar />

      {children}

      <ShopFooter />
    </>
  );
}
