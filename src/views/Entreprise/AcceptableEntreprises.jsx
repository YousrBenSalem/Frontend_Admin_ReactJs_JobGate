import React, { useEffect, useState } from 'react'
import entreprise from '../../services/entreprise';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEye } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';

const AcceptableEntreprises = () => {

  const [Data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [entreprisesPerPage] = useState(5); // Nombre d'entreprises par page

  const getEntreprise = async () => {
    try {
      const res = await entreprise.getEntreprise();
      setData(res.data.entreprises);
      console.log("Entreprise récupérée avec succés:", res.data);
    } catch (error) {
      console.error("Erreur lors de la récupération de l'entreprise :", error);
    }
  };

  useEffect(() => {
    getEntreprise();
  }, []);

  // Gérer la suppression d'entreprise
  const handleDelete = async (id) => {
    console.log("Supprimer l'entreprise ID:", id);
    try {
      const res = await entreprise.deleteEntreprise(id);
      console.log("Entreprise supprimé avec succés:", res.data);
      getEntreprise();
    } catch (error) {
      console.error("Erreur lors de la suppression d'entreprise :", error);
    }
  };

  // Calculer les entreprises affichées sur la page courante
  const indexOfLastEntreprise = currentPage * entreprisesPerPage;
  const indexOfFirstEntreprise = indexOfLastEntreprise - entreprisesPerPage;
  const currentEntreprises = Data?.filter(
    item =>
      (item.status === "acceptable" || item.status === "Acceptable") &&
      (item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.secteur.toLowerCase().includes(search.toLowerCase()))
  ).slice(indexOfFirstEntreprise, indexOfLastEntreprise);

  // Gérer le changement de page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container-fluid">
      {/* Barre de recherche */}
      <div className="d-flex justify-content-between my-3">
        <input
          type="text"
          className="form-control w-25"
          placeholder="Search entreprise"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      
      <div className="table-responsive">
        <table className="table table-striped table-bordered table-hover">
          <thead className="bg-light">
            <tr>
              <th className="text-center">Name</th>
              <th className="text-center">Secteur</th>
              <th className="text-center">Address</th>
              <th className="text-center">Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          {currentEntreprises.length > 0 ? (
            <tbody>
              {currentEntreprises.map((entr, index) => (
                <tr key={index}>
                  <td>
                    <div className="d-flex align-items-center">
                      <img
                        src={entr?.logo ? `http://localhost:3000/file/${entr?.logo}` : "https://mdbootstrap.com/img/new/avatars/8.jpg"}
                        alt
                        style={{ width: 45, height: 45 }}
                        className="rounded-circle"
                      />
                      <div className="ms-3">
                        <p className="fw-bold mb-1">{entr?.name}</p>
                        <p className="text-muted mb-0">{entr?.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="text-center">{entr?.secteur}</td>
                  <td className="text-center">{entr?.adresse}</td>
                  <td className="text-center">{entr?.status}</td>
                  <td className="text-center">
                    <div className="d-flex justify-content-around">
                      <button
                        type="button"
                        className="btn btn-link btn-sm text-danger"
                        onClick={() => handleDelete(entr._id)}
                      >
                        <FontAwesomeIcon icon={faTrash} title="Delete" />
                      </button>
                      <Link
                        to={`/entrepriseDetails/${entr._id}`}
                        type="button"
                        className="btn btn-link btn-sm text-success"
                      >
                        <FontAwesomeIcon icon={faEye} title="Show Details" />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          ) : (
            <tbody>
              <tr>
                <td colSpan="5" className="text-center">
                  No data found.
                </td>
              </tr>
            </tbody>
          )}
        </table>
      </div>

      {/* Pagination */}
      <nav aria-label="Page navigation">
        <ul className="pagination justify-content-center">
          {Array.from({ length: Math.ceil(Data.length / entreprisesPerPage) }, (_, index) => (
            <li key={index + 1} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
              <button className="page-link" onClick={() => paginate(index + 1)}>
                {index + 1}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default AcceptableEntreprises;
