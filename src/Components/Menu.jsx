import React from "react";
import Home from "../Assets/Icons/Vector 178.svg";
import Furniture from "../Assets/Icons/Vector 179.svg";
import Cart from "../Assets/Icons/Vector 180.svg";
import Discovery from "../Assets/Icons/Vector 181.svg";

const Menu = () => {
	return (
		<div className="menu">
			<img src={Home} alt="Home" className="menu-items" />
			<img src={Furniture} alt="More Furniture" className="menu-items" />
			<img src={Cart} alt="Cart" className="menu-items" />
			<img src={Discovery} alt="Discovery Furniture" className="menu-items" />
		</div>
	);
};

export default Menu;
