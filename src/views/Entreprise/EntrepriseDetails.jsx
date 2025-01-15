import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import entreprise from '../../services/entreprise';

const EntrepriseDetails = () => {
  const { id } = useParams();
  const [Entreprise, setEntreprise] = useState();

  const getEntrepriseById = async () => {
    try {
      const res = await entreprise.getEntrepriseById(id);
      setEntreprise(res.data.entreprise);
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'entreprise :', error);
    }
  };

  useEffect(() => {
    getEntrepriseById();
  }, []);

  return (
    <div className="container my-5">
      {/* Card Container */}
      <div className="card shadow-lg">
        {/* Banner Section */}
        <div className="position-relative">
          
          <div className="position-absolute top-100 start-50 translate-middle d-flex align-items-center">
            <img
              src={Entreprise?.logo ? `http://localhost:3000/file/${Entreprise?.logo}` : "../assets/images/user/1.jpg"}
              alt="Company Logo"
              className="rounded-circle border border-white shadow"
              style={{ width: '120px', height: '120px', objectFit: 'cover' }}
            />
          </div>
        </div>

        {/* Card Body */}
        <div className="card-body text-center mt-5">
          <h2 className="card-title fw-bold">{Entreprise?.name}</h2>
          <p className="text-muted mb-3">{Entreprise?.email}</p>
          <p className="card-text">{Entreprise?.description}</p>
        </div>

        {/* Details Section */}
        <div className="card-footer bg-light py-4">
          <div className="row text-center">
            <div className="col-md-6 mb-3 mb-md-0">
              <div className="d-flex justify-content-center align-items-center">
                <i className="bi bi-geo-alt-fill text-primary fs-4 me-3"></i>
                <span className="fs-5">Address :    {Entreprise?.adresse}</span>
              </div>
            </div>
            <div className="col-md-6">
              <div className="d-flex justify-content-center align-items-center">
                <i className="bi bi-building text-success fs-4 me-3"></i>
                <span className="fs-5">Secteur :    {Entreprise?.secteur}</span>
              </div>
            </div>
<div className="card-footer bg-light py-4">
  <div className="row text-center">

                <div className="col-md-6">
              <div className="d-flex justify-content-center align-items-center">
                <i className="bi bi-building text-success fs-4 me-3"></i>
                <span className="fs-5">Web site :   {Entreprise?.webSite}</span>
              </div>
            </div>
            <div className="col-md-6">
              <div className="d-flex justify-content-center align-items-center">
                <i className="bi bi-building text-success fs-4 me-3"></i>
                <span className="fs-5">Status:   {Entreprise?.status}</span>
              </div>
            </div>

            </div>

</div>
            
          
          </div>
        </div>
      </div>
    </div>
  );
};

export default EntrepriseDetails;