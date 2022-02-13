import React from "react";

const FurnitureItems = ({ src, title, price }) => {
	return (
		<div className="furniture">
			<img src={src} alt={title} className="furniture-photo" />
			<div className="furniture-items">
				<h3 className="furniture-title">{title}</h3>
				<p className="furniture-price">{price}</p>
			</div>
		</div>
	);
};

export default FurnitureItems;
