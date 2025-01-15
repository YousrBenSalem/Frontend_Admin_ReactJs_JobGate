import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import offre from '../../services/offre';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase, faMapMarkerAlt, faCalendarAlt, faUser, faDollarSign } from '@fortawesome/free-solid-svg-icons';

const OfferDetails = () => {
    const {id} = useParams()
    const navigate = useNavigate()
    const [selectedOffer, setSelectedOffer] = useState({
      applicationDeadline:'',
      category:'',
      datePublication:'',
      description:'',
      education:'',
      experience:'',
      gender:'',
      localisation:'',
      otherBenifits:'',
      responsibilities:'',
      salary:'',
      titre:'',
      type:'',
      typeContrat:'',
    });
  const [Data , setData] = useState();
  const getOfferById =async ()=>{
        try {
          const response = await offre.getOfferById(id);
          setData(response.data.offre);
          console.log("offer recupérée avec succès :", response.data.offre);
      } catch (error) {
        console.error("Erreur lors de la récupération d'offer :", error);
      }
    }
  useEffect(() => {
    getOfferById();
    
  }, [id]);


      const handleDelete = async(id) =>{
        try {
            const response = await offre.deleteOffer(id);
            console.log("offer supprimé avec succès :", response.data.deletedOffer);
            navigate("/acceptableOffers")
          } catch (error) {
            console.error("Erreur lors de la supprission d'offre :", error);
          }
      }
    const handleCloseModal = () => {
    const modal = document.getElementById("update-offer-modal");
    modal.classList.remove("show");
    modal.style.display = "none";
        modal.style.backgroundColor = "none";

  };


    const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await offre.updateOffer(selectedOffer._id , selectedOffer);
          console.log("offre modifée avec succès :", response.data.updatedOffer);
    alert("Entreprise modifée avec succès !");
              handleCloseModal();
      window.location.reload();


        getOfferById();

      
    } catch (error) {
        console.error("Erreur lors de la modification de l'offre :", error);
    alert("Erreur lors de la modification de l'offre.");
  };
}

  return (
 <div>
      <div className="content-page">
        <div className="container-fluid timeline-page">
          <div className="row">
            <div className="col-lg-12">
              <div className="card card-block card-stretch card-height shadow-sm">
                <div className="card-header d-flex justify-content-between align-items-center">
                  <div className="header-title">
                    <h4 className="card-title text-primary">
                      {Data?.titre}'s Offer Details
                    </h4>
                  </div>
                </div>
                <div className="card-body">
                  <div className="timeline-container">
                    <ul className="list-group list-group-flush">
                      {[
                        { label: 'Description', value: Data?.description, icon: faBriefcase },
                        { label: 'Type contrat', value: Data?.typeContrat, icon: faBriefcase },
                        { label: 'Localisation', value: Data?.localisation, icon: faMapMarkerAlt },
                        { label: 'Publication date', value: Data?.datePublication, icon: faCalendarAlt },
                        { label: ' Application Deadline', value: Data?.applicationDeadline, icon: faCalendarAlt },
                        { label: 'Type', value: Data?.type, icon: faBriefcase },
                        { label: 'Responsibilities', value: Data?.responsibilities, icon: faBriefcase },
                        { label: 'Education', value: Data?.education, icon: faUser },
                        { label: 'Experience', value: Data?.experience, icon: faUser },
                        { label: 'Other Benefits', value: Data?.otherBenifits, icon: faBriefcase },
                        { label: 'Salary', value: Data?.salary, icon: faDollarSign },
                        { label: 'Gender', value: Data?.gender, icon: faUser },
                        { label: 'Category', value: Data?.category, icon: faBriefcase },
                      ].map((item, index) => (
                        <li
                          key={index}
                          className="list-group-item d-flex align-items-center"
                        >
                          <div className="icon text-primary me-3">
                            <FontAwesomeIcon icon={item.icon} size="lg" />
                          </div>
                          <div className="content">
                            <h6 className="mb-1 fw-bold">{item.label}</h6>
                            <p className="mb-0 text-muted">{item.value || 'N/A'}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Actions */}
                  <div className="mt-4 d-flex justify-content-center gap-3">
                    <button className="btn btn-outline-secondary"
                      data-bs-toggle="modal"
                          data-bs-target="#update-offer-modal"
                          onClick={() => setSelectedOffer(Data)}>Update</button>
                    <button className="btn btn-outline-danger"
                    onClick={() => handleDelete(Data?._id)} >Delete</button>
                      <Link className="btn btn-outline-success"
                        to={`/condidatList/${Data?._id}`}
                     >Offer's condidat</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

              <div
      className="modal fade"
      id="update-offer-modal"
      tabIndex="-1"
      aria-labelledby="updateOfferModalLabel"
      aria-hidden="true"
    >
  <div className="modal-dialog modal-dialog-centered">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="updateOfferModalLabel">
          Update Offer
        </h5>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
          onClick={() => setSelectedOffer(null)}
        ></button>
      </div>
      <div className="modal-body">
        {selectedOffer && (
          <form onSubmit={handleFormSubmit}>
            {/* Ligne 1 */}
            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="offerTitle" className="form-label">
                  Title
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="offerTitle"
                  value={selectedOffer.titre}
                  onChange={(e) =>
                    setSelectedOffer({ ...selectedOffer, titre: e.target.value })
                  }
                  required
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="offerTypeContrat" className="form-label">
                  Contract Type
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="offerTypeContrat"
                  value={selectedOffer.typeContrat}
                  onChange={(e) =>
                    setSelectedOffer({ ...selectedOffer, typeContrat: e.target.value })
                  }
                  required
                />
              </div>
            </div>
            {/* Ligne 2 */}
            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="offerLocation" className="form-label">
                  Location
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="offerLocation"
                  value={selectedOffer.localisation}
                  onChange={(e) =>
                    setSelectedOffer({ ...selectedOffer, localisation: e.target.value })
                  }
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="offerPublicationDate" className="form-label">
                  Publication Date
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="offerPublicationDate"
                  value={selectedOffer.datePublication}
                  onChange={(e) =>
                    setSelectedOffer({ ...selectedOffer, datePublication: e.target.value })
                  }
                />
              </div>
            </div>
            {/* Ligne 3 */}
            <div className="row mb-3">
              <div className="col-md-6">
                  <label htmlFor="offerDescription" className="form-label">
                  Description
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="offerDescription"
                  value={selectedOffer.description}
                  onChange={(e) =>
                    setSelectedOffer({ ...selectedOffer, description: e.target.value })
                  }
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="offerSalary" className="form-label">
                  Salary
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="offerSalary"
                  value={selectedOffer.salary}
                  onChange={(e) =>
                    setSelectedOffer({ ...selectedOffer, salary: e.target.value })
                  }
                />
              </div>
            </div>
            {/* Ligne 4 */}
            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="offerResponsibilities" className="form-label">
                  Responsibilities
                </label>
                <textarea
                  className="form-control"
                  id="offerResponsibilities"
                  rows="2"
                  value={selectedOffer.responsibilities}
                  onChange={(e) =>
                    setSelectedOffer({ ...selectedOffer, responsibilities: e.target.value })
                  }
                ></textarea>
              </div>
              <div className="col-md-6">
                <label htmlFor="offerEducation" className="form-label">
                  Education
                </label>
                <textarea
                  className="form-control"
                  id="offerEducation"
                  rows="2"
                  value={selectedOffer.education}
                  onChange={(e) =>
                    setSelectedOffer({ ...selectedOffer, education: e.target.value })
                  }
                ></textarea>
              </div>
            </div>
            {/* Ligne 5 */}
            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="offerExperience" className="form-label">
                  Experience
                </label>
                <textarea
                  className="form-control"
                  id="offerExperience"
                  rows="2"
                  value={selectedOffer.experience}
                  onChange={(e) =>
                    setSelectedOffer({ ...selectedOffer, experience: e.target.value })
                  }
                ></textarea>
              </div>
              <div className="col-md-6">
                <label htmlFor="offerBenefits" className="form-label">
                  Other Benefits
                </label>
                <textarea
                  className="form-control"
                  id="offerBenefits"
                  rows="2"
                  value={selectedOffer.otherBenifits}
                  onChange={(e) =>
                    setSelectedOffer({ ...selectedOffer, otherBenifits: e.target.value })
                  }
                ></textarea>
              </div>
            </div>
            {/* Ligne 6 */}
            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="offerGender" className="form-label">
                  Gender
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="offerGender"
                  value={selectedOffer.gender}
                  onChange={(e) =>
                    setSelectedOffer({ ...selectedOffer, gender: e.target.value })
                  }
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="offerCategory" className="form-label">
                  Category
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="offerCategory"
                  value={selectedOffer.category}
                  onChange={(e) =>
                    setSelectedOffer({ ...selectedOffer, category: e.target.value })
                  }
                />
              </div>
            </div>
            {/* Ligne 7 */}
            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="offerType" className="form-label">
                  Type
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="offerType"
                  value={selectedOffer.type}
                  onChange={(e) =>
                    setSelectedOffer({ ...selectedOffer, type: e.target.value })
                  }
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="offerApplicationDeadline" className="form-label">
                  Application Deadline
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="offerApplicationDeadline"
                  value={selectedOffer.applicationDeadline}
                  onChange={(e) =>
                    setSelectedOffer({ ...selectedOffer, applicationDeadline: e.target.value })
                  }
                />
              </div>
            </div>
            {/* Submit Button */}
            <button type="submit" className="btn btn-primary">
              Save Changes
            </button>
          </form>
        )}
      </div>
    </div>
  </div>
</div>
        </div>
      </div>
    </div>
  )
}

export default OfferDetails
