import { Routes, Route } from "react-router-dom";

import Navbar from './components/Navbar.jsx';
import Fatpending from './components/dashboard/Fatpending.jsx';
import Progresqc from './components/dashboard/Progresqc.jsx';
import Piechart from './components/dashboard/Piechart.jsx';
import Datatable from './components/dashboard/Datatable.jsx';
import Formrekap from './components/rekapqc/Formrekap.jsx';
import { useEffect, useState } from "react";

function Dashboard() {
  const [done, setDone] = useState(0)
  const [pending, setPending] = useState(0)
  const [pendingpm, setPendingpm] = useState(0)
  const [reject, setReject] = useState(0)

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/summary")
      .then(res => res.json())
      .then(data => {
        console.log(data)
        setDone(data.approve);
        setPending(data.notyet);
        setPendingpm(data.tanpa_wo)
        setReject(data.reject)
      })
  }, [])
  return (
    <>
      <Navbar />
      <div className="p-10">
        <div className="grid grid-cols-3 gap-7">
          <Fatpending pendingpm={pendingpm} />
          <Progresqc done={done} pending={pending} />
          <Piechart done={done} pending={pending} reject={reject} />
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
