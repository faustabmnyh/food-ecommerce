import React from "react";

const Rating = ({ rating }) => {
  return (
    <div className="rating">
      <p>{rating.toFixed(1)}</p>
      <span>
        <i className="fa fa-star" />
      </span>
      {/* {num_reviews ? <div className="rating__reviews">{num_reviews} Reviews</div> : null} */}
    </div>
  );
};

export default Rating;
