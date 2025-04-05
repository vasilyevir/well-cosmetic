import { Header } from "@/components/Header";
import { SidebarProvider } from "@/components/ui/sidebar";
import SideBarPrivate from "@/widgets/SideBar/SideBarPrivate";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <SideBarPrivate />
      <main className="w-full dark">
        <Header />
        <div className="m-auto max-w-[1440px] p-8 w-full">{children}</div>
      </main>
    </SidebarProvider>
  );
}
