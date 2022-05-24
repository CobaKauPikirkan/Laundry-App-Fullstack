import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom'
import Login from './components/Login';
import './style.css';
// import './vendor/jquery/jquery.min.js';
// import './vendor/bootstrap/js/bootstrap.bundle.min.js';
// import './vendor/jquery-easing/jquery.easing.min.js';
// import './js/sb-admin-2.min.js';
// import './vendor/chart.js/Chart.min.js';
// import './js/demo/chart-area-demo.js';
// import './css/sb-admin-2.min.css';
// import './js/sb-admin-2.min.js';
import Invoice from './components/Invoice';
import Menu from './Menu'
import { useEffect } from 'react';
import NoPermission from './components/NoPermission';
import Logout from './components/Logout';

function App() {
  return (
    <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/norole" element={<NoPermission />} />
            <Route path='*' element={<Menu />} />
          </Routes>
    </Router>
  );
}

export default App;
