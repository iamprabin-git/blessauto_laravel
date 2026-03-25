import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom"; // Added useLocation for active states
import { Navbar, Nav, Container, Form, InputGroup, Offcanvas, Collapse } from "react-bootstrap";
import logo from "../../assets/images/logo.png";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [manualToggle, setManualToggle] = useState(false);
  const location = useLocation(); // Get current path

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
        setManualToggle(false); 
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleToggle = () => {
    if (window.innerWidth < 992) {
      setShowSidebar(true);
    } else {
      setManualToggle(!manualToggle);
    }
  };

  // Helper to determine if a link is active
  const isActive = (path) => location.pathname === path;

  return (
    <header
      className={`w-100 bg-white ${isScrolled ? "fixed-top shadow-sm" : "position-relative"}`}
      style={{ transition: "all 0.3s ease", zIndex: 1050 }}
    >
      {/* LAYER 1: Logo & Search */}
      <div className="border-bottom py-2 bg-white">
        <Container className="d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center">
            <button className="btn border-0 p-0 me-3 d-lg-none" onClick={handleToggle}>
               <span className="navbar-toggler-icon"></span>
            </button>
            <Navbar.Brand as={Link} to="/">
              <img src={logo} alt="Bless Auto" style={{ height: "60px", objectFit: 'contain' }} />
            </Navbar.Brand>
          </div>

          {/* Search Bar */}
          <div className="d-none d-md-block flex-grow-1 mx-5">
            <InputGroup size="sm" className="rounded-pill border overflow-hidden">
              <InputGroup.Text className="bg-white border-0 ps-3">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
              </InputGroup.Text>
              <Form.Control
                placeholder="Search for Bikes, Cars or Parts..."
                className="border-0 shadow-none"
              />
            </InputGroup>
          </div>

          <div className="d-flex align-items-center gap-3">
            <Nav.Link as={Link} to="/login" className="small fw-bold text-dark">LOGIN</Nav.Link>
            <div className="vr d-none d-sm-block"></div>
            <Nav.Link as={Link} to="/register" className="small fw-bold text-primary">REGISTER</Nav.Link>
          </div>
        </Container>
      </div>

      {/* LAYER 2: Desktop Navigation */}
      <Collapse in={isScrolled || manualToggle}>
        <div className="d-none d-lg-block bg-white border-top shadow-sm">
          <Container>
            <Nav className="justify-content-center py-2 gap-4 fw-bold small text-uppercase">
              <Nav.Link as={Link} to="/" className={isActive('/') ? 'text-primary' : 'text-dark'}>HOME</Nav.Link>
              <Nav.Link as={Link} to="/shop" className={isActive('/shop') ? 'text-primary' : 'text-dark'}>SHOP</Nav.Link>
              <Nav.Link as={Link} to="/bikes" className={isActive('/bikes') ? 'text-primary' : 'text-dark'}>BIKES</Nav.Link>
              <Nav.Link as={Link} to="/cars" className={isActive('/cars') ? 'text-primary' : 'text-dark'}>CARS</Nav.Link>
              <Nav.Link as={Link} to="/accessories" className={isActive('/accessories') ? 'text-primary' : 'text-dark'}>ACCESSORIES</Nav.Link>
              <Nav.Link as={Link} to="/contact" className="text-danger">CONTACT US</Nav.Link>
            </Nav>
          </Container>
        </div>
      </Collapse>

      {/* MOBILE SIDEBAR */}
      <Offcanvas show={showSidebar} onHide={() => setShowSidebar(false)} placement="start">
        <Offcanvas.Header closeButton className="border-bottom">
          <Offcanvas.Title className="fw-bold text-primary">BLESS AUTO</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="p-0">
          <Nav className="flex-column">
            {['/', '/shop', '/bikes', '/accessories', '/contact'].map((path) => (
              <Nav.Link 
                key={path} 
                as={Link} 
                to={path} 
                onClick={() => setShowSidebar(false)}
                className={`p-3 border-bottom fw-bold ${isActive(path) ? 'text-primary' : 'text-dark'}`}
              >
                {path === '/' ? 'HOME' : path.replace('/', '').toUpperCase()}
              </Nav.Link>
            ))}
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </header>
  );
};

export default Header;