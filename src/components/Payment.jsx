import axios from "axios";
import React, { useState, useEffect } from "react";
import useShop from "../ShopContext";
import toast from "react-hot-toast";

const Payment = () => {
  const initialPayment = {
    zaad: false,
    evc: false,
    sahal: false,
  };
  const { total, clearCart } = useShop();
  const [paymentType, setPaymentType] = useState(initialPayment);
  const [updated, setUpdated] = useState(false);
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {}, [updated]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if(phone == "") return toast.error("Please enter a phone number!")
    proceedpayment();
  };

  const proceedpayment = async () => {
    try {
      const body = {
        schemaVersion: "1.0",
        requestId: "10111331033",
        timestamp: 1590587436057686,
        channelName: "WEB",
        serviceName: "API_PURCHASE",
        serviceParams: {
          merchantUid: process.env.REACT_APP_MERCHANT_U_ID,
          apiUserId: process.env.REACT_APP_MERCHANT_API_USER_ID,
          apiKey: process.env.REACT_APP_MERCHANT_API_KEY,
          paymentMethod: "mwallet_account",
          payerInfo: {
            accountNo: phone,
          },
          transactionInfo: {
            referenceId: "12334",
            invoiceId: "7896504",
            amount: total,
            currency: "USD",
            description: "React Shopping Cart",
          },
        },
      };

      setLoading(true);
      const { data } = await axios.post(process.env.REACT_APP_MERCHANT_URL, body);
      setLoading(false);
      if (data.responeCode == 201) {
        setUpdated(!updated);
        toast.success("Successfully sended amount")
        clearCart();
        return;
      } else {
        if (data.responseCode == 5310) {
          toast.error(data.responseMsg)
          setUpdated(!updated);
        } else if (data.responseCode == 5206) {
          toast.error(data.responseMsg);
          setUpdated(!updated);
        }
      }
      
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <h2>Pay With</h2>
      <div className="payment-cards">
        <div
          className={`payment-card ${paymentType.zaad && "selected"}`}
          onClick={() => setPaymentType({ ...initialPayment, zaad: true })}
        >
          <h3>Zaad Services</h3>
        </div>

        <div
          className={`payment-card ${paymentType.evc && "selected"}`}
          onClick={() => setPaymentType({ ...initialPayment, evc: true })}
        >
          <h3>Evc Plus</h3>
        </div>

        <div
          className={`payment-card ${paymentType.sahal && "selected"}`}
          onClick={() => setPaymentType({ ...initialPayment, sahal: true })}
        >
          <h3>Sahal Services</h3>
        </div>

        <form onSubmit={handleSubmit}>
          <input
            type="number"
            className="form-control"
            placeholder="2526xxxxxxxxx"
            onChange={(e) => setPhone(e.target.value)}
          />

          <button className="btn-proceed">
            {loading ? "Loading..." : "Proceed"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Payment;
