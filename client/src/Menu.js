import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom'
import AddPaket from "./components/AddPaket";
import EditPaket from './components/EditPaket';
import OutletList from './components/Outlet';
import PaketList from "./components/Paket";
import AddOutlet from './components/AddOutlet';
import EditOutlet from './components/EditOutlet';
import MemberList from './components/Member';
import AddMember from './components/AddMember';
import EditMember from './components/EditMember';
import Transaksi from './components/Transaksi';
import TransaksiCariMember from './components/TransaksiCariMember';
import AddTransaksi from './components/AddTransaksi';
import TransaksiKonfirmasi from './components/TransaksiKonfirmasi';
import TransaksiBayar from './components/TransaksiBayar';
import BayarSuccess from './components/BayarSuccess';
import TransaksiUbah from './components/TransaksiUbah';
import './style.css';
import Invoice from './components/Invoice';
import Error from './components/Error';
import { useEffect } from 'react';


import Footer from './components/Navbar/Footer';
import AdminNavbar from './components/Navbar/AdminNavbar';
import KasirSidebar from './components/Navbar/KasirSidebar';
import Laporan from './components/Laporan';
import Logout from './components/Logout';
import AddUser from './components/AddUser';
import EditUser from './components/EditUser';
import UserList from './components/User';

import OwnerSidebar from './components/Navbar/OwnerSidebar';
import Awal from './components/Navbar/Awal';

function Menu() {
    const history = useNavigate();
    useEffect(() => {
        // console.log(localStorage.getItem('isAuth'))
        if (localStorage.getItem('isAuth') !== 'true') {
          history('/login')
        }
    });
    const selectedRole = localStorage.getItem('role')

  return (
    <div id="container">
      {/* <Sidebar /> */}
      {selectedRole === "admin" && <AdminNavbar/>} 
      {/* ini buat ngatur hak akses ntar featurnya di hidden */}
      {selectedRole === "kasir" && <KasirSidebar/>}
      {selectedRole === "owner" && <OwnerSidebar/>}
      
          
          <div className="main-wrapper">
            <Routes>
              <Route path='*' element={<Error />}></Route>
              <Route exact path='/' element={<Awal />} />
              <Route path="/logout" element={<Logout />} />
              <Route path='/member' element={<MemberList />}></Route>
              
              <Route path="/member/add" element={<AddMember />} />
              <Route path="/member/edit/:id_member" element={<EditMember />} />
              <Route path="/paket" element={<PaketList />} />
              <Route path="/paket/add" element={<AddPaket />} />
              <Route path="/paket/edit/:id_paket" element={<EditPaket />} />
              <Route path="/outlet" element={<OutletList />} />
              <Route path="/outlet/add" element={<AddOutlet />} />
              <Route path="/outlet/edit/:id_outlet" element={<EditOutlet />} />
              <Route path="/transaksi" element={<Transaksi />} />
              <Route path="/transaksi/cari" element={<TransaksiCariMember />} />
              <Route path="/transaksi/add/:member_id" element={<AddTransaksi />} />
              <Route path="/transaksi/konfirmasi" element={<TransaksiKonfirmasi />} />
              <Route path="/transaksi/bayar/:id_transaksi" element={<TransaksiBayar />} />
              <Route path="/transaksi/invoice/page/:id_transaksi" element={<BayarSuccess />} />
              <Route path="/transaksi/ubah/:id_transaksi" element={<TransaksiUbah />} />
              <Route path="/laporan" element={<Laporan />} />
              <Route path="/invoice/:id_transaksi" element={<Invoice />} />
              <Route path="/user/add" element={<AddUser />} />
              <Route path="/user/edit/:id_user" element={<EditUser />} />
              <Route path="/user" element={<UserList />} />
            </Routes>
          </div>
        
        <Footer />
    
    </div>
  );
}

export default Menu;
