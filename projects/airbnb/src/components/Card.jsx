import React from "react";
import starIcon from "../images/star.png";

const Card = ({ img, rating, reviewCount, country, title, price }) => {
	return (
		<div className="card">
			<div className="card-image">
				<button className="card-status">SOLD OUT</button>
				<img src={`../images/${img}`} />
			</div>
			<div className="card-content">
				<div className="card-rating">
					<img src={starIcon} />
					<p>
						{rating}{" "}
						<span>
							({reviewCount}).{country}
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
};

export default Card;
