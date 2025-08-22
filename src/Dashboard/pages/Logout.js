import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Logout.css";

export default function Logout() {
	const navigate = useNavigate();

	useEffect(() => {
		try {
			localStorage.removeItem("user_token");
			// Add other cleanup if needed
		} catch {}
		navigate("/app/login", { replace: true });
	}, [navigate]);

	return (
		<div>
			<h2 className="page-title">Logging out…</h2>
			<section className="card">
				<p className="logout-text">You are being redirected to login.</p>
			</section>
		</div>
	);
}