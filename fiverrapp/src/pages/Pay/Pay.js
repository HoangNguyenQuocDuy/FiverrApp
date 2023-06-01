import classnames from "classnames/bind";
import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import styles from "./pay.module.scss";
import CheckoutForm from "../../components/checkoutForm/CheckoutForm";
import request from "../../utils/newRequest";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(
  'pk_test_51NDx0kJvgUCS404qx7JkL3UvzorjybrO1RZE2EqiiVXjy3dqdw6TSrac63ghC59IpzXaLFH4hRFLdNZVNAUGz8s000TBFoTabF'
);

const cx = classnames.bind(styles);

export default function Pay() {
  const [clientSecret, setClientSecret] = useState("");

  const { id } = useParams();

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    const makeRequest = async () => {
      try {
        const res = await request.post(`/orders/create-payment-intent/${id}`);
        console.log(res.data)
        setClientSecret(res.data.clientSecret);
      } catch (err) {
        console.log(err);
      }
    };
    makeRequest()
  }, []);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className={cx('wrapper', 'max-width-box')}>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}
