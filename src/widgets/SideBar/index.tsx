import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { GetBrand } from "@/api";

export default async function SideBar() {
  const brands = await GetBrand();

  return (
    <Sidebar variant="floating" collapsible="offcanvas">
      <SidebarHeader />
      <SidebarContent>
        <SidebarMenu>
          {brands.map(({ name, id }) => (
            <SidebarMenuItem key={id}>
              <SidebarMenuButton asChild>
                <a href={`/brand/${id}`}>
                  <span>{name}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
