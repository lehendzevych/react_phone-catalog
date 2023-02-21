import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useAppDispatch } from './app/hooks';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

import * as cartProductActions from './app/features/cartProductsSlice';
import * as favoritesActions from './app/features/favoritesSlice';

import './App.scss';

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const cartFromLocalStorage = localStorage.getItem('cart');

    if (cartFromLocalStorage) {
      dispatch(
        cartProductActions.setCartProducts(
          JSON.parse(cartFromLocalStorage),
        ),
      );
    }

    const favoritesFromLocalStorage = localStorage.getItem('favorites');

    if (favoritesFromLocalStorage) {
      dispatch(
        favoritesActions.setFavorites(
          JSON.parse(favoritesFromLocalStorage),
        ),
      );
    }
  }, []);

  return (
    <div className="App">
      <Header />

      <main className="App__main">
        <div className="container">
          <Outlet />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default App;
