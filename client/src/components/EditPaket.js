import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditPaket = () => {

    const [id_outlet, setId] = useState();
    const [jenis, setJenis] = useState('');
    const [nama_paket, setNama] = useState('');
    const [harga, setHarga] = useState('');

    const [outlets, setOutlet] = useState([]);
    const history = useNavigate();
    const {id_paket} = useParams();
    const role = () => {
        if (localStorage.getItem('role') !== 'admin') {
            history('/norole')
        }
    }

    useEffect(() => {
        role();
        getOutlet();
    }, []);

    const getOutlet = async () => {
        const response = await axios.get('http://localhost:8000/outlet');
        setOutlet(response.data.outlet)
    }
    // console.log(jenis);
    const updateProduct = async (e) => {
        e.preventDefault();
        await axios.put(`http://localhost:8000/paket/${id_paket}`, {
            id_outlet: id_outlet,
            jenis: jenis,
            nama_paket: nama_paket,
            harga: harga
        });
        history('/paket');
    }

    useEffect(() => {
        getPaketById();
    }, []);

    const getPaketById = async () => {
        const response = await axios.get(`http://localhost:8000/paket/${id_paket}`);
        console.log(response.data);
        setId(response.data.paket.id_outlet);
        setJenis(response.data.paket.jenis);
        setNama(response.data.paket.nama_paket);
        setHarga(response.data.paket.harga);
    }
  return (
    <div>
        <form onSubmit={ updateProduct }>
            <div className="mb-2">
                <label>Outlet</label>
                <select 
                name="id_outlet" 
                value={id_outlet} 
                onChange={ (e) => {
                    const selectedId = e.target.value;
                    setId(selectedId);
                }}
                className="form-control"
                >
                    { outlets.map((outlet) => (
                        <option value={outlet.id_outlet}>{outlet.nama}</option>
                    )) }
                    {/* <option value="1">{outlet.nama}</option> */}
                </select>
            </div>
            <div className="mb-2">
                <label>Jenis</label>
                <select 
                name="jenis" 
                value={jenis} 
                onChange={ (e) => {
                    const selectedJenis = e.target.value;
                    setJenis(selectedJenis);
                }}
                className="form-control"
                >
                    <option value="kiloan">Kiloan</option>
                    <option value="selimut">Selimut</option>
                    <option value="bedcover">Bedcover</option>
                    <option value="kaos">Kaos</option>
                </select>
            </div>
            <div className="mb-2">
                <label>Nama Paket</label>
                <input 
                    type="text" 
                    name="nama_paket" 
                    placeholder="Nama Paket" 
                    className="form-control"
                    value={nama_paket} 
                    onChange={ (e) => setNama(e.target.value) }
                />
            </div>
            <div className="mb-2">
                <label>Harga</label>
                <input 
                    type="number" 
                    name="harga" 
                    placeholder="Harga" 
                    className="form-control"
                    value={harga} 
                    onChange={ (e) => setHarga(e.target.value) }
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

export default EditPaket