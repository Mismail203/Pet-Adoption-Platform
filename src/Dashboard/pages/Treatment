
import React from "react";
import "./Treatment.css";

const treatments = [
	{ id: "T-01", pet: "Bella", type: "Vaccination", date: "2025-01-12", vet: "Dr. Singh" },
	{ id: "T-02", pet: "Nala", type: "Deworming", date: "2025-02-05", vet: "Dr. Kapoor" },
	{ id: "T-03", pet: "Milo", type: "Dental Check", date: "2025-03-08", vet: "Dr. Rao" },
];

export default function Treatment() {
	return (
		<div>
			<h2 className="page-title">Treatment</h2>
			<section className="card">
				<ul className="treatment-list" style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: 10 }}>
					{treatments.map((t) => (
						<li key={t.id} style={{
							display: "grid",
							gridTemplateColumns: "1fr 1fr 1fr 1fr",
							gap: 10,
							padding: 12,
							border: "1px solid rgba(255,255,255,0.06)",
							borderRadius: 10,
							background: "rgba(255,255,255,0.03)",
						}}>
							<span><strong>ID:</strong> {t.id}</span>
							<span><strong>Pet:</strong> {t.pet}</span>
							<span><strong>Type:</strong> {t.type}</span>
							<span><strong>Date:</strong> {t.date}</span>
						</li>
					))}
				</ul>
			</section>
		</div>
	);
}