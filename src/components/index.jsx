import React, { useState, useEffect } from "react";
import "./index.css";
import { TriaWalletButton } from "./TriaWalletButton";
import WalletCloseButton from "./WalletCloseButton";
import usePageVisibility from "./usePageVisibility";
import Draggable, { DraggableCore } from "react-draggable";
const authUrl = "https://auth.tria.so";

const initialChains = [
  "POLYGON",
  "ARBITRUM",
  "FUSE",
  "AVALANCHE",
  "BINANCE",
  "ETH",
  "FANTOM",
  "OPTIMISM",
];

const Application = ({
  dappName,
  dappDomain,
  uiType,
  logo,
  primaryColor = "#A855F7",
  supportedChains = initialChains,
  defaultChain = "POLYGON",
  darkMode = true,
}) => {
  //  const [isPressed, setIsPressed] = useState(false);
  const ringsStyle = (duration, delay) => ({
    opacity: 0,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: "-8px",
    left: "-8px",
    right: 0,
    bottom: 0,
    content: "''",
    height: "100%",
    width: "100%",
    border: "8px solid rgba(0,0,0,0.2)",
    borderRadius: "100%",
    animationName: "ripple",
    animationDuration: duration,
    animationDelay: delay,
    animationIterationCount: "infinite",
    animationTimingFunction: "cubic-bezier(.65,0,.34,1)",
    zIndex: -1,
  });

  const requestLoaderStyle = {
    display: "flex",
    cursor: "move",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: "60px",
    width: "60px",
    borderRadius: "100%",
    background: "#FFFFFF",
    //  boxShadow: isPressed ? '0 0 10px 0 rgba(0,0,0,0.2)' : '0 0 20px 0 rgba(0,0,0,0.25)',
    // transform: isPressed ? 'scale(0.80)' : 'scale(1)',
    transition: "all 0.1s ease",
    cursor: "pointer",
    zIndex: "9999",
  };

  const [view, setView] = useState("Home");
  const [triaName, setTriaName] = useState();
  const [userAddress, setUserAddress] = useState(null);
  const [email, setEmail] = useState("");
  const [showWallet, setShowWallet] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [appDomain, setAppDomain] = useState();
  const [iframeURL, setIframeURL] = useState();
  const WALLET_BASE_URL = "https://jade-gingersnap-930e55.netlify.app/";
  const [accessToken, setAccessToken] = useState();
  const [authIFrameUrl, setAuthIFrameUrl] = useState("");
  const account = "triaName";
  const [stackui, setStackUi] = useState(false);
  const [wasOpen, setWasOpen] = useState(false);
  const [walletVisible, setWalletVisible] = useState(false);
  const isTabVisible = usePageVisibility();
  const [isAnimating, setIsAnimating] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [currentTime, setCurrentTime] = useState();

  useEffect(() => {
    if (!isTabVisible && showWallet) {
      setShowWallet(false);
      setWasOpen(true);
    } else if (wasOpen) {
      setShowWallet(true); // Or any other logic when the tab is back in focus
    }
  }, [isTabVisible]);
  useEffect(() => {
    if (!account && triaName) {
      console.log("Account is null, reloading the page");
      localStorage.setItem("hasReloaded", "true");
      window.location.reload();
    }
  }, [account, triaName]);

  const handleStartDragging = () => {
    var now = new Date();
    setCurrentTime(now.getTime());
    console.log(buttonPosX, buttonPosY);
    // alert(now.getTime())
  };
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [buttonPosition, setButtonPosition] = useState({ x: 400, y: 400 });
  const [posX, setPosX] = useState();
  const [posY, setPosY] = useState();
  const [buttonPosX, setButtonPosX] = useState(window.innerWidth - 100);
  const [buttonPosY, setButtonPosY] = useState(window.innerHeight - 100);
  const buttonBoundRight = window.innerWidth - 134;
  const buttonBoundBottom = window.innerHeight - 134;
  useEffect(() => {
    const handleWindowMouseMove = (event) => {
      setCoords({
        x: event.clientX,
        y: event.clientY,
      });
    };
    window.addEventListener("mousemove", handleWindowMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleWindowMouseMove);
    };
  }, []);

  const handleStopDragging = () => {
    var now = new Date();
    console.log(coords);
    console.log(window.innerWidth);
    console.log(window.innerHeight);

    // console.log(first)
    if (
      window.innerWidth - coords.x < 312 &&
      window.innerHeight - coords.y < 586
    ) {
      setPosX(window.innerWidth - 312);
      setPosY(window.innerHeight - 586);
    } else if (window.innerWidth - coords.x < 312) {
      setPosX(window.innerWidth - 312);
      setPosY(coords.y);
    } else if (window.innerHeight - coords.y < 586) {
      setPosX(coords.x);
      setPosY(window.innerHeight - 586);
    } else {
      setPosX(coords.x);
      setPosY(coords.y);
    }
    if (now.getTime() - currentTime < 200) {
      handleWalletButtonClick();
      setButtonPosX(coords.x - (coords.x - buttonPosX));
      setButtonPosY(coords.y - (coords.y - buttonPosY));
    } else {
      if (
        window.innerWidth - coords.x < 100 &&
        window.innerHeight - coords.y < 100
      ) {
        setButtonPosX(coords.x - 100);
        setButtonPosY(coords.y - 100);
      } else if (window.innerWidth - coords.x < 100) {
        setButtonPosX(coords.x - 100);
        setButtonPosY(coords.y);
      } else if (window.innerHeight - coords.y < 100) {
        setButtonPosY(coords.y - 100);
        setButtonPosX(coords.x);
      } else if (coords.x < 100) {
        setButtonPosY(coords.y);
        setButtonPosX(coords.x + 100);
      } else if (coords.y < 100) {
        setButtonPosY(coords.y + 100);
        setButtonPosX(coords.x);
      } else if (coords.x < 100 && coords.y < 100) {
        setButtonPosX(coords.x + 100);
        setButtonPosY(coords.y + 100);
      } else {
        setButtonPosX(coords.x);
        setButtonPosY(coords.y);
      }
    }
  };
  const [isPressed, setIsPressed] = useState(false);
  // const [x, setX] = useState(0);
  // const [y, setY] = useState(0);

  //   const handleStartDragging = (e) => {
  //   // setIsPressed(true);
  //   // setX(e.clientX);
  //   // setY(e.clientY);
  // };

  // const handleStopDragging = (e) => {
  //   // setIsPressed(false);
  //   setX(e.clientX);
  //   setY(e.clientY);
  // };

  const handleMouseMove = (e) => {
    if (isPressed) {
      console.log(e.clientX, e.clientY);
    }
  };

  useEffect(() => {
    setInterval(() => {
      // console.log('account', account)
      if (localStorage.getItem("tria.wallet.store") !== null) {
        setShowOnboarding(false);
        setTriaName(
          JSON.parse(localStorage.getItem("tria.wallet.store") || "")?.triaName,
        );
        setUserAddress(
          JSON.parse(localStorage.getItem("tria.wallet.store") || "")?.evm
            ?.address,
        );
      } else if (localStorage.getItem("wagmi.connected") === "true") {
        setShowOnboarding(false);
        const wallet = localStorage.getItem("wagmi.connected");
        console.log(wallet);
      } else {
        setShowOnboarding(true);
      }
    }, 500);
  }, []);
  useEffect(() => {
    setInterval(() => {
      setShowOnboarding(true);
    }, 1000);
  }, []);

  useEffect(() => {
    const item = localStorage.getItem("access_token");
    setAccessToken(item || "");
    setAppDomain(window.parent.origin);
  }, [triaName]);

  const fromDapp = true;

  useEffect(() => {
    const encodedParams = btoa(
      JSON.stringify({
        triaName,
        userAddress,
        appDomain,
        darkMode,
        logo,
        accessToken,
        primaryColor,
        fromDapp,
        dappName,
        defaultChain,
        supportedChains,
      }),
    );
    console.log(
      encodedParams,
      userAddress,
      triaName,
      accessToken,
      logo,
      appDomain,
      darkMode,
      primaryColor,
      fromDapp,
      dappName,
      defaultChain,
      supportedChains,
    );
    setIframeURL(`https://wallet.tria.so/${encodedParams}`);
  }, [triaName, userAddress]);

  useEffect(() => {
    console.log("WALLET URL ---->", iframeURL);
  }, [iframeURL]);

  useEffect(() => {
    console.log("log from sdk ----->", dappName, logo);
    if (dappName && dappName?.length > 0 && logo && logo?.length > 0) {
      setAuthIFrameUrl(
        `https://auth.tria.so/?dappName=${dappName}&dappLogo=${logo}&stackui=${uiType}&dappDomain=${dappDomain}`,
      );
    }
  }, [dappName, logo]);

  useEffect(() => {
    if (uiType === "yes") {
      setStackUi(true);
    }
  }, [uiType]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      const iframeElement = document.getElementById("triaWallet"); // Use the actual ID or selector of your iframe

      if (iframeElement && !iframeElement.contains(event.target)) {
        setWalletVisible(false);
      }
    };

    // Attach the event listener to the document
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up the event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (primaryColor) {
      document.documentElement.style.setProperty(
        "--primary-color",
        primaryColor,
      );
    }
  }, [primaryColor]);

  const handleWalletButtonClick = () => {
    if (!dragging) {
      setIsAnimating(true);
      setWalletVisible(true);

      // Set a timeout for the duration of the animation
      setTimeout(() => {
        setIsAnimating(false);
      }, 400); // assuming the animation takes 1 second

      if (showWallet) {
        setWalletVisible(true);
      } else {
        setShowWallet(true);
        setWalletVisible(true);
      }
    }
  };

  return (
    <>
      {!triaName && showOnboarding && (
        <div
          style={{
            borderRadius: "20px",
            overflow: "hidden",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          {/* <iframe
            width='314'
            height='586'
            src={authIFrameUrl}
            allow='publickey-credentials-get'
          /> */}
        </div>
      )}
      {showWallet && triaName && userAddress && (
        <div
          id="triaWallet"
          style={{
            display: walletVisible ? "block" : "none",
            backgroundColor: "transparent",
            position: "fixed",
            zIndex: 9999,
            borderRadius: "20px",
            top: posY,
            left: posX,
            transition: "all 1s ease",
          }}
        >
          <div
            style={{
              position: "relative",
              borderRadius: "20px",
            }}
          >
            <div
              style={{
                position: "absolute",
                width: "312px",
                height: "40px",
                borderRadius: "20px",
                top: "-33px",
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "center",
              }}
            >
              <div
                onClick={() => {
                  setWalletVisible(false);
                }}
                style={{ cursor: "pointer", backgroundColor: "transparent" }}
              >
                <WalletCloseButton bgColor={"#404040"} />
              </div>
            </div>
            <div
              style={{
                height: "586px",
                width: "312px",
                borderRadius: "20px",
                overflow: "hidden",

                boxShadow: `${
                  darkMode
                    ? `0px 0px 10px 1px #40404044`
                    : `0px 0px 10px 1px #10101044`
                }`,
                borderColor: `${darkMode ? `#40404044` : `#10101044`}`,
                borderWidth: "2px",
                borderStyle: "solid",
                padding: 0,
              }}
            >
              <iframe
                width="312"
                height="586"
                src={iframeURL}
                allow="clipboard-read; clipboard-write; publickey-credentials-get"
                style={{ border: 0 }}
              />
            </div>
          </div>
        </div>
      )}

      {triaName && (
        <Draggable
          defaultPosition={{ x: buttonPosX, y: buttonPosY }}
          onStart={handleStartDragging}
          onStop={handleStopDragging}
          bounds={{
            top: 0,
            left: 0,
            right: buttonBoundRight,
            bottom: buttonBoundBottom,
          }}
          classname="draggable-button"
        >
          <div
            style={{
              cursor: "pointer",
              zIndex: 9999,
              border: "1px",
              borderColor: "white",
            //  backgroundColor: "red",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100px",
              height: "100px",
              borderRadius: "50px",
              overflow: "hidden",
            }}
          >
           <TriaWalletButton bgColor={primaryColor || "#A855F7"} /> 
          </div>
        </Draggable>

        // <div className="request-loader"
        //   // style={{
        //   //   position: 'fixed',
        //   //   maxWidth: '80px',
        //   //   width: "auto",
        //   //   bottom: '4px',
        //   //   right: '60px',
        //   //   cursor: 'pointer',
        //   //   marginTop: "25px",
        //   //   height: "150px",
        //   //   zIndex: 9999,
        //   // }}
        //   onClick={handleWalletButtonClick}
        // >

        // </div>
      )}
    </>
  );
};

export default Application;
