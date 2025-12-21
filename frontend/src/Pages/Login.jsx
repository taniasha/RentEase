import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/login", formData);
      toast.success(res.data.message);
      // Redirect based on role
      console.log("Full login response:", res.data);
      
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", res.data.user.id);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("role", res.data.user.role);

      
     if (res.data.user.role === "tenant") {
        navigate("/tenant-dashboard");
      } else if (res.data.user.role === "landlord") {
        navigate("/landlord-dashboard");
      }
      // on login success
    }
    catch (err) {
    const message = err.response?.data?.message || "Something went wrong";
    toast.error(message); // will show on frontend
    console.log( message); // also logs in console
  }

  };

  return (
    <>
    <Navbar />
    <div className="container" style={{ marginTop: "10rem" }}>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body">
              <h3 className="card-title mb-4 text-center">Login</h3>
              {message && (
                <div className="alert alert-danger text-center">{message}</div>
              )}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn w-100"
                  style={{ backgroundColor: "rgb(20, 39, 56)", color: "#fff" }}
                >
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
  );
}
