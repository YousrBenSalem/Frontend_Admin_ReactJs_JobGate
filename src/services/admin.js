/* eslint-disable import/no-anonymous-default-export */
import axiosContext from "./axiosContext";
const createAdmin= (data) =>{
  return axiosContext.post('/admin' , data)
}
const updateAdmin= (id , data) =>{
  return axiosContext.put(`/admin/${id}` , data)
}


const getAdmins= () =>{
  return axiosContext.get(`/admin`)
}

const getAdminById= (id) =>{
  return axiosContext.get(`/admin/${id}`)
}

const deleteAdmin= (id) =>{
  return axiosContext.delete(`/admin/${id}`)
}



export default {createAdmin , updateAdmin, getAdmins, getAdminById , deleteAdmin  };