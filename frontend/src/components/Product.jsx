import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import Layout from "./common/Layout";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, EffectFade } from "swiper/modules";
import { Tab, Tabs, Container, Row, Col, Badge, Table, Form, Card } from "react-bootstrap";
import { 
  ShieldCheck, Zap, Fuel, Gauge, BoxSelect, 
  MapPin, Calendar, Info, Calculator, Download, Share2 
} from "lucide-react";

// Styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const Product = () => {
  const [viewMode, setViewMode] = useState("360"); // '360' or 'gallery'
  const [emiMonths, setEmiMonths] = useState(36);
  const [downPayment, setDownPayment] = useState(400000);

  // --- 360 LOGIC ---
  const [frame, setFrame] = useState(1);
  const totalFrames = 36;
  const isDragging = useRef(false);
  const startX = useRef(0);

  const handleMove = (e) => {
    if (!isDragging.current) return;
    const x = e.pageX || (e.touches ? e.touches[0].pageX : 0);
    const diff = startX.current - x;
    if (Math.abs(diff) > 7) {
      setFrame((prev) => (diff > 0 ? (prev >= totalFrames ? 1 : prev + 1) : (prev <= 1 ? totalFrames : prev - 1)));
      startX.current = x;
    }
  };

  const bike = {
    title: "Kawasaki Ninja ZX-10R",
    brand: "Kawasaki",
    modelYear: "2026",
    price: 1650000,
    compare_price: 1750000,
    sku: "BLESS-ZX10R-GRN",
    threeSixtyBase: "https://scaleflex.cloudimg.io/v7/demo/360-car/car-",
    gallery: [
      "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?q=80&w=1000",
      "https://images.unsplash.com/photo-1628446201733-14660e1f7601?q=80&w=1000",
      "https://images.unsplash.com/photo-1449491069643-225bbf8a2aa2?q=80&w=1000"
    ],
    technicalData: {
      Engine: [
        { label: "Type", value: "Liquid-cooled, 4-stroke Inline Four" },
        { label: "Displacement", value: "998 cc" },
        { label: "Bore x Stroke", value: "76.0 x 55.0 mm" },
        { label: "Compression Ratio", value: "13.0:1" }
      ],
      Performance: [
        { label: "Max Power", value: "203 PS @ 13,200 rpm" },
        { label: "Max Torque", value: "114.9 Nm @ 11,400 rpm" },
        { label: "Fuel System", value: "DFI® with 47mm Mikuni throttle bodies" }
      ]
    }
  };

  // EMI Calculation Logic
  const calculateEMI = () => {
    const principal = bike.price - downPayment;
    const rate = 0.085 / 12; // 8.5% annual interest
    const emi = (principal * rate * Math.pow(1 + rate, emiMonths)) / (Math.pow(1 + rate, emiMonths) - 1);
    return Math.round(emi).toLocaleString();
  };

  return (
    <Layout>
      <div className="bg-white pb-5">
        {/* TOP INTERACTIVE SHOWCASE */}
        <section className="bg-light border-bottom py-5">
          <Container>
            <div className="d-flex justify-content-between align-items-end mb-4">
              <div>
                <Badge bg="dark" className="mb-2">{bike.modelYear} MODEL</Badge>
                <h1 className="fw-bold mb-0">{bike.title}</h1>
              </div>
              <div className="d-none d-md-block">
                <button className="btn btn-outline-secondary btn-sm me-2"><Share2 size={16} /> Share</button>
                <button className="btn btn-outline-secondary btn-sm"><Download size={16} /> Brochure</button>
              </div>
            </div>

            <Row className="g-4">
              <Col lg={8}>
                <div 
                  className="main-view-container bg-white rounded-4 shadow-sm border overflow-hidden position-relative d-flex align-items-center justify-content-center"
                  style={{ height: "500px", cursor: viewMode === "360" ? "grab" : "default" }}
                >
                  {viewMode === "360" ? (
                    <div 
                      className="w-100 h-100 d-flex align-items-center justify-content-center"
                      onMouseDown={(e) => { isDragging.current = true; startX.current = e.pageX; }}
                      onMouseMove={handleMove}
                      onMouseUp={() => isDragging.current = false}
                      onMouseLeave={() => isDragging.current = false}
                      onTouchStart={(e) => { isDragging.current = true; startX.current = e.touches[0].pageX; }}
                      onTouchMove={handleMove}
                      onTouchEnd={() => isDragging.current = false}
                    >
                      <img src={`${bike.threeSixtyBase}${frame}.jpg`} alt="360 rotation" className="img-fluid unselectable" draggable="false" />
                      <div className="position-absolute bottom-0 mb-3 bg-dark text-white px-3 py-1 rounded-pill small opacity-75">
                         Drag to Rotate 360°
                      </div>
                    </div>
                  ) : (
                    <Swiper navigation pagination modules={[Navigation, Pagination]} className="w-100 h-100">
                      {bike.gallery.map((img, i) => (
                        <SwiperSlide key={i}><img src={img} className="w-100 h-100 object-fit-cover" alt="gallery" /></SwiperSlide>
                      ))}
                    </Swiper>
                  )}
                </div>

                {/* THUMBNAIL NAV */}
                <div className="d-flex gap-2 mt-3 overflow-auto pb-2">
                  <Card 
                    onClick={() => setViewMode("360")}
                    className={`flex-shrink-0 cursor-pointer ${viewMode === '360' ? 'border-primary border-2 shadow-sm' : ''}`}
                    style={{ width: '100px', height: '70px' }}
                  >
                    <div className="d-flex flex-column align-items-center justify-content-center h-100 text-primary">
                      <BoxSelect size={20} />
                      <span className="fw-bold" style={{fontSize: '10px'}}>360 VIEW</span>
                    </div>
                  </Card>
                  {bike.gallery.map((img, i) => (
                    <img 
                      key={i} src={img} alt="thumb"
                      onClick={() => setViewMode("gallery")}
                      className={`rounded border flex-shrink-0 cursor-pointer ${viewMode === 'gallery' ? 'border-primary' : ''}`}
                      style={{ width: '100px', height: '70px', objectFit: 'cover' }}
                    />
                  ))}
                </div>
              </Col>

              {/* QUICK INFO SIDEBAR */}
              <Col lg={4}>
                <div className="ps-lg-2">
                  <div className="mb-4">
                    <span className="h1 fw-bold text-primary">Rs. {bike.price.toLocaleString()}</span>
                    <p className="text-muted">Ex-Showroom Price (Estimated)</p>
                  </div>

                  <div className="bg-white p-3 rounded-4 border shadow-sm mb-4">
                    <h6 className="fw-bold mb-3 d-flex align-items-center"><Calculator size={18} className="me-2 text-primary"/> EMI Calculator</h6>
                    <Form.Label className="small text-muted">Down Payment: Rs. {downPayment.toLocaleString()}</Form.Label>
                    <Form.Range min={100000} max={1000000} step={50000} value={downPayment} onChange={(e) => setDownPayment(e.target.value)} />
                    
                    <div className="d-flex gap-2 mt-3">
                      {[12, 24, 36, 48].map(m => (
                        <button key={m} onClick={() => setEmiMonths(m)} className={`btn btn-sm flex-fill ${emiMonths === m ? 'btn-primary' : 'btn-outline-secondary'}`}>{m}m</button>
                      ))}
                    </div>
                    <div className="mt-3 pt-3 border-top text-center">
                      <div className="text-muted small">Estimated Monthly EMI</div>
                      <div className="h4 fw-bold text-dark mb-0">Rs. {calculateEMI()}</div>
                    </div>
                  </div>

                  <div className="d-grid gap-2">
                    <button className="btn btn-primary btn-lg py-3 fw-bold shadow-sm">BOOK A TEST RIDE</button>
                    <button className="btn btn-outline-dark btn-lg py-3">CHECK ON-ROAD PRICE</button>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </section>

        {/* BOTTOM DETAILS TABS */}
        <Container className="mt-5">
          <Tabs defaultActiveKey="specs" className="custom-tabs border-0 mb-4 h5 fw-bold">
            <Tab eventKey="specs" title="Technical Specs">
              <Row>
                {Object.entries(bike.technicalData).map(([category, items]) => (
                  <Col md={6} key={category} className="mb-4">
                    <Card className="border-0 bg-light rounded-4 h-100">
                      <Card.Body>
                        <h5 className="fw-bold border-bottom pb-2 mb-3">{category}</h5>
                        <Table borderless size="sm">
                          <tbody>
                            {items.map((item, i) => (
                              <tr key={i}>
                                <td className="text-muted py-2">{item.label}</td>
                                <td className="text-end fw-bold py-2">{item.value}</td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Tab>
            <Tab eventKey="features" title="Key Features">
               <div className="p-4 bg-light rounded-4">
                 <Row className="g-4">
                    <Col md={4} className="text-center">
                      <div className="bg-white p-4 rounded-4 shadow-sm h-100">
                        <Zap size={40} className="text-primary mb-3" />
                        <h6>Traction Control</h6>
                        <p className="small text-muted">Advanced 3-mode KTRC system for maximum grip in all conditions.</p>
                      </div>
                    </Col>
                    <Col md={4} className="text-center">
                      <div className="bg-white p-4 rounded-4 shadow-sm h-100">
                        <ShieldCheck size={40} className="text-primary mb-3" />
                        <h6>Intelligent ABS</h6>
                        <p className="small text-muted">Kawasaki Intelligent anti-lock Brake System (KIBS) for supersport performance.</p>
                      </div>
                    </Col>
                    <Col md={4} className="text-center">
                      <div className="bg-white p-4 rounded-4 shadow-sm h-100">
                        <Gauge size={40} className="text-primary mb-3" />
                        <h6>Cruise Control</h6>
                        <p className="small text-muted">Electronic cruise control for relaxed highway riding.</p>
                      </div>
                    </Col>
                 </Row>
               </div>
            </Tab>
          </Tabs>
        </Container>
      </div>
    </Layout>
  );
};

export default Product;