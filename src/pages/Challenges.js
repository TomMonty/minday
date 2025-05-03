import React from 'react';
import Navbar from '../components/Navbar';

function Challenges() {
  return (
    <div style={{ paddingBottom: "60px" }}>
      <h1>Challenges</h1>
      <p>Participez à des défis !</p>
      <Navbar active="Challenges" />
    </div>
  );
}

export default Challenges;
