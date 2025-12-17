import React, { useState } from "react";
import axios from "axios";

const CreateWallet = () => {
  const [formData, setFormData] = useState({
    sponsorId: "",
    amount: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/creditwallet",
        formData
      );
      console.log(res.data);
      alert(res.data.message || "Amount successfully credited in the wallet");
    } catch (err) {
      console.log(err);
      alert("Something went wrong!");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>💳 Credit Wallet</h2>
        <p style={styles.subtitle}>Enter sponsor ID and amount to credit wallet</p>

        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            name="sponsorId"
            placeholder="Enter your sponsorId"
            value={formData.sponsorId}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <input
            type="number"
            name="amount"
            placeholder="Enter your amount"
            value={formData.amount}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <button type="submit" style={styles.button}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

// Styling with modern UI
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    background: "linear-gradient(135deg, #6a11cb, #2575fc)",
    padding: "20px",
  },
  card: {
    width: "100%",
    maxWidth: "420px",
    background: "rgba(255, 255, 255, 0.12)",
    backdropFilter: "blur(15px)",
    padding: "35px",
    borderRadius: "20px",
    boxShadow: "0 8px 25px rgba(0, 0, 0, 0.25)",
    textAlign: "center",
    color: "#fff",
  },
  title: {
    fontSize: "28px",
    fontWeight: "bold",
    marginBottom: "5px",
  },
  subtitle: {
    fontSize: "15px",
    marginBottom: "20px",
    color: "#ddd",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  input: {
    padding: "14px",
    borderRadius: "12px",
    border: "none",
    outline: "none",
    fontSize: "16px",
    background: "rgba(255,255,255,0.85)",
    boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
  },
  button: {
    padding: "14px",
    borderRadius: "12px",
    border: "none",
    background: "linear-gradient(135deg, #6a11cb, #2575fc)",
    color: "#fff",
    fontSize: "18px",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  signupText: {
    marginTop: "15px",
    fontSize: "14px",
    color: "#eee",
  },
  link: {
    color: "#fff",
    fontWeight: "bold",
    textDecoration: "underline",
  },
};

// Add hover effect via inline style (optional)
styles.button[":hover"] = {
  transform: "scale(1.05)",
};

export default CreateWallet;
