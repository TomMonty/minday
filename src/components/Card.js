import React from 'react';

function Card({ card, onSkip, onSave, onInfo }) {
  return (
    <div className="card">
      <img src={`/images/${card.image}`} alt={card.title} className="card-img" />
      <h2>{card.title}</h2>
      <p>{card.description}</p>
      <button onClick={onInfo}>Plus d'infos</button>
      <div className="actions">
        <button className="btn-skip" onClick={onSkip}>✖</button>
        <button className="btn-save" onClick={onSave}>✔</button>
      </div>
    </div>
  );
}

export default Card;
