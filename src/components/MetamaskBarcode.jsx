import React, { useState } from "react";
//import { QrGenerator } from "./Popup/QrGenerator";
import "../index.css";

export default function MetamaskBarcode() {

    const handleDownloadClick = () => {
        // Open the link in a new tab
        window.open('https://metamask.io/download/', '_blank');
      };

  return (
    <>
  <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 4,
      padding: '3',
      mixBlendMode: 'difference',
      margin:"16px",
    }}
  >
    <div
      style={{
        flex: 1,
        height: '22px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'start',
        gap: '2',
        fontFamily: 'Montserrat, sans-serif', 
      }}
    >
      <div
        style={{
          textAlign: 'center',
          color: 'white',
          opacity: 0.8,
          fontSize: 'large',
          fontWeight: 'medium',
          fontFamily: 'Montserrat, sans-serif', // Use 'Montserrat' as the primary font and fallback to 'sans-serif'
          lineHeight: '1.6',
        }}
      >
        Connect a Wallet
      </div>
    </div>
  </div>

  <div style={{ width: '200px', height: '200px', position: 'relative' }}>
  {/*  <QrGenerator content={'https://metamask.io/download/'} /> */}
  </div>

  <div
    style={{
      flex: 1,
      marginTop: '3',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '4',
    }}
  >
    <div
      style={{
        padding: '2 5',
        backgroundImage: 'linear-gradient(to right, #8B5CF6, #6366F1)',
        borderRadius: '20px',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'inline-flex',
        cursor: 'pointer',
      }}
      onClick={handleDownloadClick}
    >
      <div
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          display: 'flex',
          fontFamily: 'Montserrat, sans-serif',
        }}
      >
        <div
          style={{
            textAlign: 'center',
            color: 'white',
            fontSize: 'medium',
            fontWeight: 'semibold',
            fontFamily: 'Montserrat, sans-serif', // Use 'Montserrat' as the primary font and fallback to 'sans-serif'
            lineHeight: 'tight',
            padding:"4px 10px",
          }}
        >
          Open app
        </div>
      </div>
    </div>

    <div
      style={{
        padding: '0 2',
        justifyContent: 'start',
        alignItems: 'center',
        display: 'inline-flex',
      }}
    >
      <div style={{ textAlign: 'center',marginTop:"8px" }}>
        <span
          style={{
            opacity: 0.7,
            fontSize: 'small',
            fontWeight: 'normal',
            fontFamily: 'Montserrat, sans-serif',
            lineHeight: '16.8px',  
            color:"white"       
          }}
        >
          Don’t have a wallet?{' '}
        </span>
        <span
          style={{
            opacity: 0.8,
            fontSize: 'small',
            fontWeight: 'medium',
            textDecoration: 'underline',
            lineHeight: '16.8px',
            cursor: 'pointer',
            fontFamily: 'Montserrat, sans-serif',
            color:"white"   
          }}
          onClick={handleDownloadClick}
        >
          Download Metamask
        </span>
      </div>
    </div>
  </div>
</>


  );
}

