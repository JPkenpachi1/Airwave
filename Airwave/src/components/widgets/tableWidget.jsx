import React, { useEffect, useState } from "react";
import axios from "axios";
import axiosInstance from "../../config/axios";

const ComplaintTable = () => {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
   axiosInstance
      .get("/complaints/") // Replace with your API URL
      .then((response) => {
        setComplaints(response.data.slice(0, 3)); // Get only the first 3 records
      })
      .catch((error) => console.error("Error fetching complaints:", error));
  }, []);

  // Function to return class based on status
  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case "open":
        return "status-open";
      case "resolved":
        return "status-resolved";
      case "in-progress":
        return "status-inprogress";
      default:
        return "";
    }
  };

  return (
    <div className="DonutChart">
      <table className="complaintTable">
        <thead>
          <tr>
            <th>Name</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {complaints.map((complaint, index) => (
            <tr key={index}>
              <td>
                <label className="complaint-label">
                  {complaint.name}
                </label>
              </td>
              <td>
                <label className="complaint-label">
                  {complaint.date}
                </label>
              </td>
              <td style={{display:'flex',justifyContent:'center'}}>
                <label className={`complaint-label ${getStatusClass(complaint.status)}`}>
                  {complaint.status}
                </label>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ComplaintTable;
