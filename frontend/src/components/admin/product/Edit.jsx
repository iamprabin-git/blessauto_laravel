import React, { useState, useEffect, useRef, useCallback } from "react";
import Layout from "../../common/Layout";
import Sidebar from "../../common/Sidebar";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { adminToken, apiUrl } from "../../common/http";
import { toast } from "react-toastify";
import JoditEditor from "jodit-react";
import { FaTrash, FaCheckCircle, FaStar, FaUpload, FaArrowLeft } from "react-icons/fa";
import { AiOutlineCloudUpload } from "react-icons/ai";

const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const editor = useRef(null);

  // --- States ---
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [defaultImage, setDefaultImage] = useState(""); 
  const [productImages, setProductImages] = useState([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // --- Functions ---

  // Memoized data fetching to satisfy ESLint and prevent re-render loops
  const fetchInitialData = useCallback(async () => {
    const headers = { 
      Authorization: `Bearer ${adminToken()}`,
      Accept: "application/json" 
    };

    try {
      const [catRes, brandRes, prodRes] = await Promise.all([
        fetch(`${apiUrl}/categories`, { headers }),
        fetch(`${apiUrl}/brands`, { headers }),
        fetch(`${apiUrl}/products/${id}`, { headers }),
      ]);

      const catData = await catRes.json();
      const brandData = await brandRes.json();
      const prodData = await prodRes.json();

      if (catData.status === 200) setCategories(catData.data);
      if (brandData.status === 200) setBrands(brandData.data);
      
      if (prodData.status === 200) {
        reset(prodData.data);
        setContent(prodData.data.description || "");
        setDefaultImage(prodData.data.image || ""); 
        if (prodData.data.product_images) {
          setProductImages(prodData.data.product_images);
        }
      }
    } catch (err) {
      toast.error("Critical error: Could not load product data");
    }
  }, [id, reset]);

  useEffect(() => {
    fetchInitialData();
  }, [fetchInitialData]);

  // Handle Temporary Image Upload (Linked to your Laravel 'save-product-images' route)
  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);

    try {
      const res = await fetch(`${apiUrl}/save-product-images`, {
        method: "POST",
        headers: { Authorization: `Bearer ${adminToken()}` },
        body: formData,
      });
      const result = await res.json();
      
      if (result.status === 200) {
        setProductImages((prev) => [
          ...prev,
          { 
            id: result.data.id, 
            image_url: result.data.image_url,
            image: result.data.image_name // The raw filename returned by Laravel
          },
        ]);
        toast.success("New image staged for gallery");
      } else {
        toast.error(result.message || "Upload rejected by server");
      }
    } catch (err) {
      toast.error("Network error during upload");
    } finally {
      setUploading(false);
      e.target.value = null; 
    }
  };

  // Local Gallery Deletion
  const deleteImage = (index) => {
    const updated = productImages.filter((err, i) => i !== index);
    setProductImages(updated);
    toast.info("Image removed from selection");
  };

  // Set the Thumbnail (Primary Image)
  const changeImage = (img) => {
    // Priority: use explicit 'image' property, fallback to parsing filename from URL
    const fileName = img.image || img.image_url.split('/').pop();
    setDefaultImage(fileName);
    toast.success("Main thumbnail selected");
  };

  // Final Update Submit
  const updateProduct = async (data) => {
    setLoading(true);
    const imageIds = productImages.map((img) => img.id);

    const payload = {
      ...data,
      description: content,
      gallery: imageIds,
      status: data.status,
      main_image: defaultImage, 
    };

    try {
      const res = await fetch(`${apiUrl}/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${adminToken()}`,
        },
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      if (result.status === 200) {
        toast.success(result.message);
        navigate("/admin/products");
      } else {
        toast.error(result.message || "Update process failed");
      }
    } catch (err) {
      toast.error("Server connection lost");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container mt-5">
        <form onSubmit={handleSubmit(updateProduct)}>
          <div className="d-flex justify-content-between align-items-center pb-4">
            <h4 className="fw-bold mb-0">Edit Vehicle Detail</h4>
            <Link to="/admin/products" className="btn btn-outline-dark d-flex align-items-center">
              <FaArrowLeft className="me-2" /> Back to Inventory
            </Link>
          </div>

          <div className="row">
            <div className="col-md-3">
              <Sidebar />
            </div>
            
            <div className="col-md-9 pb-5">
              
              {/* SECTION: IDENTITY */}
              <div className="card shadow-sm border-0 p-4 mb-4 rounded-3">
                <h5 className="border-bottom pb-3 mb-3 fw-bold">Vehicle Identity</h5>
                <div className="row">
                  <div className="col-md-12 mb-3">
                    <label className="form-label fw-semibold">Title *</label>
                    <input
                      {...register("title", { required: "Title is required" })}
                      className={`form-control ${errors.title ? "is-invalid" : ""}`}
                      placeholder="e.g. 2024 Toyota Camry XLE"
                    />
                    {errors.title && <div className="invalid-feedback">{errors.title.message}</div>}
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-semibold">Category *</label>
                    <select {...register("category_id", { required: true })} className="form-select">
                      <option value="">Select Category</option>
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-semibold">Brand *</label>
                    <select {...register("brand_id", { required: true })} className="form-select">
                      <option value="">Select Brand</option>
                      {brands.map((brand) => (
                        <option key={brand.id} value={brand.id}>{brand.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* SECTION: GALLERY */}
              <div className="card shadow-sm border-0 p-4 mb-4 rounded-3">
                <h5 className="border-bottom pb-3 d-flex align-items-center mb-3 fw-bold">
                  <AiOutlineCloudUpload className="me-2 text-primary" size={24} /> Visual Gallery
                </h5>
                <div className="mb-4">
                  <label className="form-label fw-bold">Add New Photos</label>
                  <div className="input-group border rounded-3 overflow-hidden">
                    <input type="file" className="form-control border-0" onChange={handleFile} disabled={uploading} />
                    <span className="input-group-text bg-primary text-white border-0"><FaUpload /></span>
                  </div>
                  {uploading && (
                    <div className="text-primary mt-2 small d-flex align-items-center">
                      <div className="spinner-border spinner-border-sm me-2" role="status"></div>
                      Optimizing and uploading image...
                    </div>
                  )}
                </div>

                <div className="row g-3">
                  {productImages.length > 0 ? productImages.map((productImage, index) => {
                    const isMain = productImage.image_url.includes(defaultImage) || (productImage.image && productImage.image === defaultImage);
                    return (
                      <div className="col-md-4 col-xl-3" key={index}>
                        <div className={`card h-100 border-2 transition-all ${isMain ? 'border-primary shadow' : 'border-light'}`}>
                          <div className="position-relative">
                            <img src={productImage.image_url} alt="product" className="card-img-top" style={{ height: '140px', objectFit: 'cover' }} />
                            {isMain && (
                              <div className="position-absolute top-0 start-0 m-2 bg-white rounded-circle p-1 shadow-sm d-flex border border-primary">
                                <FaStar className="text-warning" size={18} />
                              </div>
                            )}
                            <button 
                              type="button" 
                              className="btn btn-danger btn-sm position-absolute top-0 end-0 m-2 shadow-sm d-flex align-items-center justify-content-center" 
                              onClick={() => deleteImage(index)}
                              style={{ borderRadius: '50%', width: '30px', height: '30px' }}
                            >
                              <FaTrash size={12}/>
                            </button>
                          </div>
                          <div className="card-body p-2 bg-white">
                            <button 
                              type="button" 
                              className={`btn btn-sm w-100 fw-bold d-flex align-items-center justify-content-center ${isMain ? 'btn-success disabled' : 'btn-outline-primary'}`} 
                              onClick={() => changeImage(productImage)}
                            >
                              {isMain ? <><FaCheckCircle className="me-1" /> Primary Photo</> : 'Make Primary'}
                            </button>
                          </div>
                        </div>
                      </div>
                    )
                  }) : (
                    <div className="col-12 py-4 text-center text-muted border border-dashed rounded">
                      No images in gallery. Upload at least one.
                    </div>
                  )}
                </div>
              </div>

              {/* SECTION: SPECS */}
              <div className="card shadow-sm border-0 p-4 mb-4 rounded-3">
                <h5 className="border-bottom pb-3 mb-3 fw-bold">Pricing & Status</h5>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-semibold">Asking Price (USD) *</label>
                    <input type="number" {...register("price", { required: true })} className="form-control" placeholder="0.00" />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-semibold">Inventory Status</label>
                    <select {...register("status")} className="form-select">
                      <option value="1">Available</option>
                      <option value="0">Sold / Hidden</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* SECTION: DESCRIPTION */}
              <div className="card shadow-sm border-0 p-4 mb-4 rounded-3">
                <h5 className="border-bottom pb-3 mb-3 fw-bold">Full Vehicle Description</h5>
                <JoditEditor 
                  ref={editor} 
                  value={content} 
                  config={{ readonly: false, height: 300 }}
                  onBlur={(newContent) => setContent(newContent)} 
                />
              </div>

              {/* ACTION: SUBMIT */}
              <button 
                type="submit" 
                disabled={loading || uploading} 
                className="btn btn-primary btn-lg w-100 mb-5 shadow rounded-pill py-3 fw-bold"
              >
                {loading ? (
                  <><span className="spinner-border spinner-border-sm me-2"></span> Updating Database...</>
                ) : (
                  "Commit Changes to Inventory"
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Edit;