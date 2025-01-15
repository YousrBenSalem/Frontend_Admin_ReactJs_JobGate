/* eslint-disable import/no-anonymous-default-export */
import axiosContext from "./axiosContext";
const createCondidat= (data) =>{
  return axiosContext.post('/condidat' , data)
}
const updateCondidat= (id , data) =>{
  return axiosContext.put(`/condidat/${id}` , data)
}
const updateStatusAccept= (id ) =>{
  return axiosContext.put(`/condidat/updateStatusPostulation/${id}`)
}
const updateStatusReject= (id ) =>{
  return axiosContext.put(`/condidat/updateStatusPostulationReject/${id}`)
}
const getCondidats= () =>{
  return axiosContext.get(`/condidat`)
}

const getCondidatById= (id) =>{
  return axiosContext.get(`/condidat/${id}`)
}

const deleteCondidat= (id) =>{
  return axiosContext.delete(`/condidat/${id}`)
}



export default {createCondidat , updateCondidat, getCondidats, getCondidatById , deleteCondidat , updateStatusAccept, updateStatusReject };