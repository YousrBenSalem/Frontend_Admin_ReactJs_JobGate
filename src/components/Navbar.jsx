import React, { useEffect, useState } from 'react'
import auth from '../services/auth'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Navbar = () => {

    const {user} = useSelector((state) => state.auth)

    const [Data , setData] = useState();


    const getAdminById =async ()=>{
      try {
          //const localstorageData=JSON.parse(localStorage.getItem('persist:token'));
          const logo=user.logo ;
    /*   const id=entreprise?.user?._id;
        const response = await Entreprise.getEntrepriseById(id); */
        setData(user);
        console.log("Entreprise recupérée avec succès LOGO :",logo);
    } catch (error) {
      console.error("Erreur lors de la récupération de l'image :", error);
    }
  }
      useEffect(() => {
    getAdminById()  
  },[])
    const logOut=async()=>{
  // dispatch(logout())
  // window.location.href = '/login'; 

   const token=localStorage.getItem('persist:token') ?JSON.parse(localStorage.getItem('persist:token')).tokens :null
   const Token = JSON.parse(token)
   const refreshToken = Token?.refreshToken ;
   console.log("refresh token",refreshToken)
    if(!token){
      console.log('not access token found to logout')
      return
    }

console.log('Refresh token:', refreshToken);
    try {

      await auth.logOut(refreshToken);
      console.log('Logout successful');
      localStorage.removeItem('persist:token'); 
      
      window.location.href = '/login'; 
      
    } catch (error) {
      console.error('Logout failed:', error);
    } 


  }
  return (
  <div>
  <header className="app-header">
    <nav className="navbar navbar-expand-lg navbar-light">
      <ul className="navbar-nav">
        <li className="nav-item d-block d-xl-none">
          <a className="nav-link sidebartoggler nav-icon-hover" id="headerCollapse" href="">
            <i className="ti ti-menu-2" />
          </a>
        </li>
      
      </ul>
      <div className="navbar-collapse justify-content-end px-0" id="navbarNav">
        <ul className="navbar-nav flex-row ms-auto align-items-center justify-content-end">
          {/* Notifications */}
          <a className="nav-link" href="" style={{ position: 'relative' ,  marginLeft:"15px"}}>
            <i className="ti ti-bell-ringing" style={{ fontSize: '24px', color: '#333' }} />
            <div 
              className="notification bg-warning rounded-circle"
              style={{
                position: 'absolute',
                top: '-5px',
                right: '-5px',
                width: '10px',
                height: '10px',
                border: '2px solid white',
                backgroundColor: '#ff9800', // Different notification color
              }}
            />
          </a>

          {/* Messages */}
          <a className="nav-link" href="" style={{ position: 'relative',  marginLeft:"15px"}}>
            <i className="ti ti-message-circle" style={{ fontSize: '24px', color: '#333' }} />
            <div 
              className="notification bg-info rounded-circle"
              style={{
                position: 'absolute',
                top: '-5px',
                right: '-5px',
                width: '10px',
                height: '10px',
                border: '2px solid white',
                backgroundColor: '#00bcd4', // Message notification color
              }}
            />
          </a>

          {/* Profile Menu */}
          <li className="nav-item dropdown">
            <a className="nav-link nav-icon-hover" href="" id="drop2" data-bs-toggle="dropdown" aria-expanded="false" style={{  marginRight:"15px"}}>
              <img 
                src={Data?.logo ? `http://localhost:3000/file/${Data?.logo}` : "../assets/images/profile/user-1.jpg"} 
                alt="User" 
                width={35} 
                height={35} 
                className="rounded-circle"
              />
            </a>
            <div className="dropdown-menu dropdown-menu-end dropdown-menu-animate-up" aria-labelledby="drop2">
              <div className="message-body">
                <Link to={'/profile'}>
                  <button className="d-flex align-items-center gap-2 dropdown-item">
                    <i className="ti ti-user fs-6" />
                    <p className="mb-0 fs-3">My Profile</p>
                  </button>
                </Link>

                <Link to={'/updatePassword'}>
                  <button className="d-flex align-items-center gap-2 dropdown-item">
                    <i className="ti ti-pencil fs-6" />
                    <p className="mb-0 fs-3">Update Password</p>
                  </button>
                </Link>
                
                <button onClick={() => logOut()} className="btn btn-outline-primary mx-3 mt-2 d-block">Logout</button>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</div>

  )
}

export default Navbar
