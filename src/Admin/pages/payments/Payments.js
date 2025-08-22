import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./Payments.css";

const Payments = () => {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { status } = useParams();
    const [selectedId, setSelectedId] = useState(null);
    const [rowsPerPage, setRowsPerPage] = useState(15);
    const [currentPage, setCurrentPage] = useState(1);
    const [updatingId, setUpdatingId] = useState(null);
    const [message, setMessage] = useState(null);
    const [messageType, setMessageType] = useState("success");

    useEffect(() => {
        const fetchPayments = async () => {
            try {
                setLoading(true);
                const response = await axios.get(
                    "https://petgatewayapi.onrender.com/getAllPayments"
                );
                if (Array.isArray(response.data)) setPayments(response.data);
                else if (response.data && Array.isArray(response.data.payments))
                    setPayments(response.data.payments);
                else if (response.data && Array.isArray(response.data.data))
                    setPayments(response.data.data);
                else setError("Unexpected data format from server");
            } catch (err) {
                console.error(err);
                setError("Failed to load payments. Please try again later.");
            } finally {
                setLoading(false);
            }
        };
        fetchPayments();
    }, []);

    useEffect(() => {
        setMessage(null);
    }, [currentPage, rowsPerPage]);

    const toggleFullId = (id) => setSelectedId(selectedId === id ? null : id);

    const normalizeStatus = (status) => {
        if (status === "paid") return "Paid";
        if (status === "pending") return "Pending";
        if (status === "failed") return "Rejected";
        return status;
    };

    const selectedStatus = status
        ? status.charAt(0).toUpperCase() + status.slice(1)
        : "Paid";

    const filteredPayments = payments.filter(
        (payment) => normalizeStatus(payment.status) === selectedStatus
    );

    const totalPages = Math.ceil(filteredPayments.length / rowsPerPage) || 1;
    const startIndex = (currentPage - 1) * rowsPerPage;
    const paginatedPayments = filteredPayments.slice(
        startIndex,
        startIndex + rowsPerPage
    );

    const updatePaymentStatus = async (paymentId, newStatus) => {
        setUpdatingId(paymentId);
        setMessage(null);
        try {
            const response = await axios.post(
                "https://stripe.faithdiscipline.org.uk/Payments_APIs/edit_payments.php",
                { payment_id: paymentId, status: newStatus.toLowerCase() },
                { headers: { "Content-Type": "application/json" } }
            );
            if (response.data.success) {
                setPayments((prev) =>
                    prev.map((p) =>
                        p.id === paymentId ? { ...p, status: newStatus.toLowerCase() } : p
                    )
                );
                setMessage("Payment updated successfully.");
                setMessageType("success");
            } else {
                setMessage(response.data.message || "Failed to update payment.");
                setMessageType("error");
            }
        } catch (err) {
            console.error("Update payment error:", err.response || err);
            setMessage(err.response?.data?.message || err.message || "Failed to update payment.");
            setMessageType("error");
        } finally {
            setUpdatingId(null);
        }
    };

    if (error)
        return (
            <div className="payments-wrapper">
                <div className="payments-container">{error}</div>
            </div>
        );

    return (
        <div className="payments-wrapper">
            <div className="payments-container">
                <h2 className="payments-title">{selectedStatus} Payments</h2>

                <div className="rows-selector">
                    <label>Rows per page:</label>
                    <select
                        value={rowsPerPage}
                        onChange={(e) => {
                            setRowsPerPage(Number(e.target.value));
                            setCurrentPage(1);
                        }}
                    >
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={15}>15</option>
                        <option value={20}>20</option>
                        <option value={50}>50</option>
                    </select>
                </div>

                {message && (
                    <div className={`message ${messageType}`}>
                        {message}
                    </div>
                )}

                <table className="payments-table">
                    <thead>
                        <tr>
                            <th>Sr No.</th>
                            <th>Stripe Payment ID</th>
                            <th>Amount</th>
                            <th>Status</th>
                            <th>Created At</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="6" className="loader-cell">
                                    <img
                                        src="https://loading.io/assets/mod/spinner/spinner/lg.gif"
                                        alt="Loading..."
                                        className="loader-gif"
                                    />
                                </td>
                            </tr>
                        ) : paginatedPayments.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="no-data">
                                    No {selectedStatus} payments found
                                </td>
                            </tr>
                        ) : (
                            paginatedPayments.map((payment, index) => {
                                const normalized = normalizeStatus(payment.status);
                                const isEditable =
                                    normalized === "Pending" || normalized === "Rejected";
                                return (
                                    <tr key={payment.id || index}>
                                        <td>{startIndex + index + 1}</td>
                                        <td
                                            className="stripe-id"
                                            onClick={() => toggleFullId(payment.id)}
                                        >
                                            {payment.stripe_payment_id
                                                ? selectedId === payment.id
                                                    ? payment.stripe_payment_id
                                                    : payment.stripe_payment_id.slice(0, 8) + "..."
                                                : "N/A"}
                                        </td>
                                        <td>${payment.amount || "0.00"}</td>
                                        <td className={`status ${normalized.toLowerCase()}`}>
                                            {normalized}
                                        </td>
                                        <td>{payment.created_at || "Unknown date"}</td>
                                        <td>
                                            {isEditable ? (
                                                <select
                                                    value={normalized}
                                                    disabled={updatingId === payment.id}
                                                    onChange={(e) =>
                                                        updatePaymentStatus(payment.id, e.target.value)
                                                    }
                                                >
                                                    <option value="Pending">Pending</option>
                                                    <option value="Rejected">Rejected</option>
                                                    <option value="Paid">Paid</option>
                                                </select>
                                            ) : (
                                                "-"
                                            )}
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>

                <div className="pagination">
                    <button
                        className="pagination-btn"
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(currentPage - 1)}
                    >
                        Previous
                    </button>
                    <span className="page-info">
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        className="pagination-btn"
                        disabled={currentPage === totalPages || totalPages === 0}
                        onClick={() => setCurrentPage(currentPage + 1)}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Payments;
