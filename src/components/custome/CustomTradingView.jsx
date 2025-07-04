import React, { memo, useEffect, useRef } from 'react';

const CustomTradingView = () => {
  const containerRef = useRef(null);
  const widgetInitialized = useRef(false);

  useEffect(() => {
    // Only initialize once
    if (widgetInitialized.current || !containerRef.current) return;

    const loadScript = () => {
      const script = document.createElement('script');
      script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-forex-cross-rates.js';
      script.async = true;
      script.type = 'text/javascript';
      
      const config = {
        "width": "100%",
        "height": 500,
        "currencies": ["EUR", "USD", "JPY", "GBP", "CHF", "AUD", "CAD", "NZD"],
        "isTransparent": false,
        "colorTheme": "light",
        "locale": "en",
        "backgroundColor": "#ffffff"
      };

      script.innerHTML = JSON.stringify(config);

      // Create proper container structure
      const widgetContainer = document.createElement('div');
      widgetContainer.className = 'tradingview-widget-container';
      
      const widgetDiv = document.createElement('div');
      widgetDiv.className = 'tradingview-widget-container__widget';
      
      widgetContainer.appendChild(widgetDiv);
      widgetContainer.appendChild(script);
      
      // Clear and rebuild the container
      containerRef.current.innerHTML = '';
      containerRef.current.appendChild(widgetContainer);

      widgetInitialized.current = true;
    };

    // Add error handling
    try {
      loadScript();
    } catch (error) {
      console.error('Error loading TradingView widget:', error);
    }

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
      widgetInitialized.current = false;
    };
  }, []);

  return (
    <div className="w-full h-full">
      <div ref={containerRef} />
      <div className="tradingview-widget-copyright text-center mt-2 text-xs">
        <a href="https://www.tradingview.com/" rel="noopener nofollow" target="_blank" className="text-blue-500">
          Track all markets on TradingView
        </a>
      </div>
    </div>
  );
};

export default memo(CustomTradingView);