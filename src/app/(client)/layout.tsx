import { Header } from "@/components/Header";
import { SidebarProvider } from "@/components/ui/sidebar";
import SideBar from "@/widgets/SideBar";
import { Footer } from "@/widgets/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SidebarProvider>
        <SideBar />
        <main className="w-full overflow-auto">
          <Header />
          <div className="m-auto max-w-[1440px] p-8 w-full overflow-auto min-h-[calc(100svh-70px)]">
            {children}
          </div>
          <Footer />
        </main>
      </SidebarProvider>
    </>
  );
}
