import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaRegFileAlt } from 'react-icons/fa'; 
import condidat from '../../services/condidat';

const CondidatDetails = () => {
  const { id } = useParams();
  const [Condidat, setCondidat] = useState(null);
  const [loading, setLoading] = useState(true);

  const getCondidatById = async (id)=>{
    try {
          const response = await condidat.getCondidatById(id);
    setCondidat(response?.data?.condidat);

console.log("condidat recupéré avec succès :", response?.data?.condidat);
        setLoading(false);


      
    } catch (error) {
      console.error("Erreur lors de la récupération de condidat :", error);
              setLoading(false);

      
    }

  }
useEffect(() => {
    getCondidatById(id)
},[])

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (!Condidat) {
    return <div>Candidat non trouvé</div>;
  }

  return (
    <div className="container my-5">
      <div className="card shadow-lg">
        <div className="card-body">
          <div className="row">
            {/* Image de profil */}
            <div className="col-md-4 text-center">
              <img
                src={Condidat?.image ? `http://localhost:3000/file/${Condidat?.image}` : "../assets/images/user/01.jpg"}
                alt="Profile"
                className="img-fluid rounded-circle avatar-150 shadow"
              />
            </div>

            {/* Détails du candidat */}
            <div className="col-md-8">
              <h3 className="fw-bold text-dark">{Condidat?.name} {Condidat?.prenom}</h3>
              <p className="text-muted">{Condidat?.job}</p>

              {/* Informations de contact */}
              <div className="my-3">
                <div className="d-flex align-items-center">
                  <FaEnvelope className="text-primary me-2" />
                  <p className="mb-0">{Condidat?.email}</p>
                </div>
                <div className="d-flex align-items-center">
                  <FaPhoneAlt className="text-success me-2" />
                  <p className="mb-0">{Condidat?.telephone}</p>
                </div>
                <div className="d-flex align-items-center">
                  <FaMapMarkerAlt className="text-warning me-2" />
                  <p className="mb-0">{Condidat?.adresse}</p>
                </div>
              </div>

              {/* Description du candidat */}
              <h5>Description</h5>
              <p>{Condidat?.description}</p>

              {/* Formation */}
              <h5>Formation</h5>
              <ul>
                {Condidat?.formation.map((formation, index) => (
                  <li key={index}>{formation.diplome} à {formation.ecole} ({formation.dateDeDebut} - {formation.dateDeFin})</li>
                ))}
              </ul>

              {/* Compétences */}
              <h5>Compétences</h5>
              <ul>
                {Condidat?.skills.map((competence, index) => (
                  <li key={index}>{competence.nom} - {competence.niveauRequis}</li>
                ))}
              </ul>

              {/* Langues */}
              <h5>Langues</h5>
              <ul>
                {Condidat?.languages.map((language, index) => (
                  <li key={index}>{language.langue} - {language.niveauRequis}</li>
                ))}
              </ul>

              {/* Réseaux sociaux */}
              <h5>Réseaux Sociaux</h5>
              <ul>
                {Condidat?.sociaux.map((social, index) => (
                  <li key={index}>
                    <a href={social.link} target="_blank" rel="noopener noreferrer">{social.reseauSocial}</a>
                  </li>
                ))}
              </ul>

              {/* Expérience */}
              <h5>Expérience</h5>
              <ul>
                {Condidat?.experience.map((exp, index) => (
                  <li key={index}>
                    <strong>{exp.poste}</strong> chez {exp.company} ({exp.dateDeDebut} - {exp.dateDeFin})
                    <p>{exp.taches}</p>
                  </li>
                ))}
              </ul>

              {/* CV */}
              <div className="my-3">
                <a href={`http://localhost:3000/file/${Condidat?.cv}`} target="_blank" className="btn btn-outline-primary">
                  <FaRegFileAlt className="me-2" />
                  Télécharger le CV
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CondidatDetails;
