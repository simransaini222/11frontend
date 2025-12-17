import React, { useEffect, useState } from "react";
import axios from "axios";

const GetAllUser = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
      
        const res = await axios.post("http://localhost:5000/api/getalluser");
        if (res.data.success) {
          setUsers(res.data.data);
        }
      } catch (err) {
        console.error("Error fetching users:", err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  if (loading) {
    return <h2 style={{ textAlign: "center", marginTop: "20px" }}>Loading...</h2>;
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>All Users</h1>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Name</th>
            <th style={styles.th}>User ID</th>
            <th style={styles.th}>Email</th>
            <th style={styles.th}>Contact</th>
            <th style={styles.th}>Sponsor ID</th>
            <th style={styles.th}>Parent</th>
            <th style={styles.th}>Left Child</th>
            <th style={styles.th}>Right Child</th>
            <th style={styles.th}>Wallet Balance</th>
            <th style={styles.th}>Joining Fee</th>
            <th style={styles.th}>Commission Earned</th>
            <th style={styles.th}>Role</th>
            <th style={styles.th}>Created At</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td style={styles.td}>{user.name}</td>
              <td style={styles.td}>{user.userId}</td>
              <td style={styles.td}>{user.email}</td>
              <td style={styles.td}>{user.contact}</td>
              <td style={styles.td}>{user.sponsorId}</td>

             
              <td style={styles.td}>
                {user.parent ? user.parent.sponsorId : "N/A"}
              </td>

          
              <td style={styles.td}>
                {user.leftChild ? user.leftChild.sponsorId : "N/A"}
              </td>
              <td style={styles.td}>
                {user.rightChild ? user.rightChild.sponsorId : "N/A"}
              </td>

              <td style={styles.td}>{user.walletBalance}</td>
              <td style={styles.td}>{user.joiningFee}</td>

     
              <td style={styles.td}>{user.commissionEarned}</td>

              <td style={styles.td}>{user.role}</td>
              <td style={styles.td}>
                {new Date(user.createdAt).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  container: {
    width: "100%",
    minHeight: "100vh",
    padding: "20px",
    backgroundColor: "#f8f9fa",
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px",
    fontSize: "28px",
    fontWeight: "bold",
    color: "#333",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    backgroundColor: "#fff",
    boxShadow: "0px 3px 8px rgba(0,0,0,0.1)",
  },
  th: {
    border: "1px solid #ddd",
    padding: "10px",
    backgroundColor: "#007bff",
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  td: {
    border: "1px solid #ddd",
    padding: "10px",
    textAlign: "center",
    fontSize: "14px",
    color: "#333",
  },
};

export default GetAllUser;
