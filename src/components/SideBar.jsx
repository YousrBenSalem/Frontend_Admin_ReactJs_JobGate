import React from 'react'
import { Link } from 'react-router-dom'

const SideBar = () => {
  return (
    <div>
        <aside className="left-sidebar">
    {/* Sidebar scroll*/}
    <div>
      <div className="brand-logo d-flex align-items-center justify-content-between">
        <a href="./index.html" className="text-nowrap logo-img">
          <img src="../assets/images/logos/image.png" alt="" style={{width:"200px"}} />
        </a>
        <div className="close-btn d-xl-none d-block sidebartoggler cursor-pointer" id="sidebarCollapse">
          <i className="ti ti-x fs-8" />
        </div>
      </div>
      {/* Sidebar navigation*/}
      <nav className="sidebar-nav scroll-sidebar" data-simplebar>
        <ul id="sidebarnav">
          <li className="nav-small-cap">
            <i className="ti ti-dots nav-small-cap-icon fs-6" />
            <span className="hide-menu">Home</span>
          </li>
          <li className="sidebar-item">
            <Link className="sidebar-link" to="/" aria-expanded="false">
              <span>
                <iconify-icon icon="solar:home-smile-bold-duotone" className="fs-6" />
              </span>
              <span className="hide-menu">Dashboard</span>
            </Link>
          </li>
          <li className="nav-small-cap">
            <i className="ti ti-dots nav-small-cap-icon fs-6" />
            <span className="hide-menu">ENTREPRISE</span>
          </li>
          <li className="sidebar-item">
            <Link className="sidebar-link" to="/entreprisesList" aria-expanded="false">
                          <span>
                <iconify-icon icon="mdi:office-building" className="fs-6" />
              </span>

              <span className="hide-menu">Pending entreprises</span>
            </Link>
          </li>
          <li className="sidebar-item">
            <Link className="sidebar-link" to="/acceptableEntreprises" aria-expanded="false">
              <span>
                <iconify-icon icon="mdi:office-building" className="fs-6" />
              </span>
              <span className="hide-menu">Acceptable entreprises</span>
            </Link>
          </li>
            <li className="nav-small-cap">
            <i className="ti ti-dots nav-small-cap-icon fs-6" />
            <span className="hide-menu">OFFERS</span>
          </li>
          <li className="sidebar-item">
  <Link className="sidebar-link" to="/offers" aria-expanded="false">
    <span>
      <iconify-icon icon="ic:outline-work" className="fs-6" />
    </span>
    <span className="hide-menu">Pending Job offers</span>
  </Link>
</li>

          <li className="sidebar-item">
              <Link className="sidebar-link" to="/acceptableOffers" aria-expanded="false">
    <span>
      <iconify-icon icon="ic:outline-work" className="fs-6" />
    </span>
    <span className="hide-menu">Acceptable Job offers</span>
  </Link>
          </li>
      
        </ul>

      </nav>
      {/* End Sidebar navigation */}
    </div>
    {/* End Sidebar scroll*/}
  </aside>
    </div>
  )
}

export default SideBar
