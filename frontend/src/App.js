import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { ProductProvider } from './context/ProductContext';
import { NotificationProvider } from './context/NotificationContext';
import Header from './components/layout/Header';
import Home from './pages/Home';
import Alta from './pages/Alta';
import Contacto from './pages/Contacto';
import Nosotros from './pages/Nosotros';
import PaymentResult from './pages/PaymentResult';
import Footer from './components/layout/Footer';

function App() {
    return (
        <NotificationProvider>
            <ProductProvider>
                <CartProvider>
                    <Router>
                        <div className="flex flex-col min-h-screen">
                            <Header />
                            <main className="flex-grow">
                                <Routes>
                                    <Route path="/" element={<Home />} />
                                    <Route path="/alta" element={<Alta />} />
                                    <Route path="/contacto" element={<Contacto />} />
                                    <Route path="/nosotros" element={<Nosotros />} />
                                    <Route path="/payment/:status" element={<PaymentResult />} />
                                </Routes>
                            </main>
                            <Footer />
                        </div>
                    </Router>
                </CartProvider>
            </ProductProvider>
        </NotificationProvider>
    );
}

export default App;