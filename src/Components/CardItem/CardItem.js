import React from 'react';
import './cardItem.css';

const CardItem = ({
  cardData = {},
  imageUrl = "",
  title = "",
  description = "",
  sizes = "",
}) => {
  return (
    <div className="card">
      <img className="card-image" alt="Avatar" src={cardData.thumbnailUrl || imageUrl} />
      <div className="container">
        <div className="card-title">{title}</div>
        <div className="card-description">{description}</div>
        <div className="card-description-2">{sizes}</div>
      </div>
    </div>
  )
}

export default CardItem;