/* eslint-disable import/no-anonymous-default-export */
import axiosContext from "./axiosContext";
const createOffer= (data) =>{
  return axiosContext.post('/offre' , data)
}
const updateOffer= (id , data) =>{
  return axiosContext.put(`/offre/${id}` , data)
}
const getOffers= () =>{
  return axiosContext.get(`/offre`)
}

const getOfferById= (id) =>{
  return axiosContext.get(`/offre/${id}`)
}


const UpdateStatus= (id) =>{
  return axiosContext.put(`/offre/updateStatusOffre/${id}`)
}

const deleteOffer= (id) =>{
  return axiosContext.delete(`/offre/${id}`)
}



export default {createOffer , updateOffer, getOffers, getOfferById , deleteOffer, UpdateStatus };