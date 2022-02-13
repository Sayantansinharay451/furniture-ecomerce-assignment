import React from "react";
import Furniture3 from "../Assets/Furniture/image-80.png";
import Furniture2 from "../Assets/Furniture/image-89.png";
import Furniture4 from "../Assets/Furniture/image-95.png";
import Furniture1 from "../Assets/Furniture/image-98.png";
import FurnitureItems from "./FurnitureItems";

const FurnitureData = [
	{
		id: 1,
		imageUrl: Furniture1,
		title: " Wooden table lamp",
		price: "$3,499",
	},
	{
		id: 2,
		imageUrl: Furniture2,
		title: "Shaped sofa",
		price: "$2,899",
	},
	{
		id: 3,
		imageUrl: Furniture3,
		title: "European style sofa",
		price: "$2,300",
	},
	{
		id: 4,
		imageUrl: Furniture4,
		title: "Long single stool",
		price: "$4,890",
	},
];

const FurnitureContainer = () => {
	return (
		<div className="furniture-container">
			{[...Array(10)].map((i) =>
				FurnitureData.map((furniture) => (
					<FurnitureItems
						key={furniture.id}
						src={furniture.imageUrl}
						title={furniture.title}
						price={furniture.price}
					/>
				))
			)}
		</div>
	);
};

export default FurnitureContainer;
