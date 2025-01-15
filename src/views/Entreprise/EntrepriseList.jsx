import React, { useEffect, useState } from 'react'
import entreprise from '../../services/entreprise';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrash,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';

const EntrepriseList = () => {
  const [Data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // État pour la recherche
  const [currentPage, setCurrentPage] = useState(1); // État pour la page actuelle
  const [itemsPerPage, setItemsPerPage] = useState(5); // Nombre d'éléments par page
  
  // Fonction pour récupérer les entreprises
  const getEntreprise = async () => {
    try {
      const res = await entreprise.getEntreprise();
      setData(res.data.entreprises);
      console.log("Entreprise récupérée avec succès:", res.data);
    } catch (error) {
      console.error("Erreur lors de la récupération de l'entreprise :", error);
    }
  };

  useEffect(() => {
    getEntreprise();
  }, []);

  // Fonction pour gérer la mise à jour du statut
  const handleUpdateStatus = async (id) => {
    try {
      const res = await entreprise.UpdateStatus(id);
      console.log("Status mis à jour avec succès:", res.data);
      getEntreprise();
    } catch (error) {
      console.error("Erreur lors de la mise à jour de status :", error);
    }
  };

  // Fonction pour gérer la suppression d'une entreprise
  const handleDelete = async (id) => {
    console.log("Supprimer l'entreprise ID:", id);
    try {
      const res = await entreprise.deleteEntreprise(id);
      console.log("Entreprise supprimée avec succès:", res.data);
      getEntreprise();
    } catch (error) {
      console.error("Erreur lors de la suppression de l'entreprise :", error);
    }
  };

  // Filtrer les entreprises selon le terme de recherche
  const filteredData = Data.filter(item => {
    return (
            (item.status === "pending" || item.status === "Pending") &&(

      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.secteur.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  // Paginer les données
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  // Calculer le nombre total de pages
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between my-3">
        {/* Champ de recherche */}
        <input
          type="text"
          className="form-control w-25"
          placeholder="Search entreprise"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
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
          {currentItems.length > 0 ? (
            <tbody>
              {currentItems.map((entr, index) => (
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
                  <td>
                    <div className="d-flex justify-content-around">
                      <button
                        type="button"
                        className="btn btn-link btn-sm text-primary"
                        onClick={() => handleUpdateStatus(entr._id)}
                      >
                        <FontAwesomeIcon icon={faEdit} title="Update Status" />
                      </button>
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
      <div className="d-flex justify-content-center my-3">
        <nav>
          <ul className="pagination">
            <li className="page-item" onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}>
              <a className="page-link" href="#">Previous</a>
            </li>
            {Array.from({ length: totalPages }, (_, index) => (
              <li key={index} className={`page-item ${currentPage === index + 1 ? "active" : ""}`}>
                <a className="page-link" href="#" onClick={() => setCurrentPage(index + 1)}>
                  {index + 1}
                </a>
              </li>
            ))}
            <li className="page-item" onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}>
              <a className="page-link" href="#">Next</a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default EntrepriseList;
