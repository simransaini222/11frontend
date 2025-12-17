import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Signup = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    sponsorId: "",
    side: "left",
    aadharNumber: "",
    contact: "",
  });

  const [sideMessage, setSideMessage] = useState("");
  const [disableSubmit, setDisableSubmit] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  //  Check sponsor's available side (left/right)
  const checkSide = async () => {
    if (!form.sponsorId) return;

    try {
      const res = await axios.post(`${API_URL}/api/getAvailableSide`, {
        sponsorId: form.sponsorId,
      });

      if (!res.data.success) {
        setSideMessage(res.data.message || "Both sides filled or invalid sponsor ID.");
        setDisableSubmit(true);
        return;
      }

      const availableSide = res.data.available;
      setSideMessage(`Available side: ${availableSide.toUpperCase()}`);
      setForm((prev) => ({ ...prev, side: availableSide }));
      setDisableSubmit(false);
    } catch (err) {
      console.error(err);
      setSideMessage("Invalid sponsor ID or server error.");
      setDisableSubmit(true);
    }
  };

  //  Handle registration
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (disableSubmit) {
      alert("Cannot submit. Both sides are filled or invalid sponsor ID.");
      return;
    }

    try {
      const res = await axios.post(`${API_URL}/api/joinUser`, form);

      if (res.data.success) {
        // alert("User registered successfully!");
        toast.success("User registered successfully !")
        setForm({
          name: "",
          email: "",
          password: "",
          sponsorId: "",
          side: "left",
          aadharNumber: "",
          contact: "",
        });
        setSideMessage("");
      } else {
        // alert(res.data.message || "Error occurred.");
        toast.error(res.data.message || "Error occurred.");
      }
    } catch (err) {
      console.error("Error submitting form:", err);
      // alert(err.response?.data?.message || "Something went wrong.");
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100 px-3"
      style={{
        backgroundImage: `
          url('https://www.shutterstock.com/image-photo/businesswomans-hand-filing-online-registration-600nw-2009313029.jpg'),
          radial-gradient(circle at top left, rgba(255, 183, 197, 0.6), transparent 40%),
          radial-gradient(circle at bottom right, rgba(183, 200, 255, 0.6), transparent 40%),
          linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)
        `,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundBlendMode: "overlay",
      }}
    >
    <ToastContainer/>
      <div
        className="card shadow-lg p-4 rounded-4 w-100"
        style={{
          maxWidth: "500px",
          backdropFilter: "blur(12px)",
          background: "rgba(160, 206, 221, 0.85)",
          border: "3px solid rgba(224, 17, 17, 0.3)",
        }}
      >
        <h3 className="text-center mb-4 text-primary fw-bold">Signup</h3>

        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input
              id="name"
              type="text"
              className="form-control"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          {/* Email */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              id="email"
              type="email"
              className="form-control"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password */}
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              id="password"
              type="password"
              className="form-control"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          {/* Sponsor ID */}
          <div className="mb-3">
            <label htmlFor="sponsorId" className="form-label">Sponsor ID</label>
            <input
              id="sponsorId"
              type="text"
              className="form-control"
              name="sponsorId"
              value={form.sponsorId}
              onChange={handleChange}
              onBlur={checkSide}
              required
            />
            {sideMessage && <p className="text-danger small mt-1">{sideMessage}</p>}
          </div>

          {/* Side */}
          <div className="mb-3">
            <label htmlFor="side" className="form-label">Side</label>
            <select
              id="side"
              className="form-select"
              name="side"
              value={form.side}
              onChange={handleChange}
            >
              <option value="left">Left</option>
              <option value="right">Right</option>
            </select>
          </div>

          {/* Aadhar */}
          <div className="mb-3">
            <label htmlFor="aadharNumber" className="form-label">Aadhar Number</label>
            <input
              id="aadharNumber"
              type="text"
              className="form-control"
              name="aadharNumber"
              value={form.aadharNumber}
              onChange={handleChange}
              pattern="\d{12}"
              title="Aadhar must be 12 digits"
              required
            />
          </div>

          {/* Contact */}
          <div className="mb-3">
            <label htmlFor="contact" className="form-label">Contact</label>
            <input
              id="contact"
              type="text"
              className="form-control"
              name="contact"
              value={form.contact}
              onChange={handleChange}
              pattern="\d{10}"
              title="Contact must be 10 digits"
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100 rounded-pill fw-bold"
            disabled={disableSubmit}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
