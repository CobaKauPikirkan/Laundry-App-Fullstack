import {useState, useEffect} from 'react'
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';

const MemberList = () => {

    const [members, setMember] = useState([]);
    const [search, setSearch] = useState("");
    const [pageNumber, setPageNumber] = useState(0)
    const history = useNavigate();

    const dataPerPage = 10
    const pagesVisited = pageNumber * dataPerPage
    const selectedRole = localStorage.getItem('role')
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
        return (
            <tr key={member.id_member}>
                <td>{index +1}</td>
                <td>{member.nama}</td>
                <td>{member.alamat}</td>
                <td>{member.jenis_kelamin}</td>
                <td>{member.tlp}</td>
                <td>
                    <Link to={`/member/edit/${member.id_member}`} className="btn btn-primary mr-2">Edit</Link>
                    
                    <button onClick={ () => deleteMember(member.id_member) } className="btn btn-danger">Delete</button>
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

    const deleteMember = async (id_member) => {
        await axios.delete(`http://localhost:8000/member/${id_member}`);
        getMember();
    }
    const changePage = ({ selected }) => {
        setPageNumber(selected)
    }
    const pageCount = Math.ceil( members.length / dataPerPage );
    // console.log(pakets)
  return (
    <div className="table table-responsive">
        <br/>
        <Link to="/member/add" className="btn btn-primary mb-10">Add</Link>
        <input 
        type="text" 
        placeholder="search member"
        className="form-control mb-3"
        onChange={(e) => {
            setSearch(e.target.value);
        }}
        />
        <table className="table table-bordered text-center">
            <thead>
                <tr>
                    <th>No</th>
                    <th>Nama</th>
                    <th>Alamat</th>
                    <th>Jenis Kelamin</th>
                    <th>Nomor Telpon</th>
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

export default MemberList