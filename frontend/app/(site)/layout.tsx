import HeaderWrapper from "../_components/HeaderWrapper";
import Footer from "../_components/Footer";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-third min-h-screen flex flex-col">
      <HeaderWrapper />
      <main className="px-section flex-1">{children}</main>
      <Footer />
    </div>
  );
}
