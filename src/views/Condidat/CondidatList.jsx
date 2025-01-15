import React, { useEffect, useState } from 'react'
import { FaEye, FaTrash } from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom';
import offre from '../../services/offre';
import condidat from '../../services/condidat';


const CondidatList = () => {
    const {id}=useParams()
          const [Data , setData] = useState();
    const getOffreById = async ()=>{
        try {
          
          const response = await offre.getOfferById(id);
          setData(response.data.offre);
          console.log("offre recupéré avec succès :", response.data.offre);

        } catch (error) {
          console.error("Erreur lors de la récupération d'offre :", error);
          
        }
      }

          useEffect(() => {
          getOffreById(id)
        },[])
const Delete = async (id) => {
  try {
  
    const res = await condidat.deleteCondidat(id);

    console.log("condidat supprimé avec succés:", res.data.deletedCondidat);
getOffreById()
  } catch (error) {
    console.error("Erreur lors de la modification du statut:", error.response ? error.response.data : error);
  }
};
  return (
<div className="container my-5">
  <div
    id="grid"
    className="item-content animate__animated animate__fadeIn active"
    data-toggle-extra="tab-content"
  >
    <div className="row">
      {Data?.condidatId?.length > 0 ? (
        Data?.condidatId.map((candidat) => (
          <div className="col-lg-4 col-md-6" key={candidat?._id}>
            <div className="card card-block card-stretch card-height shadow-lg border-0">
              <div className="card-body text-center p-4">
                <div className="item mb-3">
                  <div className="odr-img">
                    <img
                      src={
                        candidat?.image
                          ? `http://localhost:3000/file/${candidat?.image}`
                          : "../assets/images/user/01.jpg"
                      }
                     className="img-fluid rounded-circle shadow"
                    style={{ width: '90px', height: '90px' }} 
                      alt="Profile"
                    />
                  </div>
                </div>

                <div className="odr-content rounded p-3 bg-light">
                  <h4 className="mb-2 text-dark fw-bold">{candidat?.name}</h4>
                  <p className="mb-3 text-muted">{candidat?.email}</p>

                  <ul className="list-inline mb-3">
                    <li className="list-inline-item" style={{ marginRight: "15px" }}>
                      <Link to={`/condidatDetails/${candidat?._id}`} className="bg-secondary-light rounded-circle d-flex align-items-center justify-content-center iq-card-icon-small shadow-sm">
                        <FaEye className="text-dark" />
                      </Link>
                    </li>
                    <li className="list-inline-item" style={{ marginLeft: "15px" }}>
                      <button   onClick={() =>  Delete(candidat?._id)}className="bg-danger-light rounded-circle d-flex align-items-center justify-content-center iq-card-icon-small shadow-sm" style={{ border: "none" }}>
                        <FaTrash className="text-danger" />
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
           <div className="no-candidat-message d-flex justify-content-center align-items-center text-center">
          <h3 className="text-muted">No condidat found</h3>
        </div>
      )}
    </div>
  </div>
</div>



  )
}

export default CondidatList
