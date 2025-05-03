import React from 'react';
import Navbar from '../components/Navbar';

function Librairie() {
  return (
    <div style={{ paddingBottom: "60px" }}>
      <h1>Librairie</h1>
      <p>Explorez la librairie.</p>
      <Navbar active="Librairie" />
    </div>
  );
}

export default Librairie;
