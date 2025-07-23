import { Header } from '../components/Header';
import './NotFound.css';

export function NotFound ({ cart }) {
  return (
    <>
      <title>404 Page Not Found</title>
      <link rel="icon" type="image/svg+xml" href="home-favicon.png" />

      <Header cart={cart}/>
      <div className='main-div'>404 Page not found</div>
    </>
  )
}