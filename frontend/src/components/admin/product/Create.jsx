import React, { useEffect, useState, useRef, useMemo } from "react";
import Layout from "../../common/Layout";
import Sidebar from "../../common/Sidebar";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { adminToken, apiUrl } from "../../common/http";
import { toast } from "react-toastify";
import JoditEditor from "jodit-react";

const Create = ({ placeholder }) => {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [galleryImages, setGalleryImages] = useState([]);
  const navigate = useNavigate();

  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: placeholder || "",
    }),
    [placeholder],
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const saveProduct = async (data) => {
    const formData = { ...data, description: content, gallery: gallery };
    setDisabled(true);
    const res = await fetch(`${apiUrl}/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${adminToken()}`,
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((result) => {
        setDisabled(false);
        if (result.status === 200) {
          toast.success(result.message);
          navigate("/admin/products");
        } else {
          console.log("something went wrong");
        }
      });
  };

  const fetchCategories = async () => {
    const res = await fetch(`${apiUrl}/categories`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${adminToken()}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setCategories(result.data);
        if (result.status === 200) {
          return result.data;
        } else {
          console.log("something went wrong");
        }
      });
  };

  const fetchBrands = async () => {
    const res = await fetch(`${apiUrl}/brands`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${adminToken()}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setBrands(result.data);
        if (result.status === 200) {
          return result.data;
        } else {
          console.log("something went wrong");
        }
      });
  };

  const handleFile = (e) => {
    const formData = new FormData();
    const file = e.target.files[0];
    formData.append("image", file);
    setDisabled(true);
    setUploading(true);
    fetch(`${apiUrl}/temp-images`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${adminToken()}`,
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((result) => {
        gallery.push(result.data.id);
        setGallery(gallery);

        galleryImages.push(result.data.image_url);
        setGalleryImages(galleryImages);
        setUploading(false);
        setDisabled(false);
        e.target.value = "";
        if (result.status === 200) {
          toast.success(result.message);
        } else {
          console.log("something went wrong");
        }
      });
  };

  const deleteImage= (image)=>{
    const newGallery= galleryImages.filter(gallery => gallery !== image);
    setGalleryImages(newGallery);
  }

  useEffect(() => {
    fetchCategories();
    fetchBrands();
  }, []);

  return (
    <Layout>
      <div className="container mt-5">
        <form onSubmit={handleSubmit(saveProduct)}>
          <div className="d-flex justify-content-between pb-3 align-items-center">
            <h4 className="mb-0">Add New Vehicle</h4>
            <Link
              to="/admin/products"
              className="btn btn-outline-primary shadow-sm"
            >
              Back
            </Link>
          </div>

          <div className="row">
            <div className="col-md-3">
              <Sidebar />
            </div>
            <div className="col-md-9 pb-5">
              {/* --- Vehicle Basic Info --- */}
              <div className="card shadow-sm border-0 p-4 mb-4">
                <h5 className="mb-3 border-bottom pb-2">Vehicle Identity</h5>
                <div className="row">
                  <div className="col-md-12 mb-3">
                    <label className="form-label">Title</label>
                    <input
                      {...register("title", { required: "Title is required" })}
                      className={`form-control ${errors.title ? "is-invalid" : ""}`}
                      placeholder="e.g. Toyota Corolla Altis"
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Category </label>
                    <select
                      {...register("category_id", { required: true })}
                      className="form-select"
                    >
                      <option value="">Select Category</option>
                      {categories &&
                        categories.map((category) => {
                          return (
                            <option
                              key={`category-${category.id}`}
                              value={category.id}
                            >
                              {category.name}
                            </option>
                          );
                        })}
                    </select>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Brand </label>
                    <select
                      {...register("brand_id", { required: true })}
                      className="form-select"
                    >
                      <option value="">Select Brand</option>
                      {brands &&
                        brands.map((brand) => {
                          return (
                            <option key={`brand-${brand.id}`} value={brand.id}>
                              {brand.name}
                            </option>
                          );
                        })}
                    </select>
                  </div>
                </div>
              </div>

              {/* --- Technical Specs --- */}
              <div className="card shadow-sm border-0 p-4 mb-4">
                <h5 className="mb-3 border-bottom pb-2">Technical Specs</h5>
                <div className="row">
                  <div className="col-md-4 mb-3">
                    <label className="form-label">Type</label>
                    <select {...register("type")} className="form-select">
                      <option value="car">Car</option>
                      <option value="bike">Bike</option>
                    </select>
                  </div>
                  <div className="col-md-4 mb-3">
                    <label className="form-label">Model Year </label>
                    <input
                      {...register("model_year", { required: true })}
                      className="form-control"
                      placeholder="2023"
                    />
                  </div>
                  <div className="col-md-4 mb-3">
                    <label className="form-label">Engine Capacity </label>
                    <input
                      {...register("engine_capacity", { required: true })}
                      className="form-control"
                      placeholder="1500cc / 1.5L"
                    />
                  </div>
                  <div className="col-md-4 mb-3">
                    <label className="form-label">Fuel Type</label>
                    <select {...register("fuel_type")} className="form-select">
                      <option value="Petrol">Petrol</option>
                      <option value="Diesel">Diesel</option>
                      <option value="Electric">Electric</option>
                      <option value="Hybrid">Hybrid</option>
                      <option value="CNG">CNG</option>
                    </select>
                  </div>
                  <div className="col-md-4 mb-3">
                    <label className="form-label">Transmission</label>
                    <select
                      {...register("transmission")}
                      className="form-select"
                    >
                      <option value="Manual">Manual</option>
                      <option value="Automatic">Automatic</option>
                      <option value="Semi-Auto">Semi-Auto</option>
                    </select>
                  </div>
                  <div className="col-md-4 mb-3">
                    <label className="form-label">Condition</label>
                    <select {...register("condition")} className="form-select">
                      <option value="Brand New">Brand New</option>
                      <option value="Excellent">Excellent</option>
                      <option value="Good">Good</option>
                      <option value="Fair">Fair</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* --- Pricing & Mileage --- */}
              <div className="card shadow-sm border-0 p-4 mb-4">
                <h5 className="mb-3 border-bottom pb-2">Pricing & Usage</h5>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Selling Price </label>
                    <input
                      type="number"
                      step="0.01"
                      {...register("price", { required: true })}
                      className="form-control"
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">
                      Discount Price (Optional)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      {...register("discount_price")}
                      className="form-control"
                    />
                  </div>
                  <div className="col-md-12 mb-3">
                    <label className="form-label">Kilometers Run </label>
                    <input
                      type="number"
                      {...register("kilometers_run", { required: true })}
                      className="form-control"
                      placeholder="e.g. 15000"
                    />
                  </div>
                </div>
              </div>

              {/* --- Gallery --- */}
              <div className="card shadow-sm border-0 p-4 mb-4">
                <h5 className="mb-3 border-bottom pb-2 text-primary">
                  Vehicle Gallery
                </h5>
                <div className="mb-3">
                  <label htmlFor="" className="form-label">
                    Image
                  </label>
                  <input
                    onChange={handleFile}
                    type="file"
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <div className="row">
                    {galleryImages &&
                      galleryImages.map((image) => {
                        return (
                          <div className="col-md-3 mb-3" key={image}>
                            <img
                              src={image}
                              className="img-fluid w-100"
                              alt="gallery"
                            />
                            <button className="btn btn-danger" onClick={() => deleteImage(image)}>Delete</button>
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>

              {/* --- Description --- */}
              <div className="card shadow-sm border-0 p-4 mb-4">
                <h5 className="mb-3 border-bottom pb-2">Full Description</h5>
                <JoditEditor
                  ref={editor}
                  value={content}
                  config={config}
                  onBlur={(newContent) => setContent(newContent)}
                />
              </div>

              {/* --- Visibility Settings --- */}
              <div className="card shadow-sm border-0 p-4 mb-4">
                <div className="row">
                  <div className="col-md-6">
                    <label className="form-label">Status</label>
                    <select {...register("status")} className="form-select">
                      <option value="1">Active (Visible)</option>
                      <option value="0">Block (Hidden)</option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Feature on Homepage?</label>
                    <select
                      {...register("is_featured")}
                      className="form-select"
                    >
                      <option value="no">No</option>
                      <option value="yes">Yes</option>
                    </select>
                  </div>
                </div>
              </div>

              <button
                disabled={loading || uploading}
                className="btn btn-primary btn-lg w-100 shadow mb-5"
              >
                {loading ? "Processing..." : "Save Vehicle to Inventory"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Create;
