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
        console.log(result);
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

  const deleteImage = (image) => {
    const newGallery = galleryImages.filter((gallery) => gallery !== image);
    setGalleryImages(newGallery);
  };

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
              {/* Identity Section */}
              <div className="card shadow-sm border-0 p-4 mb-4">
                <h5 className="mb-3 border-bottom pb-2">Vehicle Identity</h5>
                <div className="row">
                  <div className="col-md-12 mb-3">
                    <label className="form-label">Title *</label>
                    <input
                      {...register("title", { required: true })}
                      className={`form-control ${errors.title ? "is-invalid" : ""}`}
                      placeholder="Toyota Corolla"
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Category *</label>
                    <select
                      {...register("category_id", { required: true })}
                      className="form-select"
                    >
                      <option value="">Select Category</option>
                      {categories &&
                        categories.map((cat) => (
                          <option key={cat.id} value={cat.id}>
                            {cat.name}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Brand *</label>
                    <select
                      {...register("brand_id", { required: true })}
                      className="form-select"
                    >
                      <option value="">Select Brand</option>
                      {brands &&
                        brands.map((brand) => (
                          <option key={brand.id} value={brand.id}>
                            {brand.name}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="col-md-4 mb-3">
                    <label className="form-label">Variant</label>
                    <input {...register("variant")} className="form-control" />
                  </div>
                  <div className="col-md-4 mb-3">
                    <label className="form-label">Color</label>
                    <input {...register("color")} className="form-control" />
                  </div>
                  <div className="col-md-4 mb-3">
                    <label className="form-label">Type *</label>
                    <select
                      {...register("type", { required: true })}
                      className="form-select"
                    >
                      <option value="bike">Bike</option>
                      <option value="car">Car</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Technical & Legal Specs */}
              <div className="card shadow-sm border-0 p-4 mb-4">
                <h5 className="mb-3 border-bottom pb-2">
                  Technical & Legal Specs
                </h5>
                <div className="row">
                  <div className="col-md-4 mb-3">
                    <label className="form-label">Model Year *</label>
                    <input
                      type="number"
                      {...register("model_year", { required: true })}
                      className="form-control"
                    />
                  </div>
                  <div className="col-md-4 mb-3">
                    <label className="form-label">Engine Capacity *</label>
                    <input
                      {...register("engine_capacity", { required: true })}
                      className="form-control"
                    />
                  </div>
                  <div className="col-md-4 mb-3">
                    <label className="form-label">Mileage</label>
                    <input {...register("mileage")} className="form-control" />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Engine Number</label>
                    <input
                      {...register("engine_number")}
                      className="form-control"
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Chassis Number</label>
                    <input
                      {...register("chassis_number")}
                      className="form-control"
                    />
                  </div>
                  <div className="col-md-4 mb-3">
                    <label className="form-label">Fuel Type</label>
                    <select {...register("fuel_type")} className="form-select">
                      {["Petrol", "Diesel", "Electric", "Hybrid", "CNG"].map(
                        (f) => (
                          <option key={f} value={f}>
                            {f}
                          </option>
                        ),
                      )}
                    </select>
                  </div>
                  <div className="col-md-4 mb-3">
                    <label className="form-label">Transmission</label>
                    <select
                      {...register("transmission")}
                      className="form-select"
                    >
                      {["Manual", "Automatic", "Semi-Auto"].map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-4 mb-3">
                    <label className="form-label">Condition</label>
                    <select {...register("condition")} className="form-select">
                      {["Brand New", "Excellent", "Good", "Fair"].map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Pricing & Ownership */}
              <div className="card shadow-sm border-0 p-4 mb-4">
                <h5 className="mb-3 border-bottom pb-2">Pricing & Ownership</h5>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Price *</label>
                    <input
                      type="number"
                      {...register("price", { required: true })}
                      className="form-control"
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Discount Price</label>
                    <input
                      type="number"
                      {...register("discount_price")}
                      className="form-control"
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Kilometers Run *</label>
                    <input
                      type="number"
                      {...register("kilometers_run", { required: true })}
                      className="form-control"
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Registration No.</label>
                    <input
                      {...register("registration_number")}
                      className="form-control"
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Ownership</label>
                    <select
                      {...register("ownership_number")}
                      className="form-select"
                    >
                      <option value="1">1st Owner</option>
                      <option value="2">2nd Owner</option>
                      <option value="3">3rd Owner</option>
                    </select>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Tax Token Expiry</label>
                    <input
                      type="date"
                      {...register("tax_token_expiry")}
                      className="form-control"
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
                            <button
                              className="btn btn-danger"
                              onClick={() => deleteImage(image)}
                            >
                              Delete
                            </button>
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="card shadow-sm border-0 p-4 mb-4">
                <h5 className="mb-3 border-bottom pb-2">Full Description</h5>
                <JoditEditor
                  ref={editor}
                  value={content}
                  config={config}
                  onBlur={(newContent) => setContent(newContent)}
                />
              </div>

              {/* Status Section */}
              <div className="card shadow-sm border-0 p-4 mb-4">
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Status *</label>
                    <select
                      {...register("status", { required: true })}
                      className="form-select"
                    >
                      <option value="1">Active</option>
                      <option value="0">Block</option>
                    </select>
                  </div>
                  <div className="col-md-6 mb-3">
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
                {loading ? "Saving Vehicle..." : "Save Vehicle to Inventory"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Create;
