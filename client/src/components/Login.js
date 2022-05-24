import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';



const Login = () => {
  const [username, setUsername] = useState(''); //usestate digunakan agar kita dapat mengeluarkan value dari local function agar dapat diakses secara global
  const [password, setPassword] = useState('');
  const [loginStatus, setLoginStatus] = useState(false);

  const history = useNavigate()

  const login = async () => {
    await axios.post('http://localhost:8000/login', {
      username: username,
      password: password,
    }).then((response) => { 
      console.log(response) // memanggil data inputan username dan password
      if (!response.data.logged) { //di cek apakah username dan password sudah sesuai dengan database atau belum
        setLoginStatus(false); 
        const loginStatus = false //karena variabel loginStatus diatas tidak bisa diakses pada local function
        localStorage.setItem("isAuth", loginStatus) //memasukkan item ke localstorage dengan parameter isAuth dan loginStatus
      } else {
        localStorage.setItem("token", response.data.token) //memasukkan token jwt ke localstorage
        localStorage.setItem("role", response.data.role) //memasukkan role ke localstorage untuk dicek
        console.log(response.data)
        setLoginStatus(true)
        const loginStatus = true
        localStorage.setItem("isAuth", loginStatus)
        localStorage.setItem("username", username) //untuk menampilkan usernamenya di sidebar
        localStorage.setItem("id_outlet", response.data.id_outlet) 
        history('/')
      }
      // console.log("")
    })
  }

  function isAuthenticated() {
    return loginStatus
  }

  const userAuthenticated = async () => {
    await axios.get('http://localhost:8000/login/isUserAuth', { //cuma untuk memastikan
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    }).then((response) => {
      console.log(response)
    })
  }
  return (
      <div className="container-fluid h-custom">
          <div className="row justify-content-center">
                <div className=' w-full h-screen'>
              <div className="px-6 h-full text-gray-800">
                  <div className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6">
                      <div className="grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 md:w-9/12 mb-12 md:mb-0">
                          <img
                          src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                          className="w-full"
                          alt="Sample image"
                          />
                      </div>
                      <div className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
                      <h1 className='text-center mb-5 text-[30px] font-semibold'>Login</h1>
                      
                          <input type="text" onChange={(e) => setUsername(e.target.value)} value={username} className='form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                          placeholder='username' />
                          <p></p>
                          <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} className='form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                          placeholder='password' />
                          <div className="flex justify-between items-center mb-6"></div>
                          <p></p>
                          <div className="text-center lg:text-left">
                              <button type='submit'onClick={login} className='btn btn-primary btn-user btn-block'
                              >Login</button>
                          </div>
                      
                      </div>
                  </div>
              </div>
          </div>
          </div>
        </div>
  )
}

export default Login