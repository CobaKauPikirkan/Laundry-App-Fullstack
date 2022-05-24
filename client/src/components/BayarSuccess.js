import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';

const BayarSuccess = () => {
    const history = useNavigate();
    const [data, setData] = useState([]);
    const [nama, setNama] = useState('');
    const [invoice, setInvoice] = useState('');
    const [harga, setHarga] = useState('');
    const [bayar, setBayar] = useState('');
    const selectedRole = localStorage.getItem('role')
    const [kembalian, setKembalian] = useState('');
    const role = () => {
        if (selectedRole == 'admin' || selectedRole == 'kasir') {
            
        } else {
            history('/norole')
        }
    }
    const {id_transaksi} = useParams();

    useEffect(() => {
        role();
        getData();
    }, []);

    const getData = async () => {
        const response = await axios.get(`http://localhost:8000/transaksi/${id_transaksi}`)
        setData(response.data);
        setNama(response.data.transaksi.member.nama);
        setInvoice(response.data.transaksi.kode_invoice);
        setHarga(response.data.total_harga);
        setBayar(response.data.total_bayar);
        setKembalian(response.data.kembalian);
    }


  return (
    <div>
        <h1 className="display-4">Pesanan atas nama {nama} berhasil di bayar</h1>
        <br />
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <h5>Kode Invoice : {invoice}</h5>
                    <div className="mb-5"></div>
                    <h5>Total Harga : {harga}</h5>
                    <br />
                    <h5>Total Bayar : {bayar}</h5>
                    <br />
                    <h5>Kembalian : {kembalian}</h5>
                    <div className="mb-5"></div>
                    <div className="col-md-12">
                        <Link to={'/transaksi'} className="btn btn-primary">Kembali ke halaman utama</Link>
                        <Link to={`/invoice/${id_transaksi}`} className="btn btn-primary">Cetak Struk</Link>
                        {/* //sementara belum ada home */}
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default BayarSuccess