import React, { useContext } from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
//import NavContext from '../NavContext';
import { useConnect } from 'wagmi';

 
const Wallets= ({ setShowMetaMask }) => {

  

    // const [showWallet, setShowWallet] = useState(false);
    const { connect, connectors } = useConnect();

    console.log("Wallet page")

    const clickMetamask = async () => {
        try {

            if (!window.ethereum || !window.ethereum.isMetaMask) {
                console.log("inside not metamask");
                throw new Error("MetaMask not available");
              }
    
            console.log("Clicked");
            const res = connect({ connector: connectors[2] });
            console.log("res",res);
          } catch (err) {
            console.log("err",err);
            setShowMetaMask();
          }
    };

    const clickWc = () => {
        console.log("Clicked")
        connect({ connector: connectors[1] })
    }

    const containerStyles = {
        display: 'inline-flex',
        alignSelf: 'stretch',
        justifyContent: 'start',
        alignItems: 'center',
        width: "100%",
        gap: "18px",
        marginLeft: "5px"
    };

    const buttonStyles = {
        flexGrow: '0',
        flexShrink: '1',
        flexBasis: '0',
        height: '64px',
        paddingLeft: '1px',
        paddingRight: '1px',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '8px',
        display: 'flex'
    };

    const innerButtonStyles = {
        flexGrow: '0',
        flexShrink: '1',
        flexBasis: '0',
        height: '40px',
        paddingLeft: '2px',
        paddingRight: '2px',
        borderRadius: '20px',
        justifyContent: 'flex-start',
        alignItems: 'center',
        display: 'flex',
        gap: "2px"
    };

  

    return (
        <div style={containerStyles}>
            <button onClick={clickMetamask}>
                <div style={buttonStyles}>
                    <div style={innerButtonStyles}>
                        <div style={{ width: '40px', height: '40px', padding: '6px', backgroundColor: 'white', borderRadius: '28px', boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.15)' }}>
                            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect width="28" height="28" rx="6" fill="white" />
                                <path d="M24.0892 3.12012L15.3447 9.61478L16.9618 5.78302L24.0892 3.12012Z" fill="#E2761B" stroke="#E2761B" stroke-width="0.0878845" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M3.9021 3.12012L12.5763 9.6763L11.0383 5.78302L3.9021 3.12012Z" fill="#E4761B" stroke="#E4761B" stroke-width="0.0878845" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M20.943 18.1748L18.614 21.7429L23.5971 23.1139L25.0296 18.2539L20.943 18.1748Z" fill="#E4761B" stroke="#E4761B" stroke-width="0.0878845" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M2.97925 18.2539L4.40298 23.1139L9.38603 21.7429L7.05709 18.1748L2.97925 18.2539Z" fill="#E4761B" stroke="#E4761B" stroke-width="0.0878845" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M9.10488 12.1458L7.71631 14.2462L12.6642 14.4659L12.4884 9.14893L9.10488 12.1458Z" fill="#E4761B" stroke="#E4761B" stroke-width="0.0878845" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M18.8862 12.1458L15.4587 9.0874L15.3445 14.4659L20.2836 14.2462L18.8862 12.1458Z" fill="#E4761B" stroke="#E4761B" stroke-width="0.0878845" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M9.38599 21.7429L12.3565 20.2928L9.79025 18.2891L9.38599 21.7429Z" fill="#E4761B" stroke="#E4761B" stroke-width="0.0878845" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M15.6345 20.2928L18.6138 21.7429L18.2007 18.2891L15.6345 20.2928Z" fill="#E4761B" stroke="#E4761B" stroke-width="0.0878845" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M18.6138 21.7426L15.6345 20.2925L15.8718 22.2347L15.8454 23.0521L18.6138 21.7426Z" fill="#D7C1B3" stroke="#D7C1B3" stroke-width="0.0878845" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M9.38599 21.7426L12.1543 23.0521L12.1368 22.2347L12.3565 20.2925L9.38599 21.7426Z" fill="#D7C1B3" stroke="#D7C1B3" stroke-width="0.0878845" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M12.1983 17.0058L9.71997 16.2763L11.4689 15.4766L12.1983 17.0058Z" fill="#233447" stroke="#233447" stroke-width="0.0878845" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M15.7927 17.0058L16.5222 15.4766L18.2799 16.2763L15.7927 17.0058Z" fill="#233447" stroke="#233447" stroke-width="0.0878845" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M9.38607 21.7424L9.80791 18.1743L7.05713 18.2534L9.38607 21.7424Z" fill="#CD6116" stroke="#CD6116" stroke-width="0.0878845" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M18.1921 18.1743L18.614 21.7424L20.9429 18.2534L18.1921 18.1743Z" fill="#CD6116" stroke="#CD6116" stroke-width="0.0878845" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M20.2838 14.2461L15.3447 14.4658L15.8017 17.0057L16.5312 15.4765L18.2889 16.2762L20.2838 14.2461Z" fill="#CD6116" stroke="#CD6116" stroke-width="0.0878845" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M9.72007 16.2762L11.4778 15.4765L12.1984 17.0057L12.6642 14.4658L7.71631 14.2461L9.72007 16.2762Z" fill="#CD6116" stroke="#CD6116" stroke-width="0.0878845" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M7.71631 14.2461L9.79038 18.2888L9.72007 16.2762L7.71631 14.2461Z" fill="#E4751F" stroke="#E4751F" stroke-width="0.0878845" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M18.2888 16.2762L18.2009 18.2888L20.2838 14.2461L18.2888 16.2762Z" fill="#E4751F" stroke="#E4751F" stroke-width="0.0878845" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M12.6643 14.4658L12.1985 17.0057L12.7785 20.0025L12.9103 16.0565L12.6643 14.4658Z" fill="#E4751F" stroke="#E4751F" stroke-width="0.0878845" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M15.3447 14.4658L15.1074 16.0477L15.2129 20.0025L15.8017 17.0057L15.3447 14.4658Z" fill="#E4751F" stroke="#E4751F" stroke-width="0.0878845" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M15.8017 17.0058L15.2129 20.0027L15.6347 20.2927L18.201 18.2889L18.2888 16.2764L15.8017 17.0058Z" fill="#F6851B" stroke="#F6851B" stroke-width="0.0878845" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M9.71997 16.2764L9.79028 18.2889L12.3565 20.2927L12.7784 20.0027L12.1983 17.0058L9.71997 16.2764Z" fill="#F6851B" stroke="#F6851B" stroke-width="0.0878845" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M15.8455 23.0522L15.8719 22.2348L15.6522 22.0415H12.3389L12.1368 22.2348L12.1543 23.0522L9.38599 21.7427L10.3527 22.5336L12.3125 23.8958H15.6785L17.6471 22.5336L18.6139 21.7427L15.8455 23.0522Z" fill="#C0AD9E" stroke="#C0AD9E" stroke-width="0.0878845" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M15.6348 20.2925L15.2129 20.0024H12.7785L12.3567 20.2925L12.137 22.2347L12.3391 22.0414H15.6523L15.8721 22.2347L15.6348 20.2925Z" fill="#161616" stroke="#161616" stroke-width="0.0878845" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M24.4581 10.0366L25.2051 6.45094L24.089 3.12012L15.6345 9.39507L18.8862 12.1459L23.4826 13.4905L24.5021 12.304L24.0626 11.9877L24.7657 11.3461L24.2208 10.9243L24.9239 10.3882L24.4581 10.0366Z" fill="#763D16" stroke="#763D16" stroke-width="0.0878845" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M2.79468 6.45094L3.5417 10.0366L3.06712 10.3882L3.7702 10.9243L3.2341 11.3461L3.93718 11.9877L3.49775 12.304L4.50843 13.4905L9.10478 12.1459L12.3565 9.39507L3.90202 3.12012L2.79468 6.45094Z" fill="#763D16" stroke="#763D16" stroke-width="0.0878845" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M23.4828 13.4901L18.8864 12.1455L20.2838 14.2459L18.2009 18.2886L20.9429 18.2535H25.0296L23.4828 13.4901Z" fill="#F6851B" stroke="#F6851B" stroke-width="0.0878845" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M9.1048 12.1455L4.50844 13.4901L2.97925 18.2535H7.05709L9.7903 18.2886L7.71622 14.2459L9.1048 12.1455Z" fill="#F6851B" stroke="#F6851B" stroke-width="0.0878845" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M15.3447 14.4657L15.6347 9.39477L16.9705 5.78271H11.0383L12.3566 9.39477L12.6642 14.4657L12.7697 16.0652L12.7784 20.0024H15.2128L15.2304 16.0652L15.3447 14.4657Z" fill="#F6851B" stroke="#F6851B" stroke-width="0.0878845" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </div>
                        <div style={{ ...innerButtonStyles, paddingLeft: '8px' }}>
                            <div style={{
        textAlign: 'center',
        color: 'rgba(255, 255, 255, 0.8)',
        fontSize: '1rem',
        fontWeight: '500',
        fontFamily: 'Montserrat, sans-serif',
        lineHeight: '1.4'
    }}>Metamask</div>
                        </div>
                    </div>
                </div>
            </button>
            <button onClick={clickWc}>
                <div style={buttonStyles}>
                    <div style={{ ...innerButtonStyles, height: '40px', paddingLeft: '2px', paddingRight: '2px' }}>
                        <div style={{ width: '40px', height: '40px', padding: '6px', backgroundColor: '#007bff', borderRadius: '28px', boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.15)' }}>
                            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect width="28" height="28" rx="6" fill="#3B99FC" />
                                <path d="M8.38969 10.3737C11.4882 7.27518 16.5118 7.27518 19.6103 10.3737L19.9832 10.7466C20.1382 10.9015 20.1382 11.1527 19.9832 11.3076L18.7076 12.5833C18.6301 12.6607 18.5045 12.6607 18.4271 12.5833L17.9139 12.0701C15.7523 9.90851 12.2477 9.90851 10.0861 12.0701L9.53655 12.6197C9.45909 12.6971 9.3335 12.6971 9.25604 12.6197L7.98039 11.344C7.82547 11.1891 7.82547 10.9379 7.98039 10.783L8.38969 10.3737ZM22.2485 13.0118L23.3838 14.1472C23.5387 14.3021 23.5387 14.5533 23.3838 14.7082L18.2645 19.8275C18.1096 19.9825 17.8584 19.9825 17.7035 19.8276C17.7035 19.8276 17.7035 19.8276 17.7035 19.8276L14.0702 16.1942C14.0314 16.1555 13.9686 16.1555 13.9299 16.1942C13.9299 16.1942 13.9299 16.1942 13.9299 16.1942L10.2966 19.8275C10.1417 19.9825 9.89053 19.9825 9.73561 19.8276C9.7356 19.8276 9.7356 19.8276 9.7356 19.8276L4.61619 14.7081C4.46127 14.5532 4.46127 14.302 4.61619 14.1471L5.75152 13.0118C5.90645 12.8569 6.15763 12.8569 6.31255 13.0118L9.94595 16.6452C9.98468 16.6839 10.0475 16.6839 10.0862 16.6452C10.0862 16.6452 10.0862 16.6452 10.0862 16.6452L13.7194 13.0118C13.8743 12.8568 14.1255 12.8568 14.2805 13.0118C14.2805 13.0118 14.2805 13.0118 14.2805 13.0118L17.9139 16.6452C17.9526 16.6839 18.0154 16.6839 18.0541 16.6452L21.6874 13.0118C21.8424 12.8569 22.0936 12.8569 22.2485 13.0118Z" fill="white" />
                            </svg>
                        </div>
                        <div style={{ ...innerButtonStyles, paddingLeft: '8px' }}>
                            <div style={{
                                textAlign: 'center',
                                color: 'rgba(255, 255, 255, 0.8)',
                                fontSize: '1rem',
                                fontWeight: '500',
                                fontFamily: 'Montserrat, sans-serif',
                                lineHeight: '1.4',
                                width: "105px"
                            }}>Wallet connect</div>
                        </div>
                    </div>
                </div>
            </button>
        </div>
    )
}

export default Wallets;

