import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';

const TransaksiKonfirmasi = () => {

    const [utangs, setUtang] = useState([]);
    const [search, setSearch] = useState("");
    const [field, setFieldId] = useState("");
    const history = useNavigate();
    const [pageNumber, setPageNumber] = useState(0)

    const dataPerPage = 10
    const pagesVisited = pageNumber * dataPerPage
    const selectedRole = localStorage.getItem('role')
    const displayData = utangs
    .slice(pagesVisited, pagesVisited + dataPerPage)
    .filter(belum => {
        if(search == "") {
            return belum
        }
        else if (belum.transaksi.kode_invoice.toLowerCase().includes(search.toLowerCase())){
            return belum
        }
    })
    .map((belum, index) => {
        <tr key={belum.id_detail_transaksi}>
            <td>{ index + 1 }</td>
            <td>{ belum.transaksi.kode_invoice }</td>
            <td>{ belum.transaksi.member.nama }</td>
            <td>{ belum.transaksi.status }</td>
            <td>{ belum.total_harga }</td>
            <td className="text-center">
                <Link to={`/transaksi/bayar/${belum.id_transaksi}`} className="btn btn-warning text-center">Bayar</Link>
            </td>
        </tr>
    })
    const role = () => {
        if (selectedRole == 'admin' || selectedRole == 'kasir') {
            
        } else {
            history('/norole')
        }
    }

    console.log(utangs)

    useEffect(() => {
        role();
        getUtang();
    }, []);

    const getUtang = async () => {
        const response = await axios.get('http://localhost:8000/transaksi/belum/konfirmasi');
        // console.log(response.data);
        setUtang(response.data)
        // setFieldId(response.data.transaksi.kode_invoice)
        console.log(response.data.id_transaksi)
    }
    const changePage = ({ selected }) => {
        setPageNumber(selected)
    }
    const pageCount = Math.ceil( utangs.length / dataPerPage );
    

  return (
    <div className="table table-responsive">
        <input 
        type="text" 
        placeholder="search invoice"
        className="form-control mb-3"
        onChange={(e) => {
            setSearch(e.target.value);
        }}
        />
        <table className="table table-bordered text-center">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Invoice</th>
                    <th>Member</th>
                    <th>Status</th>
                    <th>Total Harga</th>
                    <th>Aksi</th>
                </tr>
            </thead>
            <tbody>
                { displayData }
                <tr>
                    {field}
                </tr>
            </tbody>
        </table>
        <div className="aneh mt-5 d-flex">
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

export default TransaksiKonfirmasi