import React from 'react';

function Footer() {
  return (
    <footer style={{
      backgroundColor: '#2c3e50',
      color: 'white',
      textAlign: 'center',
      padding: '1.5rem',
      marginTop: 'auto'
    }}>
      <p style={{ marginBottom: '0.5rem' }}>© 2023 MyCompany. All rights reserved.</p>
      <p style={{ fontSize: '0.9rem', opacity: 0.8 }}>
        123 Business Street, City, Country | info@mycompany.com | +123 456 7890
      </p>
    </footer>
  );
}

export default Footer;