import "./globals.css";
import Providers from "./providers";
import ProviderTheme from "./theme/providerTheme";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ProviderTheme>
          <Providers>{children}</Providers>
        </ProviderTheme>
      </body>
    </html>
  );
}
