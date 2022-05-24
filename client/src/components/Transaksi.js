import {useState, useEffect} from 'react'
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';

const Transaksi = () => {

    const [transaksis, setTransaksi] = useState([]);
    const [pakets, setPaket] = useState([]);
    const [detail_transaksis, setDetail] = useState([]);
    const [members, setMember] = useState([]);
    const [search, setSearch] = useState("");
    const [pageNumber, setPageNumber] = useState(0)

    const dataPerPage = 10
    const pagesVisited = pageNumber * dataPerPage
    const history = useNavigate();

    
    const displayData = detail_transaksis
    .slice(pagesVisited, pagesVisited + dataPerPage)
    .filter(detail_transaksi => {
        if(search == "") {
            return detail_transaksi
        }
        else if (detail_transaksi.transaksi.kode_invoice.toLowerCase().includes(search.toLowerCase())){
            return detail_transaksi
        }
    })
    .map((detail_transaksi, index) => {
        return (
            <tr key={detail_transaksi.id_detail_transaksi}>
                <td>{index +1}</td>
                <td>{detail_transaksi.transaksi.kode_invoice}</td>
                <td>{detail_transaksi.transaksi.member.nama}</td>
                <td>{detail_transaksi.paket.nama_paket}</td>
                <td>{detail_transaksi.qty}</td>
                <td>{detail_transaksi.transaksi.status}</td>
                <td>{detail_transaksi.transaksi.dibayar}</td>
                <td>{detail_transaksi.total_harga}</td>
                {/* if else untuk ngecek sudah dibayar apa belum */}
                { (detail_transaksi.transaksi.dibayar === "belum_dibayar") ? 
                (<td className="text-center"> 
                <Link to={`/transaksi/ubah/${detail_transaksi.id_transaksi}`} className="btn btn-primary mr-3">Ubah Status</Link>
                <Link to={`/transaksi/bayar/${detail_transaksi.id_transaksi}`} className="btn btn-primary mr-3">Konfirmasi</Link>

                <button onClick={ () => deleteTransaksi(detail_transaksi.id_transaksi) } className="btn btn-danger d-inline">Delete</button>
                </td>
                ) : ( //ini else biar ga lupa
                <td className="text-center">
                <Link to={`/transaksi/ubah/${detail_transaksi.id_transaksi}`} className="btn btn-primary mr-3">Ubah Status</Link>
                <Link to={`/invoice/${detail_transaksi.id_transaksi}`} className="btn btn-primary mr-3">Invoice</Link>

                <button onClick={ () => deleteTransaksi(detail_transaksi.id_transaksit) } className="btn btn-danger btn-sm">Delete</button>
                </td>
            ) }
            </tr>
        )
    })
    const selectedRole = localStorage.getItem('role')
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
        const response = await axios.get('http://localhost:8000/transaksi', {
            headers: {
                "x-access-token": localStorage.getItem("token"),
              },
        });
        console.log(response.data);
        setMember(response.data.member)
        setDetail(response.data)
        setPaket(response.data.paket)
        setTransaksi(response.data.id_transaksi)
    }

    const deleteTransaksi = async (id_transaksi) => {
        await axios.delete(`http://localhost:8000/transaksi/${id_transaksi}`);
        getTransaksi();
    }
    const changePage = ({ selected }) => {
        setPageNumber(selected)
    }
    const pageCount = Math.ceil( detail_transaksis.length / dataPerPage );
    // console.log(pakets)
  return (
    <div className="table table-responsive">
        <br/>
        <Link to="/transaksi/cari" className="btn btn-primary mb-10">Add</Link>
        <input 
        type="text" 
        placeholder="search invoice"
        className="form-control mb-3"
        onChange={(e) => {
            setSearch(e.target.value);
        }}
        />
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
                    <th>Aksi</th>
                </tr>
            </thead>
            <tbody>
                { displayData }
            </tbody>
        </table>
        <div className="aneh mt-5 d-flex justify-content-center">
            <ReactPaginate 
                previousLabel={"Previous"}
                nextLabel={"Next"}
                pageCount={pageCount}
                onPageChange={changePage}
                containerClassName={"paginationButton"}
                previousLinkClassName={"previousButton"}
                nextLinkClassName={"nextButton"}
                disabledLinkClassName={"paginationDisabled"}
                activeClassName={"paginationActive"}
            />
        </div>
    </div>
  )
}

export default Transaksi