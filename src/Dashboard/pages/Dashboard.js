import React from "react";
import "./Dashboard.css";

export default function Dashboard() {
	return (
		<div>
			<h2 className="page-title">Dashboard</h2>
			<div className="card-grid">
				<section className="card stat">
					<div>
						<div className="label">Total Pets</div>
						<div className="value">126</div>
					</div>
					<div>🐾</div>
				</section>
				<section className="card stat">
					<div>
						<div className="label">Adopted</div>
						<div className="value">87</div>
					</div>
					<div>🏡</div>
				</section>
				<section className="card stat">
					<div>
						<div className="label">Treatments</div>
						<div className="value">42</div>
					</div>
					<div>💊</div>
				</section>
			</div>
			<section className="card" style={{ marginTop: 16 }}>
				<h3 style={{ marginTop: 0 }}>Overview</h3>
				<p className="dashboard-overview">
					Welcome back! This is your analytics overview. Hook up charts and real data later.
				</p>
			</section>
		</div>
	);
}