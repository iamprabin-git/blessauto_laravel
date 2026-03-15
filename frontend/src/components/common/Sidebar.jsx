import React from "react";
import { useContext } from "react";
import { AdminAuthContext } from "../context/AdminAuth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Sidebar = () => {
    const { logout } = useContext(AdminAuthContext);
    const navigate = useNavigate();

    const handleLogout = (e) => {
        e.preventDefault();
        logout();
        navigate("/admin/login");
    };
  return (
    <div className="card shadow mb-5 sidebar">
      <div className="card-body p-4">
        <ul>
          <li>
            <a href="">Dashboard</a>
          </li>
          <li>
            <Link to="/admin/categories">Categories</Link>
          </li>
          <li>
            <Link to="/admin/brands">Brands</Link>
          </li>
          <li>
            <Link to="/admin/products">Products</Link>
          </li>
          
          <li>
            <a href="">Users</a>
          </li>
          
          <li>
            <a href="">Change Password</a>
          </li>
          <li>
            <a href="#" onClick={handleLogout}>
              Logout
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
