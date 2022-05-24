import React, {useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { Button } from "./Button";
import './Navbar.css';


function AdminNavbar() {
    const [click , setClick] = useState(false);
    const [button, setButton] =useState(true);

    const [tgl_awal, setTglAwal] = useState('')
    const [tgl_akhir, setTglAkhir] = useState('')

    const handleClick = () =>setClick(!click);
    const closeMobileMenu=()=>setClick(false);

    const showButton=() => {
        if(window.innerWidth <=960) {
            setButton(false);
        }else{
            setButton(true);
        }
    };
    useEffect(() => {
    showButton();
  }, []);

    window.addEventListener('resize', showButton)

  return (
  <>
    <nav className="navbar">
        <div className="navbar-container">
            <Link to='/' className='navbar-logo'>
                Laundry <i className='fab fa-typo3'/>
            </Link>
            <div className='menu-icon' onClick={handleClick}>
                <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
            </div>
            <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                <li className="nav-item">
                    <Link to='/user' className="nav-links" onClick={closeMobileMenu}>
                        user
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to='/member' className="nav-links" onClick={closeMobileMenu}>
                        member
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to='/transaksi' className="nav-links" onClick={closeMobileMenu}>
                        transaksi
                    </Link>
                </li>
                 <li className="nav-item">
                    <Link to='/Paket' className="nav-links" onClick={closeMobileMenu}>
                        Paket
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to='/Outlet' className="nav-links" onClick={closeMobileMenu}>
                        Outlet
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to='/laporan' className="nav-links" onClick={closeMobileMenu}>
                        Laporan
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-links btn btn-primary" to='/logout'>
                        <span>Log Out</span>
                    </Link>
                </li>
                
               
            </ul>
            {/* {button && <Button buttonStyle='btn--outline' to='/logout'>Logout</Button>} */}
        </div>
    </nav>
  </>
  )
  
}

export default AdminNavbar;
