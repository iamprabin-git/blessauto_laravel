import React, { useEffect, useState } from "react";
import Layout from "../../common/Layout";
import Sidebar from "../../common/Sidebar";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { adminToken, apiUrl } from "../../common/http";
import { toast } from "react-toastify";

const Create = () => {
    const [loading, setLoading] = useState(false);
    const { id } = useParams(); // If this exists, we are in Edit mode
    const isEditMode = !!id; 
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    // 1. Fetch Data if in Edit Mode
    useEffect(() => {
        if (isEditMode) {
            const fetchCategory = async () => {
                try {
                    const res = await fetch(`${apiUrl}/categories/${id}`, {
                        method: "GET",
                        headers: {
                            "Authorization": `Bearer ${adminToken()}`,
                        },
                    });
                    const result = await res.json();
                    if (result.status === 200) {
                        reset(result.data); // Pre-fill the form
                    } else {
                        toast.error("Category not found");
                        navigate("/admin/categories");
                    }
                } catch (error) {
                    console.error("Error fetching category:", error);
                }
            };
            fetchCategory();
        }
    }, [id, isEditMode, reset, navigate]);

    // 2. Handle Submit (POST for Create, PUT for Update)
    const onSubmit = async (data) => {
        setLoading(true);
        const url = isEditMode ? `${apiUrl}/categories/${id}` : `${apiUrl}/categories`;
        const method = isEditMode ? "PUT" : "POST";

        try {
            const res = await fetch(url, {
                method: method,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${adminToken()}`,
                },
                body: JSON.stringify(data),
            });

            const result = await res.json();

            if (res.ok) {
                toast.success(result.message);
                navigate("/admin/categories");
            } else {
                toast.error(result.message || "Something went wrong");
            }
        } catch (error) {
            toast.error("Network error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout>
            <div className="container">
                <div className="row">
                    <div className="d-flex justify-content-between mt-5 pb-3">
                        {/* Dynamic Title */}
                        <h4 className="h4">{isEditMode ? "Edit Category" : "Create Category"}</h4>
                        <Link to="/admin/categories" className="btn btn-primary">Back</Link>
                    </div>
                    <div className="col-md-3">
                        <Sidebar />
                    </div>
                    <div className="col-md-9">
                        <div className="card shadow border-0">
                            <div className="card-body p-4">
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className="mb-3">
                                        <label className="form-label">Name</label>
                                        <input
                                            {...register("name", { required: "Category name is required" })}
                                            type="text"
                                            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                                            placeholder="Category Name"
                                        />
                                        {errors.name && <p className="invalid-feedback">{errors.name.message}</p>}
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">Status</label>
                                        <select
                                            {...register("status")}
                                            className="form-control"
                                        >
                                            <option value="1">Active</option>
                                            <option value="0">Block</option>
                                        </select>
                                    </div>

                                    {/* Dynamic Button Text */}
                                    <button disabled={loading} className="btn btn-primary">
                                        {loading ? (
                                            <>
                                                <span className="spinner-border spinner-border-sm me-2"></span>
                                                Processing...
                                            </>
                                        ) : (
                                            isEditMode ? "Update" : "Create"
                                        )}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Create;