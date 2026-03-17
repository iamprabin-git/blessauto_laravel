import React, { useEffect, useState, useCallback } from "react";
import Layout from "../../common/Layout";
import Sidebar from "../../common/Sidebar";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { adminToken, apiUrl } from "../../common/http";
import { toast } from "react-toastify";
import JoditEditor from "jodit-react";

const Edit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [images, setImages] = useState([]); 
    const [tempImageIds, setTempImageIds] = useState([]); 
    const [loading, setLoading] = useState(false);
    const [content, setContent] = useState("");

    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const fetchData = useCallback(async () => {
        try {
            const headers = { 
                Authorization: `Bearer ${adminToken()}`,
                Accept: "application/json" 
            };
            
            const [resCat, resBrand, resProd] = await Promise.all([
                fetch(`${apiUrl}/categories`, { headers }),
                fetch(`${apiUrl}/brands`, { headers }),
                fetch(`${apiUrl}/products/${id}`, { headers })
            ]);

            const resultCat = await resCat.json();
            const resultBrand = await resBrand.json();
            const resultProd = await resProd.json();

            if (resProd.ok) {
                const p = resultProd.data;
                setCategories(resultCat.data || []);
                setBrands(resultBrand.data || []);
                setImages(p.product_images || []);
                
                // Initialize form with existing data
                reset({
                    title: p.title || "",
                    category_id: p.category_id || "",
                    brand_id: p.brand_id || "",
                    type: p.type || "car",
                    model_year: p.model_year || "",
                    kilometers_run: p.kilometers_run || "",
                    fuel_type: p.fuel_type || "",
                    transmission: p.transmission || "",
                    condition: p.condition || "",
                    engine_capacity: p.engine_capacity || "",
                    price: p.price || "",
                    discount_price: p.discount_price || "",
                    status: p.status ?? 1,
                    is_featured: p.is_featured || "no",
                    registration_number: p.registration_number || "",
                    ownership_number: p.ownership_number || "",
                });
                setContent(p.description || "");
            }
        } catch (error) {
            console.error("Fetch Data Error:", error);
            toast.error("Error loading vehicle data");
        }
    }, [id, reset]); 

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleImageUpload = async (e) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        const formData = new FormData();
        for (let i = 0; i < files.length; i++) {
            formData.append("image", files[i]);
        }

        try {
            const res = await fetch(`${apiUrl}/temp-images`, {
                method: "POST",
                headers: { Authorization: `Bearer ${adminToken()}` },
                body: formData
            });
            const result = await res.json();
            if (res.ok) {
                setTempImageIds(prev => [...prev, result.data.id]);
                toast.info("New image staged");
            }
        } catch (err) {
            console.error("Upload Error:", err);
            toast.error("Image upload failed");
        }
    };

    const deleteImage = async (imageId) => {
        if (!window.confirm("Delete this image?")) return;
        try {
            const res = await fetch(`${apiUrl}/product-images/${imageId}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${adminToken()}` }
            });
            if (res.ok) {
                setImages(images.filter(img => img.id !== imageId));
                toast.success("Image removed");
            }
        } catch (err) {
            console.error("Delete Image Error:", err);
            toast.error("Could not delete image");
        }
    };

    const onSubmit = async (data) => {
        setLoading(true);
        const formData = new FormData();
        
        // FIX: Sanitize "null" strings or empty values for decimals/integers
        const sanitizedData = {
            ...data,
            discount_price: (data.discount_price === "null" || !data.discount_price) ? "" : data.discount_price,
            price: data.price || 0,
            ownership_number: (data.ownership_number === "null" || !data.ownership_number) ? "" : data.ownership_number,
        };

        // Append fields to FormData
        Object.keys(sanitizedData).forEach(key => {
            if (sanitizedData[key] !== null && sanitizedData[key] !== undefined) {
                formData.append(key, sanitizedData[key]);
            }
        });

        formData.append("description", content);
        formData.append("_method", "PUT"); // Important for Laravel PUT requests via FormData

        // Append new images to gallery array
        tempImageIds.forEach(tempId => {
            formData.append("gallery[]", tempId);
        });

        try {
            const res = await fetch(`${apiUrl}/products/${id}`, {
                method: "POST", // Standard practice: POST with _method PUT for multipart
                headers: { 
                    Authorization: `Bearer ${adminToken()}`, 
                    Accept: "application/json" 
                },
                body: formData
            });

            const result = await res.json();

            if (res.ok) {
                toast.success("Vehicle Updated Successfully");
                navigate("/admin/products");
            } else {
                console.error("Update Validation/Server Error:", result);
                toast.error(result.message || "Update Failed");
            }
        } catch (err) {
            console.error("Network/Submit Error:", err);
            toast.error("Network error occurred");
        } finally {
            setLoading(false);
        }
    };

   

    return (
        <Layout>
            <div className="container mt-5">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="row">
                        <div className="col-md-3"><Sidebar /></div>
                        <div className="col-md-9 pb-5">
                            <div className="card p-4 shadow-sm border-0">
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <h5 className="mb-0 fw-bold">Edit Vehicle Details</h5>
                                    <Link to="/admin/products" className="btn btn-sm btn-outline-secondary">Back</Link>
                                </div>
                                <hr />
                                
                                <div className="mb-4">
                                    <label className="fw-bold mb-2">Vehicle Gallery</label>
                                    <div className="d-flex flex-wrap gap-2 mb-3">
                                        {images.map(img => (
                                            <div key={img.id} className="position-relative">
                                                <img 
                                                    src={img.image_url} 
                                                    alt="preview" 
                                                    className="rounded border shadow-sm" 
                                                    style={{ width: '100px', height: '80px', objectFit: 'cover' }} 
                                                />
                                                <button 
                                                    type="button"
                                                    onClick={() => deleteImage(img.id)}
                                                    className="btn btn-danger btn-sm position-absolute top-0 end-0 py-0 px-1"
                                                    style={{ fontSize: '10px', borderRadius: '50%' }}
                                                >✕</button>
                                            </div>
                                        ))}
                                    </div>
                                    <input type="file" multiple className="form-control" onChange={handleImageUpload} />
                                    <small className="text-muted">Adding files here will add them to the existing gallery.</small>
                                </div>
                                
                                <div className="row">
                                    <div className="col-md-12 mb-3">
                                        <label>Vehicle Title *</label>
                                        <input {...register("title", { required: true })} className={`form-control ${errors.title ? 'is-invalid' : ''}`} />
                                    </div>

                                    <div className="col-md-6 mb-3">
                                        <label>Category</label>
                                        <select {...register("category_id")} className="form-select">
                                            {categories.map(cat => (
                                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="col-md-6 mb-3">
                                        <label>Brand</label>
                                        <select {...register("brand_id")} className="form-select">
                                            {brands.map(brand => (
                                                <option key={brand.id} value={brand.id}>{brand.name}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="col-md-4 mb-3">
                                        <label>Price (Rs) *</label>
                                        <input type="number" {...register("price", { required: true })} className="form-control" />
                                    </div>

                                    <div className="col-md-4 mb-3">
                                        <label>Discount Price</label>
                                        <input type="number" {...register("discount_price")} className="form-control" placeholder="Optional" />
                                    </div>

                                    <div className="col-md-4 mb-3">
                                        <label>Status</label>
                                        <select {...register("status")} className="form-select">
                                            <option value="1">Active</option>
                                            <option value="0">Inactive</option>
                                        </select>
                                    </div>

                                    <div className="col-md-12 mb-3">
                                        <label className="mb-2">Description</label>
                                        <JoditEditor value={content} onBlur={c => setContent(c)} />
                                    </div>
                                </div>
                                <button className="btn btn-primary w-100 py-2 mt-3 shadow-sm fw-bold" disabled={loading}>
                                    {loading ? "Updating..." : "Update Vehicle"}
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </Layout>
    );
};

export default Edit;