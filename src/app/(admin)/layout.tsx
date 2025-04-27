import { Header } from "@/components/Header";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Footer } from "@/widgets/Footer";
import SideBarPrivate from "@/widgets/SideBar/SideBarPrivate";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SidebarProvider defaultOpen={false}>
        <SideBarPrivate />
        <main className="w-full overflow-x-auto h-full">
          <Header />
          <div className="m-auto mt-[70px] max-w-[1200px] p-2 md:p-4 lg:p-8 w-full overflow-auto min-h-[calc(100svh-70px)] h-full">
            {children}
          </div>
          <Footer />
        </main>
      </SidebarProvider>
    </>
  );
}
