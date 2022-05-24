import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditOutlet = () => {

    const [nama, setNama] = useState();
    const [alamat, setAlamat] = useState('');
    const [tlp, setTlp] = useState('');

    const history = useNavigate();
    const {id_outlet} = useParams();
    const role = () => {
        if (localStorage.getItem('role') !== 'admin') {
            history('/norole')
        }
    }

    // console.log(jenis);
    const updateProduct = async (e) => {
        e.preventDefault();
        await axios.put(`http://localhost:8000/outlet/${id_outlet}`, {
            nama: nama,
            alamat: alamat,
            tlp: tlp,
        });
        history('/outlet');
    }

    useEffect(() => {
        role();
        getOutletById();
    }, []);

    const getOutletById = async () => {
        const response = await axios.get(`http://localhost:8000/outlet/${id_outlet}`);
        console.log(response.data);
        setNama(response.data.outlet.nama);
        setAlamat(response.data.outlet.alamat);
        setTlp(response.data.outlet.tlp);
    }
  return (
    <div>
        <form onSubmit={ updateProduct }>
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
                <button className='btn btn-primary'>Update</button>
            </div>
        </form>
        {/* {jenis} */}
    </div>
  )
}

export default EditOutlet