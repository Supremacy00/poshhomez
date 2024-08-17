import { Metadata, Viewport } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/authContext/Auth-Context";
import { ModalProvider } from "@/contexts/modalContext/ModalContext";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-poppins",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: "PosHHomez",
  description: "We give the best services",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.className} ${inter.className}`}>
        <ModalProvider>
          <AuthProvider>
            {children}
            <Toaster
              className="px-5"
              position="top-right"
              richColors
              duration={3500}
            />
          </AuthProvider>
        </ModalProvider>
      </body>
    </html>
  );
}
