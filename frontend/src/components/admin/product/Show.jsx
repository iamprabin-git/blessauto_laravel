import React, { useEffect, useState, useCallback } from "react";
import Layout from "../../common/Layout";
import Sidebar from "../../common/Sidebar";
import { Link } from "react-router-dom";
import { adminToken, apiUrl } from "../../common/http";
import { toast } from "react-toastify";

const Show = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  // Wrapped in useCallback to prevent "cascading renders" and satisfy ESLint
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/products`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          Authorization: `Bearer ${adminToken()}`,
        },
      });
      
      const result = await response.json();
      
      if (response.ok && result.status === 200) {
        setProducts(result.data);
      } else {
        toast.error("Failed to fetch products");
      }
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  }, []); // Empty dependency array means this function is created once

  const deleteProduct = async (id) => {
    if (window.confirm("Are you sure you want to remove this vehicle?")) {
      try {
        const response = await fetch(`${apiUrl}/products/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${adminToken()}`,
          },
        });
        
        if (response.ok) {
          toast.success("Vehicle deleted successfully");
          setProducts((prev) => prev.filter((prod) => prod.id !== id));
        }
      } catch (err) {
        console.error("Delete error:", err);
        toast.error("An error occurred during deletion");
      }
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]); // Now depends on the memoized function


  return (
    <Layout>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-3">
            <Sidebar />
          </div>
          <div className="col-md-9 pb-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h4 className="h4 mb-0">Vehicle Inventory</h4>
              <Link to="/admin/products/create" className="btn btn-primary shadow-sm">
                + Add New Vehicle
              </Link>
            </div>

            <div className="card shadow border-0">
              <div className="card-body p-0">
                {loading ? (
                  <div className="text-center py-5">
                    <div className="spinner-border text-primary" role="status"></div>
                    <div className="mt-2 text-muted">Loading Inventory...</div>
                  </div>
                ) : products.length === 0 ? (
                  <div className="text-center py-5 text-muted">No vehicles found.</div>
                ) : (
                  <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0">
                      <thead className="table-light">
                        <tr>
                          <th>ID</th>
                          <th>Image</th>
                          <th>Vehicle Name</th>
                          <th>Vehicle Type</th>
                          <th>Model Year</th>
                          <th>Engine Capacity</th>
                          <th>Price</th>
                          <th>Status</th>
                          <th className="text-center">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {products.map((product) => (
                          <tr key={product.id}>
                            <td className="text-muted">#{product.id}</td>
                            <td>
                              <img
                                src={product.image_url}
                                alt={product.title}
                                className="img-fluid rounded shadow-sm w-50"
                                style={{ maxWidth: "100px" }}
                              />
                            </td>
                            <td>
                              <div className="fw-bold">{product.title}</div>
                              
                            </td>
                            <td>{product.type}</td>
                            <td>{product.model_year}</td>
                            <td>{product.engine_capacity}</td>
                            <td>
                              <div className="fw-bold text-dark">Rs. {Number(product.price).toLocaleString()}</div>
                            </td>
                            <td>
                              <span className={`badge rounded-pill ${product.status == 1 ? "bg-success-subtle text-success" : "bg-danger-subtle text-danger"}`}>
                                {product.status == 1 ? "Active" : "Inactive"}
                              </span>
                            </td>
                            <td className="text-center">
                              <Link to={`/admin/products/edit/${product.id}`} className="btn btn-outline-primary btn-sm me-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
                                  <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                                </svg>
                              </Link>
                              <button onClick={() => deleteProduct(product.id)} className="btn btn-outline-danger btn-sm">
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
                                  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                  <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                                </svg>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Show;