import React from "react";

export default function Card({
	coverImg: img,
	stats,
	location,
	title,
	price,
	openSpots,
}) {
	let badgeText =
		openSpots === 0 ? "SOLD OUT" : location === "Online" ? "ONLINE" : "";
	return (
		<div className="card">
			<div className="card-image">
				{badgeText && <button className="card-status">{badgeText}</button>}
				<img src={`public/images/${img}`} />
			</div>
			<div className="card-content">
				<div className="card-rating">
					<img src="public/images/star.png" />
					<p>
						{stats.rating}{" "}
						<span>
							({stats.reviewCount})•{location}
						</span>
					</p>
				</div>
				<p className="card-text">{title}</p>
				<p className="card-cost">
					From ${price} <span>/ person</span>
				</p>
			</div>
		</div>
	);
}
