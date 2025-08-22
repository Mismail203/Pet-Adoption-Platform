
import React from "react";
import "./Pets.css";

const demoPets = [
	{ id: "P-1001", name: "Bella", type: "Dog", breed: "Labrador", age: 3, status: "Available" },
	{ id: "P-1002", name: "Milo", type: "Cat", breed: "Siamese", age: 2, status: "Adopted" },
	{ id: "P-1003", name: "Nala", type: "Dog", breed: "Beagle", age: 4, status: "Treatment" },
];

export default function Pets() {
	return (
		<div>
			<h2 className="page-title">Pets</h2>
			<section className="card">
				<div style={{ overflowX: "auto" }}>
					<table className="pets-table" style={{ width: "100%", borderCollapse: "collapse" }}>
						<thead>
							<tr style={{ textAlign: "left", color: "#9aa4b2" }}>
								<th style={{ padding: 10 }}>ID</th>
								<th style={{ padding: 10 }}>Name</th>
								<th style={{ padding: 10 }}>Type</th>
								<th style={{ padding: 10 }}>Breed</th>
								<th style={{ padding: 10 }}>Age</th>
								<th style={{ padding: 10 }}>Status</th>
							</tr>
						</thead>
						<tbody>
							{demoPets.map((p) => (
								<tr key={p.id}>
									<td style={{ padding: 10 }}>{p.id}</td>
									<td style={{ padding: 10 }}>{p.name}</td>
									<td style={{ padding: 10 }}>{p.type}</td>
									<td style={{ padding: 10 }}>{p.breed}</td>
									<td style={{ padding: 10 }}>{p.age}</td>
									<td style={{ padding: 10 }}>
										<span style={{
											display: "inline-block",
											padding: "4px 8px",
											borderRadius: 6,
											background: p.status === "Available" ? "rgba(36,210,255,0.15)" : p.status === "Adopted" ? "rgba(72,187,120,0.2)" : "rgba(124,92,255,0.2)",
											color: p.status === "Available" ? "#7ee0ff" : p.status === "Adopted" ? "#63d391" : "#a994ff",
										}}>{p.status}</span>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</section>
		</div>
	);
}