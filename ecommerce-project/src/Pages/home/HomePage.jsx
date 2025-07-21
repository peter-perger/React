import { useEffect, useState } from 'react';
import { Header } from '../../components/Header';
import { ProductGrid } from './ProductsGrid';
import axios from 'axios';
import './HomePage.css';

export function HomePage({ cart }) {
  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    const getHomeData = async () => {
      const response = await axios.get('/api/products');
      
      console.log('hello');
      setProducts(response.data);
    };

    getHomeData();
  }, []);

  return (
    <>
      <link rel="icon" type="image/svg+xml" href="home-favicon.png" />
      <title>Ecommerce Project</title>

      <Header cart={cart}/>

      <div className="home-page">
        <ProductGrid products={products}/>
      </div>
    </>
  );
}