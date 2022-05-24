    import {useState, useEffect} from 'react'
    import axios from "axios";
    import { Link, useNavigate } from 'react-router-dom';
    import ReactPaginate from 'react-paginate';

    const UserList = () => {

        const [users, setUser] = useState([]);
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
        
        const displayData = users
        .slice(pagesVisited, pagesVisited + dataPerPage)
        .filter(user => {
            if(search == "") {
                return user
            }
            else if (user.nama.toLowerCase().includes(search.toLowerCase())){
                return user
            }
        })
        .map((user, index) => {
            return (
                <tr key={user.id_user}>
                    <td>{index +1}</td>
                    <td>{user.nama}</td>
                    <td>{user.username}</td>
                    <td>{user.id_outlet}</td>
                    <td>{user.role}</td>
                    <td>
                        <Link to={`/user/edit/${user.id_user}`} className="btn btn-primary mr-2">Edit</Link>
                        
                        <button onClick={ () => deleteUser(user.id_user) } className="btn btn-danger">Delete</button>
                    </td>
                </tr>
            )
        })

        useEffect(() => {
            role();
            getUser();
        }, []);

        const getUser = async () => {
            const response = await axios.get('http://localhost:8000/user');
            setUser(response.data.user)
            console.log(response.data.user)
        }

        const deleteUser = async (id_member) => {
            await axios.delete(`http://localhost:8000/user/${id_member}`);
            getUser();
        }
        const changePage = ({ selected }) => {
            setPageNumber(selected)
        }
        const pageCount = Math.ceil( users.length / dataPerPage );
        // console.log(pakets)
    return (
        <div className="table table-responsive">
            <br />
            <Link to="/user/add" className="btn btn-primary mb-10">Add</Link>
            <input 
            type="text" 
            placeholder="search user"
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
                        <th>Username</th>
                        <th>ID Outlet</th>
                        <th>Role</th>
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

    export default UserList