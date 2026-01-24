import { Routes, Route, Outlet } from "react-router-dom";
import Navbar from './components/Navbar.jsx';
import Fatpending from './components/dashboard/Fatpending.jsx';
import Progresqc from './components/dashboard/Progresqc.jsx';
import Piechart from './components/dashboard/Piechart.jsx';
import Datatable from './components/dashboard/Datatable.jsx';
import Formrekap from './components/rekapqc/Formrekap.jsx';
// import { useEffect, useState } from "react";
import { fetchSummary } from "./utils/Services/Yohan/getDashboard.jsx";
import { useQuery } from "@tanstack/react-query";
import { fetchWorkorders } from "./utils/Services/Yohan/getWorkOrders.jsx";
import { AppSidebar } from "./components/Sidebar.jsx";
import { SidebarProvider, SidebarTrigger } from "./components/ui/sidebar.jsx";
import Fattable from "./components/dashboard/Fattable.jsx";
import { fetchFattable } from "./utils/Services/Yohan/getallFat.jsx";

function Dashboard() {
  const summaryQuery = useQuery({
    queryKey: ["summary"],
    queryFn: fetchSummary
  });

  const woQuery = useQuery({
    queryKey: ["wo"],
    queryFn: fetchWorkorders
  });

  const fatQuery = useQuery({
    queryKey: ["fat"],
    queryFn: () => fetchFattable()
  })
  return (
    <>
      {/* <Navbar /> */}
      <div className="grid grid-cols-3 w-full p-10 gap-10">
        <Fatpending data={summaryQuery.data} isLoading={summaryQuery.isLoading} />
        <Progresqc data={summaryQuery.data} isLoading={summaryQuery.isLoading} />
        <Piechart data={summaryQuery.data} isLoading={summaryQuery.isLoading} />
        <Datatable data={woQuery.data ?? []} isLoading={woQuery.isLoading} />
        <Fattable data={fatQuery.data !== undefined ? fatQuery.data : []} />
      </div>
    </>
  );
}

function RekapQC() {
  return (
    <>
      {/* <Navbar /> */}
      <Formrekap />
    </>
  )
}

function Layout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex-1 p-6 w-[80%]">
        <SidebarTrigger />
        <Outlet />
      </main>
    </SidebarProvider>
  )
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path='/' element={<Dashboard />} />
        <Route path='/qc/:woId' element={<RekapQC />} />
      </Route>
    </Routes>
  )
}
