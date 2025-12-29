import Navbar from './components/Navbar.jsx';
import Fatpending from './components/dashboard/Fatpending.jsx';
import Progresqc from './components/dashboard/Progresqc.jsx';
import Piechart from './components/dashboard/Piechart.jsx';
import Datatable from './components/dashboard/Datatable.jsx';

export default function Dashboard() {
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
  )
}
