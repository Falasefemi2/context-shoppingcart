import React, { useEffect } from 'react';

const ProxyServer: React.FC = () => {
  useEffect(() => {
    const corsProxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const targetUrl = 'https://fakestoreapi.com';

    const enableCorsProxy = async () => {
      await fetch(`${corsProxyUrl}${targetUrl}`);
    };

    enableCorsProxy();
  }, []);

  return <></>; // Return an empty fragment or loading indicator if needed
};

export default ProxyServer;
