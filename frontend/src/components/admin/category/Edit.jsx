import React, { useEffect, useState } from "react";
import Layout from "../../common/Layout";
import Sidebar from "../../common/Sidebar";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { adminToken, apiUrl } from "../../common/http";
import { toast } from "react-toastify";

const Edit = () => {
    const [loading, setLoading] = useState(false);
    const [fetchLoading, setFetchLoading] = useState(true);
    const { id } = useParams(); 
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        reset, 
        formState: { errors },
    } = useForm();

    // Fetch old data and pre-fill the form
    useEffect(() => {
        const fetchCategory = async () => {
            setFetchLoading(true);
            try {
                const res = await fetch(`${apiUrl}/categories/${id}`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${adminToken()}`,
                    },
                });
                const result = await res.json();
                
                if (result.status === 200) {
                    // This is what shows the old data in the inputs
                    reset(result.data); 
                } else {
                    toast.error("Category not found");
                    navigate("/admin/categories");
                }
            } catch (error) {
                console.error("Fetch Error:", error);
            } finally {
                setFetchLoading(false);
            }
        };

        fetchCategory();
    }, [id, reset, navigate]);

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            // Must use PUT to trigger the update method in Laravel
            const res = await fetch(`${apiUrl}/categories/${id}`, {
                method: "PUT", 
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${adminToken()}`,
                },
                body: JSON.stringify(data),
            });

            const result = await res.json();

            if (res.status === 200) {
                toast.success(result.message);
                navigate("/admin/categories");
            } else {
                toast.error(result.message || "Update failed");
            }
        } catch (error) {
            toast.error("An error occurred");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout>
            <div className="container">
                <div className="row">
                    <div className="d-flex justify-content-between mt-5 pb-3">
                        <h4 className="h4">Edit Category</h4>
                        <Link to="/admin/categories" className="btn btn-primary">Back</Link>
                    </div>
                    <div className="col-md-3">
                        <Sidebar />
                    </div>
                    <div className="col-md-9">
                        <div className="card shadow border-0">
                            <div className="card-body p-4">
                                {fetchLoading ? (
                                    <div className="text-center py-5">
                                        <div className="spinner-border text-primary"></div>
                                        <p className="mt-2">Loading data...</p>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <div className="mb-3">
                                            <label className="form-label">Category Name</label>
                                            <input
                                                {...register("name", { required: "Name is required" })}
                                                type="text"
                                                className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                                            />
                                            {errors.name && <p className="invalid-feedback">{errors.name.message}</p>}
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label">Status</label>
                                            <select {...register("status")} className="form-select">
                                                <option value="1">Active</option>
                                                <option value="0">Block</option>
                                            </select>
                                        </div>

                                        <button disabled={loading} className="btn btn-primary">
                                            {loading ? "Updating..." : "Update Category"}
                                        </button>
                                    </form>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Edit;