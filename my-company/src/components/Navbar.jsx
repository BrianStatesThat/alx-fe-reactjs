import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const location = useLocation();
  
  const linkStyle = {
    color: 'white',
    textDecoration: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    transition: 'background-color 0.3s ease'
  };
  
  const activeLinkStyle = {
    ...linkStyle,
    backgroundColor: 'rgba(255, 255, 255, 0.2)'
  };

  return (
    <nav style={{
      backgroundColor: '#2c3e50',
      padding: '1rem 2rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white' }}>
        MyCompany
      </div>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <Link 
          to="/" 
          style={location.pathname === '/' ? activeLinkStyle : linkStyle}
        >
          Home
        </Link>
        <Link 
          to="/about" 
          style={location.pathname === '/about' ? activeLinkStyle : linkStyle}
        >
          About
        </Link>
        <Link 
          to="/services" 
          style={location.pathname === '/services' ? activeLinkStyle : linkStyle}
        >
          Services
        </Link>
        <Link 
          to="/contact" 
          style={location.pathname === '/contact' ? activeLinkStyle : linkStyle}
        >
          Contact
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;