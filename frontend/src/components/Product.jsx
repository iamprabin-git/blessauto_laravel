import React, { useState, useEffect, useCallback, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { apiUrl } from "./common/http";
import Layout from "./common/Layout";
import RelatedProduct from "./common/RelatedProduct";
import FinanceCalculator from "./common/Calculator";
import {
  Tab,
  Tabs,
  Container,
  Row,
  Col,
  Badge,
  Spinner,
  Button,
  Table,
} from "react-bootstrap";
import { ArrowLeft, Search, MessageSquare } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);

  const [activeImage, setActiveImage] = useState("");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [zoomStyle, setZoomStyle] = useState({
    transform: "scale(1)",
    transformOrigin: "center",
  });

  const containerRef = useRef(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${apiUrl}/get-product/${id}`);
      if (!res.ok) throw new Error(`Product not found: ${res.status}`);
      const result = await res.json();

      if (result.status === 200) {
        const data = result.data;
        setProduct(data);
        setActiveImage(data.image_url);

        try {
          const relRes = await fetch(
            `${apiUrl}/get-related-products/${data.category_id}`,
          );
          if (relRes.ok) {
            const relResult = await relRes.json();
            if (relResult.status === 200) {
              setRelated(relResult.data.filter((item) => item.id !== data.id));
            }
          }
        } catch (relErr) {
          console.error("Related products fetch failed:", relErr);
        }
      }
    } catch (e) {
      console.error("Critical Error:", e);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // --- FUNCTIONAL HANDLERS ---

  const handleWhatsAppEnquiry = () => {
    const phoneNumber = "+9779851090167"; // REPLACE WITH YOUR BUSINESS NUMBER
    const message = `Hello Bless Auto! I'm interested in the ${product.title}. 
Price: Rs. ${Number(product.price).toLocaleString()}
Vehicle ID: ${product.id}
Could you please provide more details?`;

    const encodedMessage = encodeURIComponent(message);
    window.open(
      `https://wa.me/${phoneNumber}?text=${encodedMessage}`,
      "_blank",
    );
  };

  // --- ZOOM LOGIC ---
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const { left, top, width, height } =
      containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomStyle({
      transformOrigin: `${x}% ${y}%`,
      transform: "scale(1.8)",
      cursor: "crosshair",
    });
  };

  const handleMouseLeave = () => {
    setZoomStyle({
      transformOrigin: "center center",
      transform: "scale(1)",
      transition: "transform 0.3s ease",
    });
  };

  if (loading)
    return (
      <Layout>
        <div className="py-5 text-center">
          <Spinner animation="border" variant="info" />
        </div>
      </Layout>
    );
  if (!product)
    return (
      <Layout>
        <Container className="py-5 text-center my-5">
          <h3>Vehicle Not Found</h3>
          <Link to="/" className="btn btn-info text-white mt-3">
            Back to Home
          </Link>
        </Container>
      </Layout>
    );

  return (
    <Layout>
      <div className="product-page-ac bg-white pb-5">
        <div className="bg-light border-bottom py-2 mb-4">
          <Container>
            <Button
              variant="link"
              className="text-dark p-0 small text-decoration-none d-flex align-items-center"
              onClick={() => window.history.back()}
            >
              <ArrowLeft size={16} className="me-1" /> Back to Inventory
            </Button>
          </Container>
        </div>

        <Container>
          <Row className="g-4">
            <Col lg={8}>
              <div
                ref={containerRef}
                className="main-viewer-container mb-3 shadow-sm rounded-4 overflow-hidden border bg-white position-relative"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{ height: "450px" }}
              >
                <img
                  src={activeImage || product.image_url}
                  className={`w-100 h-100 object-fit-contain transition-all ${isTransitioning ? "opacity-0" : "opacity-100"}`}
                  style={zoomStyle}
                  alt={product.title}
                />
                <Badge
                  bg="dark"
                  className="position-absolute bottom-0 start-0 m-3 opacity-75"
                >
                  <Search size={14} className="me-1" /> Hover to Zoom
                </Badge>
              </div>

              <div className="ac-thumb-strip d-flex gap-2 overflow-auto mb-4">
                <img
                  src={product.image_url}
                  className={`ac-thumb-img ${activeImage === product.image_url ? "active" : ""}`}
                  onClick={() => {
                    setIsTransitioning(true);
                    setActiveImage(product.image_url);
                    setTimeout(() => setIsTransitioning(false), 200);
                  }}
                  alt="main thumb"
                />
                {product.product_images?.map((img, i) => (
                  <img
                    key={i}
                    src={img.image_url}
                    className={`ac-thumb-img ${activeImage === img.image_url ? "active" : ""}`}
                    onClick={() => {
                      setIsTransitioning(true);
                      setActiveImage(img.image_url);
                      setTimeout(() => setIsTransitioning(false), 200);
                    }}
                    alt={`thumb ${i}`}
                  />
                ))}
              </div>

              <Tabs
                defaultActiveKey="description"
                className="custom-tabs mt-5 border-bottom"
              >
                <Tab
                  eventKey="description"
                  title="Description"
                  className="py-4"
                >
                  <h5 className="fw-bold mb-3">Vehicle Overview</h5>
                  <div
                    className="text-muted mb-4"
                    dangerouslySetInnerHTML={{ __html: product.description }}
                  />
                  <h5 className="fw-bold mb-3">Technical Specifications</h5>
                  <Row className="g-3">
                    {/* Column 1: Engine & Performance */}
                    <Col md={6}>
                      <Table bordered size="sm" className="small">
                        <tbody>
                          <tr>
                            <td className="bg-light text-muted w-50">
                              Engine Capacity
                            </td>
                            <td className="fw-bold">
                              {product.engine_capacity}cc
                            </td>
                          </tr>
                          <tr>
                            <td className="bg-light text-muted">
                              Transmission
                            </td>
                            <td className="fw-bold">{product.transmission}</td>
                          </tr>
                          <tr>
                            <td className="bg-light text-muted">Fuel Type</td>
                            <td className="fw-bold">{product.fuel_type}</td>
                          </tr>
                          <tr>
                            <td className="bg-light text-muted">
                              Mileage (Est.)
                            </td>
                            <td className="fw-bold">{product.mileage} km/l</td>
                          </tr>
                          <tr>
                            <td className="bg-light text-muted">Variant</td>
                            <td className="fw-bold text-capitalize">
                              {product.variant}
                            </td>
                          </tr>
                        </tbody>
                      </Table>
                    </Col>

                    {/* Column 2: History & Legal */}
                    <Col md={6}>
                      <Table bordered size="sm" className="small">
                        <tbody>
                          <tr>
                            <td className="bg-light text-muted w-50">
                              Model Year
                            </td>
                            <td className="fw-bold">{product.model_year}</td>
                          </tr>
                          <tr>
                            <td className="bg-light text-muted">
                              Kilometers Run
                            </td>
                            <td className="fw-bold">
                              {Number(product.kilometers_run).toLocaleString()}{" "}
                              km
                            </td>
                          </tr>
                          <tr>
                            <td className="bg-light text-muted">Condition</td>
                            <td className="fw-bold text-success">
                              {product.condition}
                            </td>
                          </tr>
                          <tr>
                            <td className="bg-light text-muted">
                              Ownership No.
                            </td>
                            <td className="fw-bold">
                              {product.ownership_number}
                            </td>
                          </tr>
                          <tr>
                            <td className="bg-light text-muted">Tax Expiry</td>
                            <td className="fw-bold">
                              {new Date(
                                product.tax_token_expiry,
                              ).toLocaleDateString()}
                            </td>
                          </tr>
                        </tbody>
                      </Table>
                    </Col>

                    {/* Optional Full-Width Table for Registration Details */}
                    <Col md={12}>
                      <Table bordered size="sm" className="small">
                        <tbody>
                          <tr>
                            <td
                              className="bg-light text-muted"
                              style={{ width: "25%" }}
                            >
                              Registration No.
                            </td>
                            <td className="fw-bold" style={{ width: "25%" }}>
                              {product.registration_number}
                            </td>
                            <td
                              className="bg-light text-muted"
                              style={{ width: "25%" }}
                            >
                              Color
                            </td>
                            <td
                              className="fw-bold text-capitalize"
                              style={{ width: "25%" }}
                            >
                              {product.color}
                            </td>
                          </tr>
                        </tbody>
                      </Table>
                    </Col>
                  </Row>
                </Tab>
                <Tab eventKey="reviews" title="Reviews" className="py-4">
                  <div className="text-center py-5 bg-light rounded-4 border">
                    <MessageSquare size={40} className="text-muted mb-3" />
                    <h5 className="fw-bold">No Reviews Yet</h5>
                    <Button
                      variant="info"
                      size="sm"
                      className="text-white fw-bold"
                    >
                      Write a Review
                    </Button>
                  </div>
                </Tab>
              </Tabs>
            </Col>

            <Col lg={4}>
              <div className="sticky-top" style={{ top: "20px" }}>
                {/* 1. The Calculator Component */}
                <FinanceCalculator productPrice={product.price} />

                {/* 2. Functional Action Buttons */}
                <Link to={"/contact"}
                  className="btn btn-primary w-100 py-2 fw-bold border-0 shadow-sm mb-3">
                Contact for Enquiry</Link>

                <Button
                  variant="success"
                  className="w-100 py-2 fw-bold border-0 shadow-sm"
                  style={{ backgroundColor: "#25D366" }}
                  onClick={handleWhatsAppEnquiry}
                >
                  <FaWhatsapp />
                  WhatsApp Enquiry
                </Button>
              </div>
            </Col>
          </Row>

          <RelatedProduct related={related} />
        </Container>
      </div>
    </Layout>
  );
};

export default Product;
