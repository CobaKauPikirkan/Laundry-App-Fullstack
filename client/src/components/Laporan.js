import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Laporan = () => {

    const [member, setMember] = useState('')
    const [outlet, setOutlet] = useState('')
    const [transaksi, setTransaksi] = useState('')
    const [transaksis, setDataTransaksi] = useState([])
    const [total, setTotal] = useState('')
    

    const displayData = transaksis
    .map((transaksi, index) => {
        return (
            <tr key={transaksi.id_transaksi}>
                <td>{index +1}</td>
                <td>{transaksi.kode_invoice}</td>
                <td>{transaksi.nama_member}</td>
                <td>{transaksi.nama_paket}</td>
                <td>{transaksi.qty}</td>
                <td>{transaksi.status}</td>
                <td>{transaksi.dibayar}</td>
                <td>{transaksi.total_harga}</td>
            </tr>
        )
    })
    useEffect(() => {
        
        getDataTransaksi();
        
    }, [])


    const getDataTransaksi = async () => {
        const response = await axios.get('http://localhost:8000/transaksi/terbaru', {
            headers: {
                "x-access-token": localStorage.getItem("token"),
            }
        });
        setTotal(response.data[0].total)
        setDataTransaksi(response.data)
        console.log(response.data)
    }
  return (
    <>
        <div class="d-sm-flex align-items-center justify-content-center mb-4">
            <h1 class="h3 mb-0 text-gray-800">lAPORAN</h1>
        </div>
       
        <div className="table table-responsive">
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Invoice</th>
                        <th>Member</th>
                        <th>Paket</th>
                        <th>Jumlah</th>
                        <th>Status</th>
                        <th>Pembayaran</th>
                        <th>Total Harga</th>
                    </tr>
                </thead>
                <tbody>
                    {displayData}
                    <tr>
                        <th colspan="7  ">Total Pemasukan</th>
                        <td>{total}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </>
  )
}

export default Laporan