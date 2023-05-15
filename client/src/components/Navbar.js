import React from 'react'

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem('currentUser'))
  function logout(){
    localStorage.removeItem('currentUser')
    window.location.href='/login'
  }
  return (
    <div>
      <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
          <a class="navbar-brand" href="/home">Hotelify</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"><i className="fa-solid fa-bars" style={{color: "#ffffff"}}></i></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav mx-5">
              {user ? (<><div class="dropdown">
  <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
    <i className='fa fa-user'></i>{user.name}
  </button>
  <ul class="dropdown-menu">
    <li><a class="dropdown-item" href="/profile">Profile</a></li>
    <li><a class="dropdown-item" href="#" onClick={logout}>Log Out</a></li>
  </ul>
</div></>) : (<>
                <li class="nav-item">
                  <a class="nav-link active" aria-current="page" href="/register">Register</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="/login">Login</a>
                </li></>)}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
     