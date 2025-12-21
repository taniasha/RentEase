import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Payment() {
  const token = localStorage.getItem("token");
  const [data, setData] = useState(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("selectedProperty"));
    setData(saved);
  }, []);

  const handlePayment = async () => {
    if (!data) return;

    console.log("Rent Amount:", data.rentAmount);

    try {
      // 1️⃣ Create Razorpay order
      const orderRes = await axios.post(
        "http://localhost:5000/api/create-order",
        { amount: data.rentAmount },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const { id: order_id } = orderRes.data;

      // 2️⃣ Open Razorpay popup
      const options = {
        key: "rzp_test_Qb9FJurfVY6ULB",
        amount: data.rentAmount * 100,
        currency: "INR",
        name: "RentEase",
        description: `Rent for ${data.title}`,
        order_id,

        handler: async function (response) {
          // 3️⃣ Save rental after payment success
          await axios.post(
            "http://localhost:5000/api/capture-payment",
            {
              propertyId: data._id,
              rentAmount: Number(data.rentAmount),  
              month: new Date().toISOString().slice(0, 7), // YYYY-MM
              razorpayPaymentId: response.razorpay_payment_id
            },
            { headers: { Authorization: `Bearer ${token}` } }
          );

          alert("Payment successful!");
        },

        prefill: {
          name: "Tenant",
          email: "tenant@example.com",
          contact: "9999999999"
        },
        theme: { color: "#19437e" }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (err) {
      console.error(err);
      alert("Payment failed");
    }
  };

  if (!data) return <p>Loading payment...</p>;

  return (
    <div className="container mt-5">
      <h4>{data.title}</h4>
      <p>Rent Amount: ₹{data.rentAmount}</p>

      <button className="btn btn-success" onClick={handlePayment}>
        Pay & Rent
      </button>
    </div>
  );
}
