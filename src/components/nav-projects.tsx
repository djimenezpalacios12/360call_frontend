import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { useView } from "@/hooks/useViews.hooks";
import { Views } from "@/interfaces/navbar.interfaces";
import ListFiles from "./listFiles";
import { Separator } from "./ui/separator";

export function NavProjects() {
  const views = useView();

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Opciones</SidebarGroupLabel>
      <SidebarMenu className="mb-3">
        {views.map((item: Views) => {
          return (
            <SidebarMenuItem key={item.view}>
              <SidebarMenuButton asChild>
                <a href={item.URL}>
                  {item.icon}
                  <span>{item.view}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>

      <Separator className="mb-3" />

      <ListFiles />
    </SidebarGroup>
  );
}
