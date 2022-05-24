import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'
import ReactPaginate from 'react-paginate';

const TransaksiCariMember = () => {

    const [members, setMember] = useState([]);
    const [search, setSearch] = useState("");
    const [pageNumber, setPageNumber] = useState(0)
    const history = useNavigate();

    const dataPerPage = 10
    const selectedRole = localStorage.getItem('role')
    const pagesVisited = pageNumber * dataPerPage
    const role = () => {
        if (selectedRole == 'admin' || selectedRole == 'kasir') {
            
        } else {
            history('/norole')
        }
    }
    const displayData = members
    .slice(pagesVisited, pagesVisited + dataPerPage)
    .filter(member => {
        if(search == "") {
            return member
        }
        else if (member.nama.toLowerCase().includes(search.toLowerCase())){
            return member
        }
    })
    .map((member, index) => {
        return(
            <tr key={member.id_member}>
            <td>{ index + 1 }</td>
            <td>{ member.nama }</td>
            <td>{ member.alamat }</td>
            <td>{ member.jenis_kelamin }</td>
            <td>{ member.tlp }</td>
            <td>
                <Link to={`/transaksi/add/${member.id_member}`} className="btn btn-success">Pilih</Link>
            </td>
        </tr>
        )
    })

    useEffect(() => {
        role();
        getMember();
    }, []);

    const getMember = async () => {
        const response = await axios.get('http://localhost:8000/member');
        setMember(response.data.member)
        console.log(response.data.member)
    }
    const changePage = ({ selected }) => {
        setPageNumber(selected)
    }
    const pageCount = Math.ceil( members.length / dataPerPage );

  return (
    <div className="table table-responsive">
        <br/>
        <input 
        type="text" 
        placeholder="search member"
        className="form-control mb-3"
        onChange={(e) => {
            setSearch(e.target.value);
        }}
        />
        <table id="example" className="table table-bordered">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Nama</th>
                    <th>Alamat</th>
                    <th>Jenis Kelamin</th>
                    <th>Telepon</th>
                    <th>Aksi</th>
                </tr>
            </thead>
            <tbody>
            { displayData }
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

export default TransaksiCariMember