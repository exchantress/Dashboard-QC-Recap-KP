import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
} from "@/components/ui/sidebar"
import { RiDashboardHorizontalLine } from "react-icons/ri"

export function AppSidebar() {
    return (
        <Sidebar>
            <SidebarHeader className="flex justify-center px-10 py-4 flex-row">
                <RiDashboardHorizontalLine className="w-16 h-14 text-black" />
                <h1 className="text-xl">Dashboard QC</h1>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup />
                <SidebarGroup />
            </SidebarContent>
            <SidebarFooter />
        </Sidebar>
    )
}