import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddUser = () => {

    const [nama, setNama] = useState();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [id_outlet, setIdOutlet] = useState('');
    const [roles, setRoles] = useState('');
    const selectedRole = localStorage.getItem('role')
    const role = () => {
        if (selectedRole == 'admin' || selectedRole == 'kasir') {
            
        } else {
            history('/norole')
        }
    }

    const history = useNavigate();
    useEffect(() => {
        role();
    })

    // console.log(jenis);
    const saveUser = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:8000/user', {
            nama: nama,
            username: username,
            password: password,
            id_outlet: id_outlet,
            role: roles
        });
        history('/user');
    }
  return (
    <div>
        <form onSubmit={ saveUser }>
        <div className="mb-2">
                <label>Nama User</label>
                <input 
                    type="text" 
                    name="nama" 
                    placeholder="Nama User" 
                    className="form-control"
                    value={nama} 
                    onChange={ (e) => setNama(e.target.value) }
                />
            </div>
            <div className="mb-2">
                <label>Username</label>
                <input 
                    type="text" 
                    name="username" 
                    placeholder="Username" 
                    className="form-control"
                    value={username} 
                    onChange={ (e) => setUsername(e.target.value) }
                />
            </div>
            <div className="mb-2">
                <label>Password</label>
                <input 
                    type="text" 
                    name="password" 
                    placeholder="Password User" 
                    className="form-control"
                    value={password} 
                    onChange={ (e) => setPassword(e.target.value) }
                />
            </div>
            <div className="mb-2">
                <label>ID Outlet</label>
                <input 
                    type="text" 
                    name="id_outlet" 
                    placeholder="ID Outlet" 
                    className="form-control"
                    value={id_outlet} 
                    onChange={ (e) => setIdOutlet(e.target.value) }
                />
            </div>
            <div className="mb-2">
                <label>Role</label>
                <select 
                    type="text" 
                    name="role" 
                    placeholder="Role User" 
                    className="form-control"
                    value={roles} 
                    onChange={ (e) => setRoles(e.target.value) }
                >
                   <option selected disabled value="">Pilih</option>
                                <option value='admin'>admin</option>
                                <option value='kasir'>kasir</option>
                                <option value='owner'>owner</option> 
                </select>
            </div>
            <div className="mb-2">
                <button className='btn btn-primary'>Submit</button>
            </div>
        </form>
        {/* {jenis} */}
    </div>
  )
}

export default AddUser