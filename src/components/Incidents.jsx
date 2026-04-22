import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Incidents.css";

const API_URL = "http://localhost:8082/api/incidents";

const Incidents = () => {
    const [incidents, setIncidents] = useState([]);

    const fetchIncidents = async () => {
        try {
            const token = localStorage.getItem("bearerToken");

            const res = await axios.get(API_URL, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log(res.data); // debug
            setIncidents(res.data);
        } catch (err) {
            console.error("Error fetching incidents:", err);
        }
    };

    useEffect(() => {
        fetchIncidents();
    }, []);

    const handleDelete = async (id) => {
        try {
            const token = localStorage.getItem("bearerToken");

            await axios.delete(`${API_URL}/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            fetchIncidents();
        } catch (err) {
            console.error("Delete error:", err);
        }
    };

    // 🔹 Update status
    const handleStatusChange = async (id, newStatus, oldStatus) => {
        const confirmChange = window.confirm(
            "Are you sure you want to change the status?"
        );

        if (!confirmChange) {
            // revert status in UI
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
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            fetchIncidents();
        } catch (err) {
            console.error("Update error:", err);
        }
    };


    return (
        <div className="incidents-container">
            <h2 className="incidents-title">Incidents</h2>

            <table className="incidents-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>CustomerID</th>
                        <th>Priority</th>
                        <th>Assigned TO</th>
                        <th>Date</th>
                        <th>Update Status</th>
                        {/* <th>Delete Incident</th> */}
                    </tr>
                </thead>

                <tbody>
                    {incidents.length > 0 ? (
                        incidents.map((item) => (
                            <tr key={item.incident_id}>
                                <td>{item.incident_id}</td>
                                <td>{item.customer_id ? item.customer_id : "N/A"}</td>


                                <td
                                    className={
                                        item.priority
                                            ? `priority-${item.priority.toLowerCase()}`
                                            : "priority-low"
                                    }
                                >
                                    {item.priority ? item.priority : "LOW"}
                                </td>

                                <td>{item.assigned_to}</td>
                                <td>
                                    {item.date_time
                                        ? new Date(item.date_time).toLocaleString("en-GB", {
                                            day: "2-digit",
                                            month: "2-digit",
                                            year: "numeric",
                                            hour: "2-digit",
                                            minute: "2-digit",
                                            hour12: true
                                        }).replace(",", " at")
                                        : "N/A"}
                                </td>
                                        
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

                                {/* <td>
                                    <button
                                        className="delete-btn"
                                        onClick={() => handleDelete(item.incident_id)}
                                    >
                                        Delete
                                    </button>
                                </td> */}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="8">No incidents found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Incidents;
