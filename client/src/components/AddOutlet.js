import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddOutlet = () => {

    const [nama, setNama] = useState();
    const [alamat, setAlamat] = useState('');
    const [tlp, setTlp] = useState('');
    const role = () => {
        if (localStorage.getItem('role') !== 'admin') {
            history('/norole')
        }
    }
    const history = useNavigate();
    useEffect(() => {
        role()
    })

    // console.log(jenis);
    const saveOutlet = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:8000/outlet', {
            nama: nama,
            alamat: alamat,
            tlp: tlp
        });
        history('/outlet');
    }
  return (
    <div>
        <form onSubmit={ saveOutlet }>
        <div className="mb-2">
                <label>Nama Outlet</label>
                <input 
                    type="text" 
                    name="nama" 
                    placeholder="Nama Outlet" 
                    className="form-control"
                    value={nama} 
                    onChange={ (e) => setNama(e.target.value) }
                />
            </div>
            <div className="mb-2">
                <label>Alamat</label>
                <input 
                    type="text" 
                    name="alamat" 
                    placeholder="Alamat Outlet" 
                    className="form-control"
                    value={alamat} 
                    onChange={ (e) => setAlamat(e.target.value) }
                />
            </div>
            <div className="mb-2">
                <label>Telepon</label>
                <input 
                    type="text" 
                    name="tlp" 
                    placeholder="Nomor Outlet" 
                    className="form-control"
                    value={tlp} 
                    onChange={ (e) => setTlp(e.target.value) }
                />
            </div>
            <div className="mb-2">
                <button className='btn btn-primary'>Submit</button>
            </div>
        </form>
        {/* {jenis} */}
    </div>
  )
}

export default AddOutlet