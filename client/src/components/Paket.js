import {useState, useEffect} from 'react'
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';

const PaketList = () => {

    const [pakets, setPaket] = useState([]);
    const [search, setSearch] = useState("");
    const [pageNumber, setPageNumber] = useState(0)
    const history = useNavigate();
    const role = () => {
        if (localStorage.getItem('role') !== 'admin') {
            history('/norole')
        }
    }

    const dataPerPage = 10
    const pagesVisited = pageNumber * dataPerPage
    
    const displayData = pakets
    .slice(pagesVisited, pagesVisited + dataPerPage)
    .filter(paket => {
        if(search == "") {
            return paket
        }
        else if (paket.nama_paket.toLowerCase().includes(search.toLowerCase()) || paket.jenis.toLowerCase().includes(search.toLowerCase())){
            return paket
        }
    })
    .map((paket, index) => {
        return (
            <tr key={paket.id_paket}>
                <td>{index +1}</td>
                <td>{paket.id_outlet}</td>
                <td>{paket.jenis}</td>
                <td>{paket.nama_paket}</td>
                <td>{paket.harga}</td>
                <td>
                    <Link to={`/paket/edit/${paket.id_paket}`} className="btn btn-primary">Edit</Link>
                    |
                    <button onClick={ () => deletePaket(paket.id_paket) } className="btn btn-danger btn-sm">Delete</button>
                </td>
            </tr>
        )
    })

    useEffect(() => {
        role();
        getPaket();
    }, []);

    const getPaket = async () => {
        const response = await axios.get('http://localhost:8000/paket');
        setPaket(response.data.paket)
    }

    const deletePaket = async (id_paket) => {
        await axios.delete(`http://localhost:8000/paket/${id_paket}`);
        getPaket();
    }

    const changePage = ({ selected }) => {
        setPageNumber(selected)
    }
    const pageCount = Math.ceil( pakets.length / dataPerPage );
    // console.log(pakets)
  return (
    <div className="table table-responsive">
        <br />
        <Link to="/paket/add" className="btn btn-primary mb-10">Add</Link>
        
        <input 
        type="text" 
        placeholder="search paket / jenis paket"
        className="form-control mb-3"
        onChange={(e) => {
            setSearch(e.target.value);
        }}
        />
        <table className="table table-bordered">
            <thead>
                <tr>
                    <th>No</th>
                    <th>Outlet</th>
                    <th>Jenis</th>
                    <th>Nama Paket</th>
                    <th>Harga</th>
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

export default PaketList