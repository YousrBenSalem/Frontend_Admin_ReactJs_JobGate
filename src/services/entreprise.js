/* eslint-disable import/no-anonymous-default-export */
import axiosContext from "./axiosContext";
const createEntreprise= (data) =>{
  return axiosContext.post('/entreprise' , data)
}

const getEntrepriseById= (id) =>{
  return axiosContext.get(`/entreprise/${id}`)
}

const getEntreprise= () =>{
  return axiosContext.get(`/entreprise`)
}

const updateEntreprise= (id , data) =>{
  return axiosContext.put(`/entreprise/${id}` , data)
}
const deleteEntreprise= (id) =>{
  return axiosContext.delete(`/entreprise/${id}`)
}

const UpdateStatus= (id) =>{
  return axiosContext.put(`/entreprise/updateStatus/${id}`)
}

export default {createEntreprise, getEntrepriseById,
  updateEntreprise, getEntreprise , UpdateStatus, deleteEntreprise
};