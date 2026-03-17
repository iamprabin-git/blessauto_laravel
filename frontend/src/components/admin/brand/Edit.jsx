import React, { useEffect, useState } from "react";
import Layout from "../../common/Layout";
import Sidebar from "../../common/Sidebar";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { adminToken, apiUrl } from "../../common/http";
import { toast } from "react-toastify";

const Edit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false); // For Submit button
    const [fetchLoading, setFetchLoading] = useState(true); // For initial data fetch
    
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    useEffect(() => {
        const fetchBrand = async () => {
            try {
                const res = await fetch(`${apiUrl}/brands/${id}`, {
                    headers: { "Authorization": `Bearer ${adminToken()}` }
                });
                const result = await res.json();
                if (res.ok) {
                    reset(result.data);
                } else {
                    toast.error("Brand not found");
                    navigate("/admin/brands");
                }
            } catch (error) {
                console.error(error);
            } finally {
                setFetchLoading(false);
            }
        };
        fetchBrand();
    }, [id, reset, navigate]);

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const res = await fetch(`${apiUrl}/brands/${id}`, {
                method: "PUT",
                headers: { 
                    "Content-Type": "application/json", 
                    "Authorization": `Bearer ${adminToken()}` 
                },
                body: JSON.stringify(data),
            });
            if (res.ok) {
                toast.success("Brand Updated Successfully");
                navigate("/admin/brands");
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
                        <h4 className="h4">Edit Brand</h4>
                        <Link to="/admin/brands" className="btn btn-primary">Back</Link>
                    </div>
                    <div className="col-md-3"><Sidebar /></div>
                    <div className="col-md-9">
                        <div className="card shadow border-0 p-4">
                            {fetchLoading ? (
                                <div className="text-center py-5">
                                    <div className="spinner-border text-primary" role="status"></div>
                                    <p className="mt-2">Fetching Brand Details...</p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className="mb-3">
                                        <label className="form-label">Brand Name</label>
                                        <input 
                                            {...register("name", { required: "Name is required" })} 
                                            className={`form-control ${errors.name ? 'is-invalid' : ''}`} 
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Status</label>
                                        <select {...register("status")} className="form-select">
                                            <option value="1">Active</option>
                                            <option value="0">Block</option>
                                        </select>
                                    </div>
                                    <button disabled={loading} className="btn btn-primary">
                                        {loading ? 'Updating...' : 'Update Brand'}
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};
export default Edit;