import axios from "axios";
import dayjs from "dayjs";
import { Link, useParams } from "react-router";
import { Header } from "../components/Header";
import './TrackingPage.css';
import { useEffect, useState } from "react";

export function TrackingPage({ cart }) {
  const {orderId, productId} = useParams();
  const [order, setOrder] = useState(null);

  useEffect( () => {
    const fetchTrackingData = async () => {
      const response = await axios.get(`/api/orders/${orderId}?expand=products`);
      setOrder(response.data);
    }

    fetchTrackingData()
  }, [orderId]);

  if(!order) {
    return null;
  }

  const orderProduct = order.products.find((orderProduct) => {
    return orderProduct.productId === productId;
  });

  const totalDeliveryTimeMS =  orderProduct.estimatedDeliveryTimeMs - order.orderTimeMs;
  const timePassedMs = dayjs().valueOf() - order.orderTimeMs; 


  let deliveryPercent = (timePassedMs / totalDeliveryTimeMS) * 100;
  
  if (deliveryPercent > 100) {
    deliveryPercent = 100;
  }

  const isPreparing = deliveryPercent < 33;
  const isShipped = deliveryPercent >= 33 && deliveryPercent < 100;
  const isDelivered = deliveryPercent === 100;

  
  return (
    <>
      <link rel="icon" type="image/svg+xml" href="/tracking-favicon.png" />

      <title>Tracking</title>

      <Header cart={cart} />

      <div className="tracking-page">
        <div className="order-tracking">
          <Link className="back-to-orders-link link-primary" to="/orders">
            View all orders
          </Link>

          <div className="delivery-date">
             {deliveryPercent >= 100 ? 'Delivered on' : 'Arriving on'}
             {dayjs(orderProduct.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
          </div>

          <div className="product-info">
            {orderProduct.product.name}
          </div>

          <div className="product-info">
            Quantity: {orderProduct.quantity}
          </div>

          <img className="product-image" src={orderProduct.product.image} />

          <div className="progress-labels-container">
            <div className={`progress-label ${isPreparing && 'current-status'}`}>
              Preparing
            </div>
            <div className={`progress-label ${isShipped && 'current-status'}`}>
              Shipped
            </div>
            <div className={`progress-label ${isDelivered && 'current-status'}`}>
              Delivered
            </div>
          </div>

          <div className="progress-bar-container">
            <div className="progress-bar" style={{
              width: `${deliveryPercent}%`
            }}></div>
          </div>
        </div>
      </div>
    </>
  )
}