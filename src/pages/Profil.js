import React from 'react';
import Navbar from '../components/Navbar';

function Profil() {
  return (
    <div style={{ paddingBottom: "60px" }}>
      <h1>Profil</h1>
      <p>Gérez votre compte utilisateur.</p>
      <Navbar active="Profil" />
    </div>
  );
}

export default Profil;
