import React, { useEffect, useState } from "react";
import "./landing.css"; // Extracted CSS into a separate file for cleanliness

const HomePage = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstall, setShowInstall] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstall(true);
    };

    const handleAppInstalled = () => {
      console.log("PWA was installed");
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    setShowInstall(false);
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    console.log(
      outcome === "accepted"
        ? "User accepted the install prompt"
        : "User dismissed the install prompt"
    );

    setDeferredPrompt(null);
  };

  return (
    <>
      {showInstall && (
        <button id="installBtn" onClick={handleInstallClick}>
          Install App
        </button>
      )}

      <header>
        <div className="logo">ShopEase</div>
        <nav>
          <a href="#">Home</a>
          <a href="#">Shop</a>
          <a href="#">About</a>
          <a href="#">Contact</a>
        </nav>
      </header>

      <section className="hero">
        <h1>Welcome to ShopEase</h1>
        <p>
          Your one-stop shop for the best products at unbeatable prices. Explore
          our wide range of categories today!
        </p>
        <button onClick={() => (window.location.href = "/products")}>
          Shop Now
        </button>
      </section>

      <section className="features">
        <h2>Why Shop With Us?</h2>
        <div className="feature-grid">
          <div className="feature">
            <h3>Fast Shipping</h3>
            <p>Get your orders delivered quickly and reliably.</p>
          </div>
          <div className="feature">
            <h3>Best Prices</h3>
            <p>Unbeatable deals and discounts on top products.</p>
          </div>
          <div className="feature">
            <h3>24/7 Support</h3>
            <p>We’re here to help you anytime you need us.</p>
          </div>
        </div>
      </section>

      <footer>&copy; 2025 ShopEase. All rights reserved.</footer>
    </>
  );
};

export default HomePage;
