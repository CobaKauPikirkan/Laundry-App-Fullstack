import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';

const TransaksiBayar = () => {

    const history = useNavigate();
  const [total_bayar, setBayar] = useState('');
  const [pajak, setPajak] = useState('');
  const [diskon, setDiskon] = useState('');
  const [biaya_tambahan, setBiaya] = useState('');
  const [id_paket, setIdPaket] = useState('');
  const [id_member, setIdMember] = useState('');
  const {id_transaksi} = useParams();
  const [member, setMember] = useState();
  const [kode_invoice, setInvoice] = useState();
  const [total_harga, setTotal] = useState();
  const [keterangan, setKeterangan] = useState('');
  const [pakets, setPaket] = useState([]);
  const selectedRole = localStorage.getItem('role')
//   console.log(id_transaksi)
    const role = () => {
        if (selectedRole == 'admin' || selectedRole == 'kasir') {
            
        } else {
            history('/norole')
        }
    }
    useEffect(() => {
        role();
        getTransaksi();
    }, []);
    const getTransaksi = async () => {
      const response = await axios.get(`http://localhost:8000/transaksi/${id_transaksi}`);
      console.log(response.data)
      setInvoice(response.data.transaksi.kode_invoice)
      setTotal(response.data.total_harga)
      setMember(response.data.transaksi.member.nama)
    }

    const saveProduct = async (e) => {
        e.preventDefault();
        await axios.put(`http://localhost:8000/transaksi/bayar/${id_transaksi}`, {
            total_bayar: total_bayar
        });
        history(`/transaksi/invoice/page/${id_transaksi}`)
        // console.log(data);
    }

  return (
    <div>
        <form onSubmit={ saveProduct }>
            <div className="mb-2">
                <label>Invoice</label>
                <input 
                    type="text" 
                    name="invoice" 
                    placeholder="Outlet" 
                    className="form-control"
                    readOnly={true}
                    defaultValue={kode_invoice}
                />
            </div>
            <div className="mb-2">
                <label>Pelanggan</label>
                <input 
                    type="text" 
                    name="member" 
                    placeholder="Alamat Outlet" 
                    readOnly={true}
                    className="form-control"
                    defaultValue={member}
                />
            </div>
            <div className="mb-2">
                <label>Total</label>
                <input 
                    type="number" 
                    name="total" 
                    placeholder="Quantity" 
                    className="form-control"
                    readOnly={true}
                    defaultValue={total_harga}
                />
            </div>
            <div className="mb-2">
                <label>Jumlah Pembayaran</label>
                <input 
                    type="number" 
                    name="total_bayar" 
                    placeholder="Bayar" 
                    className="form-control"
                    value={total_bayar}
                    onChange={ (e) => {setBayar(Number(e.target.value))}}
                />
            </div>
            <div className="mb-2">
                <button className='btn btn-primary'>Submit</button>
            </div>
        </form>
    </div>
  )
}

export default TransaksiBayar