import React from 'react'
import { Link, useNavigate } from 'react-router-dom';

const NoPermission = () => {
  return (
        
<div className="page-wrap d-flex flex-row align-items-center">
    <div className="container">
        <div className="row justify-content-center">
            <div className="col-md-12 text-center">
                <span className="display-1 d-block">404</span>
                <div className="mb-4 lead">You dont have permission for this page</div>
                <Link to="/" className="btn btn-link">Kembali home</Link>
            </div>
        </div>
    </div>
</div>
  )
}

export default NoPermission