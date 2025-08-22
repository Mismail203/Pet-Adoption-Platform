
import React from "react";
import { useNavigate } from "react-router-dom";
import "./header.css";

export default function Header() {
	const navigate = useNavigate();

	const handleLogout = () => {
		navigate("/app/logout");
	};

	return (
		<header className="header-user">
			<div className="container">
				<div className="logo-user" role="img" aria-label="Pet Adoption">
					<span className="mark" />
					<span>Pet Adoption</span>
				</div>
				<div className="header-actions">
					<button className="btn" title="Notifications">🔔</button>
					<button className="btn" title="Profile">👤</button>
					<button className="btn primary" onClick={handleLogout}>Logout</button>
				</div>
			</div>
		</header>
	);
}