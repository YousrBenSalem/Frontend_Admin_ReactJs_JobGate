import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Layout from './views/Home/Layout';
import Home from './views/Home/Home';
import Login from './views/Login/Login';
import Forgot from './views/forgotPassword/Forgot';
import ResetPassword from './views/ResetPassword/resetPassword';
import EntrepriseList from './views/Entreprise/EntrepriseList';
import AcceptableEntreprises from './views/Entreprise/AcceptableEntreprises';
import EntrepriseDetails from './views/Entreprise/EntrepriseDetails';
import OffersList from './views/Offers/OffersList';
import AcceptableOffers from './views/Offers/AcceptableOffers';
import OfferDetails from './views/Offers/OfferDetails';
import CondidatList from './views/Condidat/CondidatList';
import CondidatDetails from './views/Condidat/CondidatDetails';
import Profile from './views/Admin/profile';
import UpdatePassword from './views/Admin/UpdatePassword';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} >
          <Route path="/" element={<Layout />} />
          <Route path="/entreprisesList" element={<EntrepriseList />} />
          <Route path="/acceptableEntreprises" element={<AcceptableEntreprises />} />
          <Route path="/entrepriseDetails/:id" element={<EntrepriseDetails />} />
          <Route path="/offers" element={<OffersList />} />
          <Route path="/acceptableOffers" element={<AcceptableOffers />} />
          <Route path="/offerDetails/:id" element={<OfferDetails />} />
          <Route path="/condidatList/:id" element={<CondidatList />} />
          <Route path="/condidatDetails/:id" element={<CondidatDetails />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/updatePassword" element={<UpdatePassword />} />





        
        
        
        
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/forgotPassword" element={<Forgot/>}/>
        <Route path="/reset/:token" element={<ResetPassword />} />
      </Routes>
    </Router>
    
  );
}

export default App;
