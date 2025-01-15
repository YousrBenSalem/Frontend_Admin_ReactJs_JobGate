import React, { useEffect, useState } from 'react';
import entreprise from '../../services/entreprise';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle, faTrash, faEdit, faCheckCircle, faUser } from '@fortawesome/free-solid-svg-icons'; 
import offre from '../../services/offre';

const OffersList = () => {
  const [Data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAllOffers, setShowAllOffers] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
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


  const offersPerPage = 2;

  const getEntreprise = async () => {
    try {
      const response = await entreprise.getEntreprise();
      setData(response.data.entreprises);
      console.log("Entreprises récupérées avec succès :", response.data.entreprises);
    } catch (error) {
      console.error("Erreur lors de la récupération d'entreprises :", error);
    }
  };

  useEffect(() => {
    getEntreprise();
  }, []);
    const handleDelete = async(id) =>{
      try {
          const response = await offre.deleteOffer(id);
          console.log("offer supprimé avec succès :", response.data.deletedOffer);
                      getEntreprise();

        } catch (error) {
          console.error("Erreur lors de la supprission d'offre :", error);
        }
    }
  const toggleShowAll = () => {
    setShowAllOffers(!showAllOffers);
  };

    const handleCloseModal = () => {
    const modal = document.getElementById("update-offer-modal");
    modal.classList.remove("show");
    modal.style.display = "none";
  };
  const filteredData = Data?.filter((item) =>
    item?.status?.toLowerCase() === "acceptable" &&
    item?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastOffer = currentPage * offersPerPage;
  const indexOfFirstOffer = indexOfLastOffer - offersPerPage;
  const currentOffers = filteredData?.slice(indexOfFirstOffer, indexOfLastOffer);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(filteredData?.length / offersPerPage);
  const handleUpdateStatus = async (id) => {
    
    try {

  const res = await offre.UpdateStatus(id);
  console.log("Status mis à jour avec succés:", res.data)
  getEntreprise()
} catch (error) {
  console.error("Erreur lors de la mis à jour de status :", error);

}
  };


    const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await offre.updateOffer(selectedOffer._id , selectedOffer);
          console.log("offre modifée avec succès :", response.data.updatedOffer);
    alert("Entreprise modifée avec succès !");
              handleCloseModal();
      window.location.reload();


        getEntreprise();

      
    } catch (error) {
        console.error("Erreur lors de la modification de l'offre :", error);
    alert("Erreur lors de la modification de l'offre.");
  };
}


  return (
    <div className="container my-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="text-primary"> Pending Offer's List</h3>
        <div className="d-flex">
          <input
            type="text"
            className="form-control me-2"
            placeholder="Rechercher des offres..."
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Display offers */}
      <div className="row g-4">
        {currentOffers?.map((entreprise, idx) => (
          <div key={idx} className="col-lg-6 col-md-12">
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <h5 className="card-title text-primary">{entreprise?.name}</h5>
                <p className="card-text">
                  <strong>Adresse:</strong> {entreprise?.adresse || "N/A"}
                </p>
                <h6 className="text-secondary">Offres:</h6>
                <div className="list-group">
                  {entreprise?.offreId?.slice(0, showAllOffers ? undefined : 3)?.filter((item) =>
    item.status.toLowerCase() === "pending")?.map((offre, index) => (
                    <div
                      key={index}
                      className="list-group-item d-flex flex-column mb-3 shadow-lg rounded-lg p-3"
                    >
                      <h6 className="mb-1 text-primary">{offre?.titre}</h6>
                      <p className="mb-1">
                        <strong>Type:</strong> {offre?.type} |{" "}
                        <strong>Contrat:</strong> {offre?.typeContrat}
                      </p>
                      <p className="text-muted mb-1">
                        <strong>Deadline:</strong> {offre?.applicationDeadline}
                      </p>
                       <div className="d-flex justify-content-between">
                        <Link
                          to={`/offerDetails/${offre?._id}`}
                          className="btn btn-outline-primary btn-sm"
                        >
                          <FontAwesomeIcon icon={faInfoCircle} title="Details" />
                        </Link>
                            <Link
                            to={`/condidatList/${offre?._id}`}
                                                  className="btn btn-outline-warning btn-sm"
                                                >
                                                  <FontAwesomeIcon icon={faUser} title="offer's condidat" />
                                                </Link>
                        <button
                          className="btn btn-outline-danger btn-sm"
                          onClick={() => handleDelete(offre?._id)} 
                        >
                          <FontAwesomeIcon icon={faTrash} title="Delete" />
                        </button>
                        <button
                          className="btn btn-outline-secondary btn-sm"
                          data-bs-toggle="modal"
                          data-bs-target="#update-offer-modal"
                          onClick={() => setSelectedOffer(offre)}
                        >
                          <FontAwesomeIcon icon={faEdit} title="Edit" />
                        </button>
                        <button
                          className="btn btn-outline-success btn-sm"
                          onClick={() => handleUpdateStatus(offre?._id)} 
                        >
                          <FontAwesomeIcon icon={faCheckCircle} title="Validate" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                {/* Afficher tout / Réduire */}
                <button
                  onClick={toggleShowAll}
                  className="btn btn-link mt-3 text-primary"
                >
                  {showAllOffers ? "Show less" : "Show all"}
                </button>
              </div>
            </div>
          </div>
        ))}
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


      {/* Pagination Controls */}
      
        <div className="d-flex justify-content-center mt-4">
          <nav aria-label="Page navigation">
            <ul className="pagination">
              {Array.from({ length: totalPages }, (_, index) => (
                <li
                  key={index + 1}
                  className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
                >
                  <button
                    className="page-link"
                    onClick={() => paginate(index + 1)}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
    


      
    </div>
  );
};

export default OffersList;
