import React, { useState } from "react";
import Layout from "../../common/Layout";
import Sidebar from "../../common/Sidebar";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { adminToken, apiUrl } from "../../common/http";
import { toast } from "react-toastify";

const Create = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const res = await fetch(`${apiUrl}/brands`, {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json", 
                    "Authorization": `Bearer ${adminToken()}` 
                },
                body: JSON.stringify(data),
            });
            const result = await res.json();
            if (res.ok) {
                toast.success(result.message);
                navigate("/admin/brands");
            } else {
                toast.error(result.message || "Error creating brand");
            }
        } catch (error) {
            toast.error("An error occurred");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout>
            <div className="container mt-5">
                <div className="row">
                    <div className="d-flex justify-content-between pb-3">
                        <h4 className="h4">Create Brand</h4>
                        <Link to="/admin/brands" className="btn btn-primary">Back</Link>
                    </div>
                    <div className="col-md-3"><Sidebar /></div>
                    <div className="col-md-9">
                        <div className="card border-0 shadow">
                            <div className="card-body p-4">
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className="mb-3">
                                        <label className="form-label">Name</label>
                                        <input 
                                            {...register("name", { required: "Name is required" })} 
                                            className={`form-control ${errors.name ? 'is-invalid' : ''}`} 
                                        />
                                        {errors.name && <div className="invalid-feedback">{errors.name.message}</div>}
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Status</label>
                                        <select {...register("status")} className="form-select">
                                            <option value="1">Active</option>
                                            <option value="0">Block</option>
                                        </select>
                                    </div>
                                    <button disabled={loading} className="btn btn-primary">
                                        {loading ? (
                                            <>
                                                <span className="spinner-border spinner-border-sm me-2"></span>
                                                Saving...
                                            </>
                                        ) : 'Save Brand'}
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