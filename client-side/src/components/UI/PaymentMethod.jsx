import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../../styles/payment-method.css";
import axios from "axios";
import { QRCodeCanvas } from "qrcode.react";

const CarDetails = () => {
  const { carId } = useParams();
  const [data, setData] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState(""); // Track selected payment method
  const [paymentStatus, setPaymentStatus] = useState("Pending"); // Track payment status

  // Fetch car data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://carcoach-apis.onrender.com/api/car-uploads/${carId}`
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [carId]);

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top after data is set
  }, [data]);

  // Handle payment method selection
  const handlePaymentSelection = (paymentMethod) => {
    setSelectedPayment(paymentMethod);
  };

  // Simulate payment confirmation
  const simulatePaymentConfirmation = () => {
    // Simulate payment verification (usually through an API)
    setTimeout(() => {
      setPaymentStatus("Paid"); // Change status to "Paid" after a delay (simulated)
    }, 3000); // Simulating a 3-second delay to represent payment completion
  };

  // Generate UPI link for payment
  const generateUPILink = (amount) => {
    const payeeAddress = "vignesh290304@okicici"; // Replace with actual UPI ID
    const payeeName = "Vicky";
    const transactionNote = "Car Rental Payment";
    const transactionId = `TID${Date.now()}`;
    const currencyCode = "INR"; // Currency code for India
    const amountFormatted = amount + 50; // Add charges to the price

    // Create UPI URI
    return `upi://pay?pa=${payeeAddress}&pn=${payeeName}&tn=${transactionNote}&am=${amountFormatted}&cu=${currencyCode}&tid=${transactionId}`;
  };

  return (
    <div>
      {data ? (
        <div>
          <PaymentMethod
            data={data}
            selectedPayment={selectedPayment}
            onPaymentSelect={handlePaymentSelection}
            generateUPILink={generateUPILink}
            paymentStatus={paymentStatus}
            simulatePaymentConfirmation={simulatePaymentConfirmation}
          />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

const PaymentMethod = ({
  data,
  selectedPayment,
  onPaymentSelect,
  generateUPILink,
  paymentStatus,
  simulatePaymentConfirmation,
}) => {
  const [qrCodeURL, setQrCodeURL] = useState(""); // Store the generated QR code URL

  useEffect(() => {
    if (selectedPayment === "qr" && data.hour_price) {
      const upiLink = generateUPILink(data.hour_price);
      setQrCodeURL(upiLink); // Generate the UPI link and set the QR code URL
    }
  }, [selectedPayment, data, generateUPILink]);

  return (
    <div className="payment-options">
      {/* Cash Payment Option */}
      <div className="payment-option">
        <input
          type="radio"
          id="cash"
          name="payment"
          checked={selectedPayment === "cash"}
          onChange={() => onPaymentSelect("cash")}
        />
        <label htmlFor="cash">
          Cash
          {data.hour_price && <p>Hourly Price: Rs. {data.hour_price}</p>}
        </label>
      </div>

      {/* QR Payment Option */}
      <div className="payment-option">
        <input
          type="radio"
          id="qr-pay"
          name="payment"
          checked={selectedPayment === "qr"}
          onChange={() => onPaymentSelect("qr")}
        />
        <label htmlFor="qr-pay">
          QR
          {data.hour_price && (
            <p>
              Hourly Price: Rs. {data.hour_price + 50} (Including Rs. 50
              charges)
            </p>
          )}
        </label>
        {selectedPayment === "qr" && qrCodeURL && (
          <div>
            <QRCodeCanvas value={qrCodeURL} size={256} />{" "}
            {/* Display the QR code */}
            <p>Scan the QR code to pay via UPI</p>
            {/* Simulate payment confirmation */}
            <button
              className="confirm-btn"
              onClick={simulatePaymentConfirmation}
            >
              Confirm Payment
            </button>
          </div>
        )}
      </div>

      {/* Display Payment Status */}
      <div>
        <h3>
          Payment Status: <span className="payment-status">{paymentStatus}</span>
        </h3>
      </div>
    </div>
  );
};

export default CarDetails;
