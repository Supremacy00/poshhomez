import { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import { AuthProvider } from "@/contexts/authContext/Auth-Context";
import { ModalProvider } from "@/contexts/modalContext/ModalContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ContentMenuProvider } from "@/components/profile/ProfileContentMenuContext";
import LoginModal from "@/components/Auth/login/LoginModal";
import { WishlistProvider } from "@/contexts/wishlistContext/WishlistContext";
import { LoadingProvider } from "@/contexts/loadingContext/LoadingContext";
import { Suspense } from "react";
import PageLoader from "@/components/loader/PageLoader";

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
  isAuthChecking,
}: {
  children: React.ReactNode;
  isAuthChecking: boolean;
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={inter.className}>
        <Suspense fallback={<PageLoader />}>
          <ModalProvider>
            <AuthProvider>
              <ContentMenuProvider>
                <WishlistProvider>
                  <LoadingProvider>
                    {isAuthChecking ? (
                      <PageLoader />
                    ) : (
                      <>
                        <Navbar />
                        <LoginModal />
                        {children}
                        <ToastContainer
                          className="px-5"
                          position="top-right"
                          autoClose={5000}
                          hideProgressBar={false}
                          newestOnTop={false}
                          closeOnClick
                          rtl={false}
                          pauseOnFocusLoss
                          draggable
                          pauseOnHover
                        />
                        <Footer />
                      </>
                    )}
                  </LoadingProvider>
                </WishlistProvider>
              </ContentMenuProvider>
            </AuthProvider>
          </ModalProvider>
        </Suspense>
      </body>
    </html>
  );
}
