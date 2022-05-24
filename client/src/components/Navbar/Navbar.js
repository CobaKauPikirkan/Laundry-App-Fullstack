import React from 'react'
import AdminSidebar from './AdminSidebar';
import KasirSidebar from './KasirSidebar';

function Sidebar() {
    const selectedRole = localStorage.getItem('role');
    if(selectedRole !== 'kasir' || selectedRole !== 'owner') {
        <AdminSidebar/>
    } else if(selectedRole !== 'admin' || selectedRole !== 'owner') {
        <KasirSidebar />
    } else {
        <OwnerSidebar />
    }
}

export default Sidebar