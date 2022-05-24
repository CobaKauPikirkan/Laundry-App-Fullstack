import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const AddTransaksi = () => {
    const selectedRole = localStorage.getItem('role')
  // const [nama, setNama] = useState();
  const role = () => {
    if (selectedRole == 'admin' || selectedRole == 'kasir') {
        
    } else {
        history('/norole')
    }
}
  // const [alamat, setAlamat] = useState('');
  // const [tlp, setTlp] = useState('');
  const history = useNavigate();
  const [qty, setJumlah] = useState('');
  const [pajak, setPajak] = useState('');
  const [diskon, setDiskon] = useState('');
  const [biaya_tambahan, setBiaya] = useState('');
  const [id_paket, setIdPaket] = useState('');
  const [id_member, setIdMember] = useState('');
  const {member_id} = useParams();
  const {outlet_id} = useParams();
  const [member, setMember] = useState();
  const [id_outlet, setOutlet] = useState();
  const [nama, setNamaOutlet] = useState();
  const [keterangan, setKeterangan] = useState('');
  const [pakets, setPaket] = useState([]);

    useEffect(() => {
        role();
        getMember();
    }, []);
    useEffect(() => {
        getPaket();
    }, []);
    useEffect(() => {
        getOutlet();
    }, []);

    const getMember = async () => {
        const response = await axios.get(`http://localhost:8000/member/${member_id}`);
        console.log(response.data.member.nama)
        setMember(response.data.member.nama)
        setIdMember(response.data.member.id_member)
    }
    const getOutlet = async () => {
      const response = await axios.get('http://localhost:8000/outlet/1');
      setOutlet(response.data.outlet.id_outlet)
      setNamaOutlet(response.data.outlet.nama)
    }
    const getPaket = async () => {
      const response = await axios.get('http://localhost:8000/paket');
      setPaket(response.data.paket)
    }
    console.log(qty)
    let data = {
      id_outlet: id_outlet,
      id_member: id_member,
      biaya_tambahan: biaya_tambahan,
      diskon: diskon,
      pajak: pajak,
      id_user: 2,
      id_paket: id_paket,
      qty: qty,
      keterangan: keterangan
    }
    console.log(data);

    const saveProduct = async (e) => {
      e.preventDefault();
      await axios.post('http://localhost:8000/transaksi', {
          id_outlet: id_outlet,
          id_member: id_member,
          biaya_tambahan: biaya_tambahan,
          diskon: diskon,
          pajak: pajak,
          id_user: 1,
          id_paket: id_paket,
          qty: qty,
          keterangan: keterangan
      });
      history('/transaksi')
      // console.log(data);
  }

  return (
    <div>
        <form onSubmit={ saveProduct }>
        <div className="mb-2">
                <label>Outlet</label>
                <input 
                    type="text" 
                    name="outlet" 
                    placeholder="Outlet" 
                    className="form-control"
                    readOnly={true}
                    defaultValue={nama}
                />
            </div>
            <div className="mb-2">
                <label>Pelanggan</label>
                <input 
                    type="text" 
                    name="nama" 
                    placeholder="Nama Member" 
                    readOnly={true}
                    className="form-control"
                    defaultValue={member}
                />
            </div>
            <div className="mb-2">
                <label>Paket</label>
                <select 
                name="paket" 
                // defaultValue={1}
                value={id_paket} 
                onChange={ (e) => {
                    const selectedId = Number(e.target.value);
                    setIdPaket(selectedId);
                }}
                className="form-control"
                >
                    { pakets.map((paket) => (
                        <option value={paket.id_paket}>{paket.nama_paket}</option>
                    )) } 
                </select>
            </div>
            <div className="mb-2">
                <label>Jumlah</label>
                <input 
                    type="number" 
                    name="qty" 
                    placeholder="Quantity" 
                    className="form-control"
                    value={qty}
                    onChange={ (e) => {setJumlah(Number(e.target.value))}}
                />
            </div>
            <div className="mb-2">
                <label>Biaya Tambahan</label>
                <input 
                    type="number" 
                    name="biaya_tambahan" 
                    placeholder="Biaya Tambahan" 
                    className="form-control"
                    value={biaya_tambahan}
                    onChange={ (e) => {setBiaya(Number(e.target.value))}}
                />
            </div>
            <div className="mb-2">
                <label>Diskon (%)</label>
                <input 
                    type="number" 
                    name="diskon" 
                    placeholder="Diskon" 
                    className="form-control"
                    value={diskon}
                    onChange={ (e) => {setDiskon(Number(e.target.value))}}
                />
            </div>
            <div className="mb-2">
                <label>Pajak (%)</label>
                <input 
                    type="number" 
                    name="pajak" 
                    placeholder="Pajak" 
                    className="form-control"
                    value={pajak}
                    onChange={ (e) => {setPajak(Number(e.target.value))}}
                />
            </div>
            <div className="mb-2">
                <label>Keterangan</label>
                <input 
                    type="text" 
                    name="keterangan" 
                    placeholder="Keterangan" 
                    className="form-control"
                    value={keterangan}
                    onChange={ (e) => {setKeterangan(e.target.value)}}
                />
            </div>
            <div className="mb-2">
                <button className='btn btn-primary'>Submit</button>
            </div>
        </form>
    </div>
  )
}

export default AddTransaksi