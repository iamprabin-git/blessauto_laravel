import React, { useState } from "react";
import { Card, Badge, Button, Form } from "react-bootstrap";

const FinanceCalculator = ({ productPrice }) => {
  // 1. Initialize state directly from props
  // We use a function inside useState so it only calculates once on mount
  const [downPayment, setDownPayment] = useState(() => {
    return productPrice ? Math.round(parseFloat(productPrice) * 0.15) : 0;
  });

  const [interestRate, setInterestRate] = useState(10.9);
  const [emiMonths, setEmiMonths] = useState(48);

  // 2. EMI Calculation Logic (No changes needed here)
  const calculateEMI = () => {
    const price = parseFloat(productPrice) || 0;
    const principal = price - downPayment;
    
    if (principal <= 0) return "0";

    const monthlyRate = (interestRate / 100) / 12;
    const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, emiMonths)) / 
                (Math.pow(1 + monthlyRate, emiMonths) - 1);
                
    return isFinite(emi) ? Math.max(0, Math.round(emi)).toLocaleString() : "0";
  };

  const totalPayable = () => {
    const emiString = calculateEMI().replace(/,/g, '');
    const emiValue = parseInt(emiString) || 0;
    return (emiValue * emiMonths).toLocaleString();
  };

  return (
    <Card className="border-0 shadow-sm rounded-4 overflow-hidden mb-3">
      <div className="bg-info text-white p-2 text-center small fw-bold">
        FINANCE CALCULATOR
      </div>
      <Card.Body className="p-4">
        <h3 className="fw-bold mb-1 text-center">
          Rs. {Number(productPrice).toLocaleString()}
        </h3>
        <p className="text-center text-muted small mb-4">Vehicle Price</p>
        <hr />

        <Form.Group className="mb-3">
          <Form.Label className="small fw-bold text-muted">Down Payment (Rs.)</Form.Label>
          <Form.Control 
            type="number" 
            size="sm"
            className="shadow-none border-info"
            value={downPayment}
            onChange={(e) => setDownPayment(Number(e.target.value))}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className="small fw-bold text-muted">Interest Rate (% p.a.)</Form.Label>
          <Form.Control 
            type="number" 
            step="0.1"
            size="sm"
            className="shadow-none"
            value={interestRate}
            onChange={(e) => setInterestRate(Number(e.target.value))}
          />
        </Form.Group>

        <Form.Label className="small fw-bold text-muted">Tenure (Months)</Form.Label>
        <div className="d-flex gap-2 mb-4">
          {[12, 24, 36, 48, 60].map((m) => (
            <Button 
              key={m} 
              variant={emiMonths === m ? "info" : "outline-secondary"} 
              className="flex-fill btn-sm py-2" 
              onClick={() => setEmiMonths(m)}
            >
              {m}m
            </Button>
          ))}
        </div>

        <div className="bg-light p-3 rounded-3 mb-4 border-start border-info border-4">
          <div className="d-flex justify-content-between align-items-center">
            <span className="h4 fw-bold mb-0 text-info">Rs. {calculateEMI()}</span>
            <Badge bg="info">Monthly</Badge>
          </div>
          <div className="d-flex justify-content-between mt-2">
            <span className="x-small text-muted">Total Loan Amount:</span>
            <span className="x-small fw-bold text-dark">Rs. {totalPayable()}</span>
          </div>
        </div>

        
      </Card.Body>
    </Card>
  );
};

export default FinanceCalculator;