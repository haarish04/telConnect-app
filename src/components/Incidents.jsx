import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Incidents.css";

const API_URL = "http://localhost:8082/api/incidents";

const Incidents = () => {
    const [incidents, setIncidents] = useState([]);

    // description popup
    const [showDialog, setShowDialog] = useState(false);
    const [selectedDescription, setSelectedDescription] = useState("");

    // status confirmation popup
    const [showConfirm, setShowConfirm] = useState(false);
    const [pendingStatus, setPendingStatus] = useState(null);

    const fetchIncidents = async () => {
        try {
            const token = localStorage.getItem("bearerToken");
            const res = await axios.get(API_URL, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setIncidents(res.data);
        } catch (err) {
            console.error("Error fetching incidents:", err);
        }
    };

    useEffect(() => {
        fetchIncidents();
    }, []);

    // open confirmation popup
    const handleStatusChange = (id, newStatus, oldStatus) => {
        setPendingStatus({ id, newStatus, oldStatus });
        setShowConfirm(true);
    };

    // user clicks YES
    const confirmStatusChange = async () => {
        try {
            const token = localStorage.getItem("bearerToken");

            await axios.put(
                `${API_URL}/${pendingStatus.id}`,
                { status: pendingStatus.newStatus },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            fetchIncidents();
        } catch (err) {
            console.error("Update error:", err);
        } finally {
            setShowConfirm(false);
            setPendingStatus(null);
        }
    };

    // user clicks NO
    const cancelStatusChange = () => {
        setIncidents((prev) =>
            prev.map((item) =>
                item.incident_id === pendingStatus.id
                    ? { ...item, status: pendingStatus.oldStatus }
                    : item
            )
        );
        setShowConfirm(false);
        setPendingStatus(null);
    };

    // description popup
    const openDialog = (description) => {
        setSelectedDescription(description || "No description available");
        setShowDialog(true);
    };

    const closeDialog = () => {
        setShowDialog(false);
        setSelectedDescription("");
    };

    return (
        <div className="incidents-container">
            <h2 className="incidents-title">Incidents</h2>

            <table className="incidents-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Customer ID</th>
                        <th>Priority</th>
                        <th>Assigned To</th>
                        <th>Date</th>
                        <th>Description</th>
                        <th>Status</th>
                    </tr>
                </thead>

                <tbody>
                    {incidents.length > 0 ? (
                        incidents.map((item) => (
                            <tr key={item.incident_id}>
                                <td>{item.incident_id}</td>
                                <td>{item.customer_id || "N/A"}</td>

                                <td className={`priority-${item.priority?.toLowerCase() || "low"}`}>
                                    {item.priority || "LOW"}
                                </td>

                                <td>{item.assigned_to}</td>

                                <td>
                                    {item.date_time
                                        ? new Date(item.date_time)
                                              .toLocaleString("en-GB")
                                              .replace(",", " at")
                                        : "N/A"}
                                </td>

                                <td>
                                    <button
                                        className="view-btn"
                                        onClick={() => openDialog(item.description)}
                                    >
                                        View
                                    </button>
                                </td>

                                <td>
                                    <select
                                        className="status-select"
                                        value={item.status}
                                        onChange={(e) =>
                                            handleStatusChange(
                                                item.incident_id,
                                                e.target.value,
                                                item.status
                                            )
                                        }
                                    >
                                        <option value="OPEN">OPEN</option>
                                        <option value="CLOSED">CLOSED</option>
                                    </select>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7">No incidents found</td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Description Popup */}
            {showDialog && (
                <div className="dialog-overlay">
                    <div className="dialog-box">
                        <h3>Incident Description</h3>
                        <p>{selectedDescription}</p>
                        <button className="close-btn" onClick={closeDialog}>
                            Close
                        </button>
                    </div>
                </div>
            )}

            {/* Status Confirmation Popup */}
            {showConfirm && (
                <div className="dialog-overlay">
                    <div className="dialog-box">
                        <h3>Confirm Status Change</h3>
                        <p>Are you sure you want to change the status?</p>

                        <div className="confirm-actions">
                            <button className="yes-btn" onClick={confirmStatusChange}>
                                Yes
                            </button>
                            <button className="no-btn" onClick={cancelStatusChange}>
                                No
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Incidents;