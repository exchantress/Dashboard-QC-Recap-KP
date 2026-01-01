import { Routes, Route } from "react-router-dom";

import Navbar from './components/Navbar.jsx';
import Fatpending from './components/dashboard/Fatpending.jsx';
import Progresqc from './components/dashboard/Progresqc.jsx';
import Piechart from './components/dashboard/Piechart.jsx';
import Datatable from './components/dashboard/Datatable.jsx';
import Formrekap from './components/rekapqc/Formrekap.jsx';

function Dashboard() {
  return (
    <>
      <Navbar />
      <div className="p-10">
        <div className="grid grid-cols-3 gap-7">
          <Fatpending />
          <Progresqc />
          <Piechart />
          <Datatable />
        </div>
      </div>
    </>
  );
}

function RekapQC() {
  return (
    <>
      <Navbar />
      <Formrekap />
    </>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path='/' element={<Dashboard />}></Route>
      <Route path='/qc' element={<RekapQC />}></Route>
    </Routes>
  )
}
