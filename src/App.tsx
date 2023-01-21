import { Outlet } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

import './App.scss';

const App = () => (
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

export default App;
