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
      <SidebarProvider defaultOpen={false}>
        <SideBar />
        <main className="w-full overflow-x-auto h-full">
          <Header />
          <div className="m-auto max-w-[1200px] p-2 md:p-4 lg:p-8 w-full overflow-auto min-h-[calc(100svh-70px)] h-full">
            {children}
          </div>
          <Footer />
        </main>
      </SidebarProvider>
    </>
  );
}
