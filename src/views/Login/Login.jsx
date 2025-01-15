import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { loginError, loginRequest, loginSuccess } from '../../redux/userSlice';
import auth from '../../services/auth';

const Login = () => {

    const dispatch = useDispatch();
    const [Data , setData]= useState({email:'',password:''})
        const navigate=useNavigate()

    const OnchangeHandler = (e)=>{
    setData({...Data,[e.target.name]:e.target.value})
  } 

    const SignIn = async (event) => {
  event.preventDefault();
  try {
    dispatch(loginRequest());

    const response = await auth.SignIn(Data);
    console.log("Authentifiée avec succès :", response.data);

    const { user, tokens } = response.data;

    const itemType = user.item?.trim().toLowerCase();
    const UserVerify = user.verify;
      console.log("Valeur normalisée de user.item :", itemType);
      console.log("Valeur de user.verify :", UserVerify);
  



    if (itemType === "admin" && UserVerify === true ) {
      alert("Authentifiée avec succès !");
      const userData = {
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
          item: user.item,
        
        },
        tokens: {
          accessToken: tokens.accessToken,
          refreshToken: tokens.refreshToken,
        },
      };

      dispatch(loginSuccess(userData));
      navigate('/');
    }  else {
      alert("Accès refusé : Vérifiez vos informations !");
    }
  } catch (error) {
    console.error("Erreur lors de l'authentification :", error);
    dispatch(loginError(error));
    alert("Erreur lors de l'authentification.");
  }
};
  return (
    <div>
  <div className="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full" data-sidebar-position="fixed" data-header-position="fixed">
    <div className="position-relative overflow-hidden radial-gradient min-vh-100 d-flex align-items-center justify-content-center">
      <div className="d-flex align-items-center justify-content-center w-100">
        <div className="row justify-content-center w-100">
          <div className="col-md-8 col-lg-6 col-xxl-3">
            <div className="card mb-0">
              <div className="card-body">
                <a href="./index.html" className="text-nowrap logo-img text-center d-block py-3 w-100">
                  <img src="../assets/images/logos/logo-light.svg" alt />
                </a>
                <p className="text-center">Your Dashboard Admin</p>
                <form onSubmit={SignIn}>
                  <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                    <input type="email" 
                              name="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                              onChange={OnchangeHandler}
                               />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" 
                    name="password" 
                    onChange={OnchangeHandler}
                    className="form-control" id="exampleInputPassword1" />
                  </div>
                  <div className="d-flex align-items-center justify-content-between mb-4">
                  
                    <Link className="text-primary fw-bold" to="/forgotPassword">Forgot Password ?</Link>
                  </div>
                  <button type="submit" className="btn btn-primary w-100 py-8 fs-4 mb-4">Sign In</button>
                
                </form>
              </div>
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
