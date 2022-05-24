import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditUser = () => {

    const [nama, setNama] = useState();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [id_outlet, setIdOutlet] = useState('');
    const [roles, setRoles] = useState('');
    const history = useNavigate()
    const {id_user} = useParams()
    const selectedRole = localStorage.getItem('role')
    const role = () => {
        if (selectedRole == 'admin' || selectedRole == 'kasir') {
            
        } else {
            history('/norole')
        }
    }

    // console.log(jenis);
    const updateUser = async (e) => {
        e.preventDefault();
        await axios.put(`http://localhost:8000/user/${id_user}`, {
            nama: nama,
            username: username,
            password: password,
            id_outlet: id_outlet,
            role: roles
        });
        history('/user');
    }

    useEffect(() => {
        role();
        getUserById();
    }, []);

    const getUserById = async () => {
        const response = await axios.get(`http://localhost:8000/user/${id_user}`);
        console.log(response.data);
        setNama(response.data.user.nama);
        setUsername(response.data.user.username);
        setPassword(response.data.user.password);
        setIdOutlet(response.data.user.id_outlet);
        setRoles(response.data.user.role);
    }
  return (
    <div>
        <form onSubmit={ updateUser }>
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
                <label>Password User</label>
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
                <label>Role User</label>
                <select 
                    type="text" 
                    name="role" 
                    placeholder="Password User" 
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
                <button className='btn btn-primary'>Update</button>
            </div>
        </form>
        {/* {jenis} */}
    </div>
  )
}

export default EditUser