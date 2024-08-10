import { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import { AuthProvider } from "@/contexts/authContext/Auth-Context";
import { ModalProvider } from "@/contexts/modalContext/ModalContext";
import { Toaster } from "sonner";
import { ContentMenuProvider } from "@/components/profile/ProfileContentMenuContext";
import LoginModal from "@/components/Auth/login/LoginModal";
import { WishlistProvider } from "@/contexts/wishlistContext/WishlistContext";
import { LoadingProvider } from "@/contexts/loadingContext/LoadingContext";
import AdvanceSearch from "@/components/search/AdvanceSearch";

const inter = Inter({ subsets: ["latin"] });

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
      <body className={inter.className}>
        <ModalProvider>
          <AuthProvider>
            <ContentMenuProvider>
              <WishlistProvider>
                <LoadingProvider>
                  <Navbar />
                  <LoginModal />
                  <AdvanceSearch />
                  {children}
                  <Toaster
                    className="px-5"
                    position="top-right"
                    richColors
                    duration={3500}
                  />
                  <Footer />
                </LoadingProvider>
              </WishlistProvider>
            </ContentMenuProvider>
          </AuthProvider>
        </ModalProvider>
      </body>
    </html>
  );
}
