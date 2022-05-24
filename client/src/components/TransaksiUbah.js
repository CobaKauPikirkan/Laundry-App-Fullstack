import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';

const TransaksiUbah = () => {

    const history = useNavigate();
    const [status, setStatus] = useState([]);
    const {id_transaksi} = useParams();
    const selectedRole = localStorage.getItem('role')
    const role = () => {
        if (selectedRole == 'admin' || selectedRole == 'kasir') {
            
        } else {
            history('/norole')
        }
    }
    useEffect(() => {
        role();
    })

    const updateProduct = async (e) => {
        e.preventDefault();
        await axios.put(`http://localhost:8000/transaksi/ubah_status/${id_transaksi}`, {
            status: status
        });
        history('/transaksi');
    }

  return (
    <div>
        <form onSubmit={ updateProduct }>
            <div className="mb-2">
                <label>Status</label>
                <select 
                name="status" 
                value={status} 
                onChange={ (e) => {
                    const selectedId = e.target.value;
                    setStatus(selectedId);
                }}
                className="form-control"
                >
                   <option value="baru">Baru</option>
                   <option value="proses">Proses</option>
                   <option value="selesai">Selesai</option>
                   <option value="diambil">Di ambil</option>
                </select>
            </div>
            <div className="mb-2">
                <button className='btn btn-primary'>Update</button>
            </div>
        </form>
    </div>
  )
}

export default TransaksiUbah