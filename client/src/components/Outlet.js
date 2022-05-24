import {useState, useEffect} from 'react'
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';

const OutletList = () => {

    const [outlets, setOutlet] = useState([]);
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
    
    const displayData = outlets
    .slice(pagesVisited, pagesVisited + dataPerPage)
    .filter(outlet => {
        if(search == "") {
            return outlet
        }
        else if (outlet.nama.toLowerCase().includes(search.toLowerCase())){
            return outlet
        }
    })
    .map((outlet, index) => {
        return (
            <tr key={outlet.id_outlet}>
                <td>{index +1}</td>
                <td>{outlet.nama}</td>
                <td>{outlet.alamat}</td>
                <td>{outlet.tlp}</td>
                <td>
                    <Link to={`/outlet/edit/${outlet.id_outlet}`} className="btn btn-primary">Edit</Link>
                    |
                    <button onClick={ () => deleteOutlet(outlet.id_outlet) } className="btn btn-danger btn-sm">Delete</button>
                </td>
            </tr>
        )
    })

    useEffect(() => {
        role();
        getOutlet();
    }, []);

    const getOutlet = async () => {
        const res = await axios.get('http://localhost:8000/outlet');
        setOutlet(res.data.outlet)
    }

    const deleteOutlet = async (id_outlet) => {
        await axios.delete(`http://localhost:8000/outlet/${id_outlet}`);
        getOutlet();
    }
    const changePage = ({ selected }) => {
        setPageNumber(selected)
    }
    const pageCount = Math.ceil( outlets.length / dataPerPage );
    // console.log(pakets)
  return (
    <div className="table table-responsive">
        <br/>
        <Link to="/outlet/add" className="btn btn-primary mb-10">Add</Link>
        <input 
        type="text" 
        placeholder="search outlet"
        className="form-control mb-3"
        onChange={(e) => {
            setSearch(e.target.value);
        }}
        />
        <table className="table table-bordered">
            <thead>
                <tr>
                    <th>No</th>
                    <th>Nama</th>
                    <th>Alamat</th>
                    <th>Telepon</th>
                    <th>Aksi</th>
                </tr>
            </thead>
            <tbody>
                { displayData } 
                {/* displayData untuk menampilkan data outlet */}
                
            </tbody>
        </table>
        <div className="aneh mt-5 d-flex justify-content-center ">
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

export default OutletList