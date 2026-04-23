import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Incidents.css";

const API_URL = "http://localhost:8082/api/incidents";

const Incidents = () => {
    const [incidents, setIncidents] = useState([]);
    const [showDialog, setShowDialog] = useState(false);
    const [selectedDescription, setSelectedDescription] = useState("");

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

    const handleStatusChange = async (id, newStatus, oldStatus) => {
        const confirmChange = window.confirm(
            "Are you sure you want to change the status?"
        );

        if (!confirmChange) {
            setIncidents((prev) =>
                prev.map((item) =>
                    item.incident_id === id
                        ? { ...item, status: oldStatus }
                        : item
                )
            );
            return;
        }

        try {
            const token = localStorage.getItem("bearerToken");

            await axios.put(
                `${API_URL}/${id}`,
                { status: newStatus },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            fetchIncidents();
        } catch (err) {
            console.error("Update error:", err);
        }
    };

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

                                <td
                                    className={
                                        item.priority
                                            ? `priority-${item.priority.toLowerCase()}`
                                            : "priority-low"
                                    }
                                >
                                    {item.priority || "LOW"}
                                </td>

                                <td>{item.assigned_to}</td>

                                <td>
                                    {item.date_time
                                        ? new Date(item.date_time)
                                              .toLocaleString("en-GB", {
                                                  day: "2-digit",
                                                  month: "2-digit",
                                                  year: "numeric",
                                                  hour: "2-digit",
                                                  minute: "2-digit",
                                                  hour12: true,
                                              })
                                              .replace(",", " at")
                                        : "N/A"}
                                </td>

                                <td>
                                    <button
                                        className="view-btn"
                                        onClick={() =>
                                            openDialog(item.description)
                                        }
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
        </div>
    );
};

export default Incidents;