// src/components/HelmetComponent.tsx
import React from "react";
import { Helmet } from "react-helmet-async";

interface HelmetProps {
  title?: string;
  description?: string;
  keywords?: string;
  author?: string;
  canonical?: string;
}

const HelmetComponent: React.FC<HelmetProps> = ({
  title = "एकात्मिक आदिवासी विकास प्रकल्प, शहापुर | Adivasi Vikas Prakalp Shahapur",
  description = "Welcome to Adivasi Vikas Prakalp Shahapur",
  keywords = "adivasi vikas shahapur,Adivasi Vikas Prakalp Shahapur,Adivasi,vikas,Adivasi vikas,Adivasi vikas shahapur,poitdp shahapur,poitdp shahapur mh,आदिवासी विकास प्रकल्प, शहापुर,",
  author = "Adivasi Vikas Prakalp Shahapur",
  canonical = "https://yourdomain.com/",
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <link rel="canonical" href={canonical} />
      <link rel="icon" href="/Adivasi_Vikas_Prakalp_Shahapur.svg" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </Helmet>
  );
};

export default HelmetComponent;
