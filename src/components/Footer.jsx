import React from 'react'

const Footer = () => {
    const currentYear = new Date().getFullYear();

  return (
  <div>
  <footer className="iq-footer">
      <div className="container text-center">
        <p className="mb-0">
          Made with <span style={{ color: 'red', fontSize: '1.2rem' }}>♥</span> by 
          <strong> Yosr Ben Salem</strong> - {currentYear}
        </p>
      </div>
  </footer>
</div>

  )
}

export default Footer
