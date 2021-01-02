import React from "react";

const Rating = ({ rating, seller, caption, numReviews, comment }) => {
  return seller ? (
    <div className="rating">
      <span>
        <i
          className={
            rating >= 1
              ? "fa fa-star"
              : rating >= 0.5
              ? "fa fa-star-half-o"
              : "fa fa-star-o"
          }
        ></i>
      </span>
      <span>
        <i
          className={
            rating >= 2
              ? "fa fa-star"
              : rating >= 1.5
              ? "fa fa-star-half-o"
              : "fa fa-star-o"
          }
        ></i>
      </span>
      <span>
        <i
          className={
            rating >= 3
              ? "fa fa-star"
              : rating >= 2.5
              ? "fa fa-star-half-o"
              : "fa fa-star-o"
          }
        ></i>
      </span>
      <span>
        <i
          className={
            rating >= 4
              ? "fa fa-star"
              : rating >= 3.5
              ? "fa fa-star-half-o"
              : "fa fa-star-o"
          }
        ></i>
      </span>
      <span>
        <i
          className={
            rating >= 5
              ? "fa fa-star"
              : rating >= 4.5
              ? "fa fa-star-half-o"
              : "fa fa-star-o"
          }
        ></i>
      </span>
      <p>{comment ? "" : rating.toFixed(1)}</p>
      <p>{caption ? <p>{caption}</p> : `(${numReviews} reviews)`}</p>
    </div>
  ) : (
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
