import { useState, useEffect } from 'react'
import '../Invoice.css'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom';



const Invoice = () => {
    const [data, setData] = useState([]);
    const history =  useNavigate();
    const [tanggal, setTanggal] = useState('');
    const [berat, setBerat] = useState('');
    const [outlet, setOutlet] = useState('');
    const [diskon, setDiskon] = useState('');
    const [pajak, setPajak] = useState('');
    const [biaya, setBiaya] = useState('');
    const [kd_invoice, setKode] = useState('');
    const [harga, setHarga] = useState('');
    const [paket, setPaket] = useState('');
    const [total, setTotal] = useState('');
    const [totalbayar, setTBayar] = useState('');
    const [kembalian, setKembalian] = useState('');
    const selectedRole = localStorage.getItem('role')
    const {id_transaksi} = useParams();
    const role = () => {
        if (selectedRole == 'admin' || selectedRole == 'kasir') {
            
        } else {
            history('/norole')
        }
    }

    useEffect(() => {
        role();
        getData();
    }, [])

    const getData = async () => {
        const response = await axios.get(`http://localhost:8000/transaksi/${id_transaksi}`);
        console.log(response.data)
        setData(response.data)
        const tanggal = Date.now()
        const qty = response.data.qty
        const harga = response.data.total_harga
        const totaldiskon =  (response.data.transaksi.diskon / 100) * harga
        const diskon = "Rp. " + totaldiskon
        const totalpajak =  (response.data.transaksi.pajak / 100) * harga
        const pajak = "Rp. " + totalpajak
        const berat = response.data.qty
        const outlet = response.data.transaksi.outlet.nama

        const hargaawal =  response.data.paket.harga * qty
        const kode_invoice =  response.data.transaksi.kode_invoice
        setTanggal(tanggal)
        setBerat(berat)
        setOutlet(outlet)
        setDiskon(diskon)
        setPajak(pajak)
        setBiaya(response.data.transaksi.biaya_tambahan)
        setKode(kode_invoice)
        setHarga(hargaawal)
        setPaket(response.data.paket.nama_paket)
        setTotal(response.data.total_harga)
        setTBayar(response.data.total_bayar)
        setKembalian(response.data.kembalian)
    }
  return (
    <div class="container">
        <div class="col-md-12">
            <div class="invoice">
                <div class="invoice-company text-inverse f-w-600">
                    <span class="pull-right hidden-print">
                    
                    </span>
                    Laundry
                </div>
                <div class="invoice-header">
                    <div class="invoice-date">
                        <small>Invoice period</small>
                        <div class="date text-inverse m-t-5">{ tanggal }</div>
                        <div class="invoice-detail">
                            { kd_invoice }<br />
                        </div>
                    </div>
                </div>
                <div class="invoice-content">
                    <div class="table-responsive">
                        <table class="table table-invoice">
                            <thead>
                                <tr>
                                    <th width="20%">Paket</th>
                                    <th class="text-center" width="10%">Outlet</th>
                                    <th class="text-center" width="10%">Berat/KG</th>
                                    <th class="text-center" width="10%">Diskon</th>
                                    <th class="text-center" width="10%">Pajak</th>
                                    <th class="text-center" width="10%">Biaya Tambahan</th>
                                    <th class="text-center" width="10%">Harga</th>
                                    <th class="text-center" width="10%">Total Harga</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <span class="text-inverse">{ paket }</span>
                                    </td>
                                    <td class="text-center">{ outlet }</td>
                                    <td class="text-center">{ berat }</td>
                                    <td class="text-center">{ diskon }</td>
                                    <td class="text-center">{ pajak }</td>
                                    <td class="text-right">{ biaya }</td>
                                    <td class="text-right">{ harga }</td>
                                    <td class="text-right">{ total }</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="invoice-price">
                        <div class="invoice-price-left">
                            <div class="invoice-price-row ">
                                <div class="sub-price">
                                    <small>Total Harga</small>
                                    <span class="text-inverse">{ total }</span>
                                </div>
                                <div class="sub-price">
                                    <i class="fa fa-plus text-muted"></i>
                                </div>
                                <div class="sub-price">
                                    <small>Total Bayar</small>
                                    <span class="text-inverse">{ totalbayar }</span>
                                </div>
                                <div class="sub-price">
                                    <i class="fa fa-plus text-muted"></i>
                                </div>
                                <div class="sub-price">
                                    <small>Kembalian</small>
                                    <span class="text-inverse">{ kembalian }</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="invoice-note">
                    * Make all cheques payable to [Your Company Name]<br />
                    * Payment is due within 30 days<br />
                    * If you have any questions concerning this invoice, contact  [Name, Phone Number, Email]
                </div>
                <div class="invoice-footer">
                    <p class="text-center m-b-5 f-w-600">
                    THANK YOU FOR YOUR BUSINESS
                    </p>
                    <p class="text-center">
                    <span class="m-r-10"><i class="fa fa-fw fa-lg fa-globe"></i> matiasgallipoli.com</span>
                    <span class="m-r-10"><i class="fa fa-fw fa-lg fa-phone-volume"></i> T:016-18192302</span>
                    <span class="m-r-10"><i class="fa fa-fw fa-lg fa-envelope"></i> rtiemps@gmail.com</span>
                    </p>
                </div>
                <div className="mb-2">
                <button className='btn btn-primary' onClick={window.print}>Cetak Invoice</button>
            </div>
            </div>
        </div>
    </div>
  )
}

export default Invoice