import React from "react";
import Timer from "./Timer";

function ListingCard({ listing, onInterested, isAuthenticated }) {
  const isExpired = Date.now() >= (listing.expiresAt || 0);
  const isSold = listing.status === "sold";
  const urgent =
    !isSold &&
    !isExpired &&
    (listing.expiresAt || 0) - Date.now() <= 60 * 60 * 1000;

  let statusLabel = "Available";
  if (isSold) {
    statusLabel = "Sold";
  } else if (isExpired) {
    statusLabel = "Expired";
  }

  const canBeInterested = isAuthenticated && !isSold && !isExpired;

  return (
    <article
      className={`card ${urgent ? "card-urgent" : ""} ${isSold ? "card-sold" : ""}`}
    >
      <div className="card-head">
        <h3>{listing.cropName}</h3>
        <span className={`status status-${statusLabel.toLowerCase()}`}>{statusLabel}</span>
      </div>

      <p>
        <strong>Quantity:</strong> {listing.quantity}
      </p>
      <p>
        <strong>Price:</strong> {listing.price}
      </p>

      <div className="timer-row">
        <strong>Time Left:</strong> <Timer expiresAt={listing.expiresAt} />
      </div>

      <button
        className="interested-btn"
        onClick={() => onInterested(listing.id)}
        disabled={!canBeInterested}
      >
        {!isAuthenticated
          ? "Login to Interested"
          : isSold
            ? "Sold"
            : isExpired
              ? "Expired"
              : "Interested"}
      </button>
    </article>
  );
}

export default ListingCard;
