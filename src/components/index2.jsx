//@ts-nocheck
import React, { useState, useEffect } from 'react'
import './index.css'
import NavContext from './NavContext'
import { TriaWalletButton } from './TriaWalletButton'
import WalletCloseButton from './WalletCloseButton'
import { useAccount, useListenerCO } from '@tria-sdk/connect'
import Draggable from 'react-draggable'
import Wallets from './ExternalWallets'
import MetamaskBarcode from './MetamaskBarcode'
import Back from './Back'

window.Buffer = window.Buffer || require('buffer').Buffer

const authUrl = 'https://auth.tria.so'

const createEncodedData = (data) => {
  const encodedParams = btoa(JSON.stringify(data))
  return encodedParams
}

export const useTriaTransaction = () => {
  const createIframe = (iframeUrl) => {
    const iframeContainer = document.createElement('div')
    iframeContainer.id = 'triaWallet'
    iframeContainer.className =
      'bg flex justify-between bg-transparent absolute bottom-4 right-2'
    iframeContainer.style.position = 'absolute'
    iframeContainer.style.bottom = '4px'
    iframeContainer.style.right = '2px'

    const innerContainer = document.createElement('div')
    innerContainer.className = 'mb-4 mr-2 relative rounded-[20px]'

    const iframeWrapper = document.createElement('div')
    iframeWrapper.className =
      'h-[586px] w-[312px] rounded-[20px] overflow-hidden'

    const iframe = document.createElement('iframe')
    iframe.width = '312'
    iframe.height = '586'
    iframe.src = iframeUrl
    iframe.allow = 'publickey-credentials-get'
    iframe.style.border = 'none'

    // Append elements to construct the desired structure
    iframeWrapper.appendChild(iframe)
    innerContainer.appendChild(iframeWrapper)
    iframeContainer.appendChild(innerContainer)

    // Append iframeContainer to the document body or a specific container
    document.body.appendChild(iframeContainer)

    // Return any relevant data if needed
  }

  const sendTransaction = async (sendDataFromDapp) => {
    const iframeEncodedData = createEncodedData(sendDataFromDapp)
    const sendIframeUrl = `${authUrl}/send/${iframeEncodedData}`
    const iframe = createIframe(sendIframeUrl)
    return sendIframeUrl
  }

  const signMessage = async (message) => {
    const iframeEncodedData = createEncodedData(message)
    const signIframeUrl = `${authUrl}/signMessage/${iframeEncodedData}`
    const iframe = createIframe(signIframeUrl)
    return signIframeUrl
  }

  const callContract = async (data) => {
    const iframeEncodedData = createEncodedData(data)
    const signIframeUrl = `${authUrl}/mint/${iframeEncodedData}`
    const iframe = createIframe(signIframeUrl)
    return signIframeUrl
  }
  return {
    sendTransaction,
    signMessage,
    callContract,
  }
}

export const TriaConnectProvider = ({ triaStaging = false }) => {
  const [renderAuthIframe, setRenderAuthIframe] = useState(false)
  const [authIframeSrc, setAuthIframeSrc] = useState('')
  useEffect(() => {
    // Function to get the value of a URL parameter
    const getQueryParam = (param) => {
      return new URLSearchParams(window.location.search).get(param)
    }

    // Check if the URL parameter is as expected
    const isVerified = getQueryParam('verified') === 'true'
    setRenderAuthIframe(isVerified)
    {
      triaStaging
        ? setAuthIframeSrc('https://auth-tria.vercel.app/verified')
        : setAuthIframeSrc('https://auth.tria.so/verified')
    }
  }, [])
  return (
    <>
      {renderAuthIframe && (
        <iframe
          src={authIframeSrc}
          title='Auth Verification'
          style={{ display: 'none' }}
        />
      )}
    </>
  )
}

const initialChains = [
  'POLYGON',
  'ARBITRUM',
  'FUSE',
  'AVALANCHE',
  'BINANCE',
  'ETH',
  'FANTOM',
  'OPTIMISM',
]

const Application = ({
  dappName,
  dappDomain,
  uiType,
  logo,
  primaryColor = '#A855F7',
  supportedChains = initialChains,
  defaultChain = 'POLYGON',
  triaStaging = false,
  buttonPosition = { x: 100, y: 100 },
  darkMode = true,
}) => {
  const [view, setView] = useState('Home')
  const [triaName, setTriaName] = useState()
  const [userAddress, setUserAddress] = useState(null)
  const [email, setEmail] = useState('')
  const [showWallet, setShowWallet] = useState(false)
  const [showOnboarding, setShowOnboarding] = useState(false)
  const [appDomain, setAppDomain] = useState()
  const [iframeURL, setIframeURL] = useState()
  const [accessToken, setAccessToken] = useState()
  const [authIFrameUrl, setAuthIFrameUrl] = useState('')
  const { account } = useAccount()
  const [stackui, setStackUi] = useState(false)
  const [wasOpen, setWasOpen] = useState(false)
  const [externalWallet, setExternalWallet] = useState(false)
  const [coords, setCoords] = useState({ x: 0, y: 0 })
  const [walletVisible, setWalletVisible] = useState(false)
  const [showMetamask, setShowMetaMask] = useState(false)
  const [posX, setPosX] = useState(window.innerWidth - 350)
  const [posY, setPosY] = useState(window.innerHeight - 600)
  const [buttonPosX, setButtonPosX] = useState(
    window.innerWidth - (buttonPosition?.x || 100)
  )
  const [buttonPosY, setButtonPosY] = useState(
    window.innerHeight - (buttonPosition?.y || 100)
  )
  const [currentTime, setCurrentTime] = useState()
  const buttonBoundRight = window.innerWidth - 134
  const buttonBoundBottom = window.innerHeight - 134
  useEffect(() => {
    const handleWindowMouseMove = (event) => {
      setCoords({
        x: event.clientX,
        y: event.clientY,
      })
    }
    window.addEventListener('mousemove', handleWindowMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleWindowMouseMove)
    }
  }, [])

  useEffect(() => {
    console.log(buttonPosX, buttonPosY)
  }, [buttonPosX, buttonPosY])

  const handleStartDragging = () => {
    var now = new Date()
    setCurrentTime(now.getTime())
    // alert(now.getTime())
  }

  const handleStopDragging = () => {
    var now = new Date()
    console.log(coords)
    console.log(window.innerWidth)
    console.log(window.innerHeight)

    // console.log(first)
    if (
      window.innerWidth - coords.x < 312 &&
      window.innerHeight - coords.y < 586
    ) {
      setPosX(window.innerWidth - 312)
      setPosY(window.innerHeight - 586)
    } else if (window.innerWidth - coords.x < 312) {
      setPosX(window.innerWidth - 312)
      {
        coords.y - 134 > 0 ? setPosY(coords.y - 134) : setPosY(20)
      }
    } else if (window.innerHeight - coords.y < 586) {
      {
        coords.x - 134 > 0 ? setPosX(coords.x - 134) : setPosX(10)
      }

      setPosY(window.innerHeight - 586)
    } else {
      {
        coords.x - 134 > 0 ? setPosX(coords.x - 134) : setPosX(10)
      }

      {
        coords.y - 134 > 0 ? setPosY(coords.y - 134) : setPosY(20)
      }
    }
    if (now.getTime() - (currentTime || 0) < 200) {
      handleWalletButtonClick()
      setButtonPosX(coords.x - (coords.x - buttonPosX))
      setButtonPosY(coords.y - (coords.y - buttonPosY))
    } else {
      if (
        window.innerWidth - coords.x < 100 &&
        window.innerHeight - coords.y < 100
      ) {
        setButtonPosX(coords.x - 100)
        setButtonPosY(coords.y - 100)
      } else if (window.innerWidth - coords.x < 100) {
        setButtonPosX(coords.x - 100)
        setButtonPosY(coords.y)
      } else if (window.innerHeight - coords.y < 100) {
        setButtonPosY(coords.y - 100)
        setButtonPosX(coords.x)
      } else if (coords.x < 100) {
        setButtonPosY(coords.y)
        setButtonPosX(coords.x + 100)
      } else if (coords.y < 100) {
        setButtonPosY(coords.y + 100)
        setButtonPosX(coords.x)
      } else if (coords.x < 100 && coords.y < 100) {
        setButtonPosX(coords.x + 100)
        setButtonPosY(coords.y + 100)
      } else {
        setButtonPosX(coords.x)
        setButtonPosY(coords.y)
      }
    }
  }

  useEffect(() => {
    if (!account && triaName) {
      const currentTime = new Date()
      const lastReload = localStorage.getItem('lastReload')
      if (currentTime?.getTime() - parseFloat(lastReload || '0') > 200) {
        localStorage.setItem('lastReload', currentTime?.getTime()?.toString())
        window.location.reload()
      }
    }
  }, [account, triaName])

  useEffect(() => {
    setInterval(() => {
      // console.log('account', account)
      if (localStorage.getItem('tria.wallet.store') !== null) {
        const triaLogInEvent = new Event('TriaLogIn')
        window.dispatchEvent(triaLogInEvent)
        setShowOnboarding(false)
        setTriaName(
          JSON.parse(localStorage.getItem('tria.wallet.store') || '')?.triaName
        )
        setShowWallet(true)
        setUserAddress(
          JSON.parse(localStorage.getItem('tria.wallet.store') || '')?.evm
            ?.address
        )
      } else if (localStorage.getItem('wagmi.connected') === 'true') {
        const triaLogInEvent = new Event('TriaLogIn')
        window.dispatchEvent(triaLogInEvent)
        setShowOnboarding(false)
        setExternalWallet(true)
      } else {
        setShowOnboarding(true)
      }
    }, 500)
  }, [])
  useEffect(() => {
    setInterval(() => {
      setShowOnboarding(true)
    }, 1000)
  }, [])

  useEffect(() => {
    const item = localStorage.getItem('access_token')
    setAccessToken(item || '')
    setAppDomain(window.parent.origin)
  }, [triaName])

  const fromDapp = true

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
      })
    )
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
      supportedChains
    )
    {
      triaStaging
        ? setIframeURL(
            `https://staging-tria-wallet.vercel.app/${encodedParams}`
          )
        : setIframeURL(`https://wallet.tria.so/${encodedParams}`)
    }
  }, [triaName, userAddress])

  useEffect(() => {
    console.log('WALLET URL ---->', iframeURL)
  }, [iframeURL])

  const nav_context_object = {
    view,
    setView,
    triaName,
    setTriaName,
    dappName,
    logo,
    setShowWallet,
    setShowOnboarding,
    showOnboarding,
    email,
    setEmail,
  }

  useEffect(() => {
    console.log('log from sdk ----->', dappName, logo)
    if (dappName && dappName?.length > 0 && logo && logo?.length > 0) {
      {
        triaStaging
          ? setAuthIFrameUrl(
              `https://auth-tria.vercel.app/?dappName=${dappName}&dappLogo=${logo}&stackui=${uiType}&dappDomain=${dappDomain}`
            )
          : setAuthIFrameUrl(
              `https://auth.tria.so/?dappName=${dappName}&dappLogo=${logo}&stackui=${uiType}&dappDomain=${dappDomain}`
            )
      }
    }
  }, [dappName, logo])

  useEffect(() => {
    if (uiType === 'yes') {
      setStackUi(true)
    }
  }, [uiType])

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Select the iframe element
      const iframeElement = document.getElementById('triaWallet') // Use the actual ID or selector of your iframe

      if (iframeElement && !iframeElement.contains(event.target)) {
        // The click is outside the iframe
        setWalletVisible(false)
      }
    }

    // Attach the event listener to the document
    document.addEventListener('mousedown', handleClickOutside)

    // Clean up the event listener
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  //Useeffect for wallet position

  useEffect(() => {
    const walletPosition = { posX, posY }
    localStorage.setItem('wallet.position', JSON.stringify(walletPosition))
  }, [posX, posY])

  useEffect(() => {
    if (primaryColor) {
      document.documentElement.style.setProperty(
        '--primary-color',
        primaryColor
      )
    }
  }, [primaryColor])

  //Event Data States

  const { eventData } = useListenerCO(
    triaStaging ? 'https://auth-tria.vercel.app' : 'https://auth.tria.so'
  )
  const [openNewFrame, setOpenNewFrame] = useState(false)
  const [frameUrl, setFrameUrl] = useState('')

  useEffect(() => {
    console.log('sdk event data --> ', eventData)
    var url = ''
    //@ts-ignore
    if (eventData?.message?.accountExists === false) {
      //@ts-ignore
      if (!triaStaging) {
        //@ts-ignore
        url = `https://auth.tria.so/signUpUserNameIframe/${eventData?.message?.social}/${eventData?.message?.userId}/${eventData?.message?.username}/${eventData?.message?.token}`
      } else {
        //@ts-ignore
        url = `https://auth-tria.vercel.app/signUpUserNameIframe/${eventData?.message?.social}/${eventData?.message?.userId}/${eventData?.message?.username}/${eventData?.message?.token}`
      }
      setOpenNewFrame(true)
      setFrameUrl(url)
    }
    //@ts-ignore
    if (eventData?.message?.go_back === true) {
      setOpenNewFrame(false)
    }
  }, [eventData])

  useEffect(() => {
    console.log('sdk otp event data --> ', eventData, logo, dappName)
    let url = ''
    //@ts-ignore
    if (eventData?.message?.type == 'otpLogin') {
      const encodedParams = btoa(JSON.stringify({ logo, dappName }))
      //@ts-ignore
      if (!triaStaging) {
        //@ts-ignore
        url = `https://auth.tria.so/phoneEmailOtp/?&dappName=${dappName}&dappLogo=${logo}`
      } else {
        //@ts-ignore
        url = `https://auth-tria.vercel.app/phoneEmailOtp/?&dappName=${dappName}&dappLogo=${logo}`
      }
      console.log('url---------->', url)
      setOpenNewFrame(true)
      setFrameUrl(url)
    }
  }, [eventData])

  const handleWalletButtonClick = () => {
    if (showWallet) {
      setWalletVisible(true)
    } else {
      setShowWallet(true)
      setWalletVisible(true)
    }
  }

  const containerStyles = {
    width: '416px',
    padding: '5px',
    paddingTop: '6px',
    paddingBottom: '6px',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '16px',
    display: 'inline-flex',
  }

  const innerDivStyles = {
    width: '95px',
    position: 'relative',
    backgroundColor: '#XXXXXX', // Replace XXXXXX with the appropriate color value for bg-stone-950
    borderRadius: '67.31px',
    boxShadow: '0px 0px 8px 2px rgba(100, 100, 100, 0.2)',
  }

  const imgStyles = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  }

  const absoluteDivStyles = {
    width: '14.66px',
    height: '14.66px',
    left: '40.17px',
    top: '40.17px',
    position: 'absolute',
    backgroundColor: '#XXXXXX', // Replace XXXXXX with the appropriate color value for bg-lime-400
    borderRadius: '50%',
    filter: 'blur(40.71px)',
  }

  return (
    <>
      {/* <WagmiConfig config={wagmiConfig}> */}
      {/* <NavContext.Provider value={nav_context_object}> */}
      {!triaName && showOnboarding && !externalWallet && (
        <>
          {uiType !== 'yes' ? (
            <div
              style={{
                borderRadius: '20px',
                overflow: 'hidden',
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            >
              <iframe
                width='314'
                height='586'
                src={authIFrameUrl}
                allow='publickey-credentials-get'
              />
            </div>
          ) : (
            <div
              style={{
                borderRadius: '20px',
                overflow: 'hidden',
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                fontFamily: 'Montserrat, sans-serif',
              }}
            >
              {openNewFrame === false ? (
                <div
                  style={{
                    width: '448px',
                    borderRadius: '20px', // Equivalent to rounded-2xl in Tailwind
                    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)', // Assuming similar shadow effects
                    backgroundColor: '#101010', // Equivalent to bg-[#101010] in Tailwind
                    height: '840px',
                    padding: '16px',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    display: 'inline-flex',
                    transform: 'scale(0.7)',
                    fontFamily: 'Montserrat, sans-serif',
                  }}
                >
                  {showMetamask && (
                    <div
                      style={{
                        position: 'absolute',
                        paddingTop: '4px',
                        paddingLeft: '4px',
                        cursor: 'pointer',
                      }}
                      onClick={() => setShowMetaMask(false)}
                    >
                      {' '}
                      <Back />
                    </div>
                  )}
                  <div
                    style={{
                      marginLeft: '-150px',
                      position: 'absolute',
                      top: 0,
                    }}
                  >
                    {' '}
                  </div>
                  <div
                    style={{
                      flexDirection: 'column',
                      justifyContent: 'flex-start',
                      gap: '8px', // Assuming 2px gap in Tailwind is equal to 8px in inline style
                      display: 'flex',
                    }}
                  >
                    <div>
                      <div
                        style={{
                          width: '416px',
                          height: '39.50px',
                          justifyContent: 'flex-end',
                          alignItems: 'flex-start',
                          display: 'inline-flex',
                        }}
                      ></div>
                      <div style={containerStyles}>
                        <div style={innerDivStyles}>
                          <img src={logo} alt='Logo' style={imgStyles} />
                          <div style={absoluteDivStyles}></div>
                        </div>
                        <div
                          style={{
                            alignSelf: 'stretch',
                            paddingTop: '12px',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'flex-start',
                            gap: '16px',
                            display: 'flex',
                          }}
                        >
                          <div
                            style={{
                              alignSelf: 'stretch',
                              textAlign: 'center',
                              color: 'white',
                              opacity: '0.8',
                              fontSize: '1.125rem',
                              fontWeight: '500',
                              fontFamily: 'Montserrat, sans-serif',
                              lineHeight: '1.6',
                            }}
                          >
                            Log in with {dappName}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='mt-auto'>
                    {/* <Logins /> */}
                    <div
                      style={{
                        width: '416px',
                        height: '375px',
                        padding: '4px 5px', // Adjusted padding as px-5 and py-4 in Tailwind
                        borderRadius: '20px', // Equivalent to rounded-2xl in Tailwind
                        border: '1px solid rgba(167,139,250,0.3)', // Equivalent to border-violet-400 and border-opacity-30 in Tailwind
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '8px', // Adjusted gap as gap-2 in Tailwind
                        display: 'inline-flex',
                      }}
                    >
                      {showMetamask ? (
                        <MetamaskBarcode />
                      ) : (
                        <div className=''>
                          <div className=''>
                            <div
                              style={{
                                overflow: 'hidden',
                                borderRadius: '19px',
                                width: '375px',
                              }}
                            >
                              <iframe
                                style={{
                                  marginTop: '-0.2px',
                                  marginLeft: '-3px',
                                }}
                                src={
                                  !triaStaging
                                    ? `https://auth.tria.so/SocialLoginIframe/?dappName=${dappName}&dappLogo=${logo}`
                                    : `https://auth-tria.vercel.app/SocialLoginIframe/?dappName=${dappName}&dappLogo=${logo}`
                                }
                                height={'205px'}
                                width='100%'
                              />
                            </div>
                            <div
                              style={{
                                width: '100%',
                                height: '100%',
                                paddingTop: '12px',
                                paddingBottom: '12px',
                                justifyContent: 'center',
                                alignItems: 'center',
                                gap: '8px',
                                display: 'inline-flex',
                              }}
                            >
                              <div
                                style={{
                                  flex: '1 1 0',
                                  height: '0px',
                                  border: '2px rgba(255, 255, 255, 0.10) solid',
                                }}
                              ></div>
                              <div
                                style={{
                                  paddingLeft: '8px',
                                  paddingRight: '8px',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                  display: 'flex',
                                }}
                              >
                                <div
                                  style={{
                                    textAlign: 'center',
                                    color: 'rgba(255, 255, 255, 0.40)',
                                    fontSize: '12px',
                                    fontFamily: 'Montserrat, sans-serif',
                                    fontWeight: 600,
                                    textTransform: 'uppercase',
                                    lineHeight: '14.40px',
                                    wordWrap: 'break-word',
                                  }}
                                >
                                  or
                                </div>
                              </div>
                              <div
                                style={{
                                  flex: '1 1 0',
                                  height: '0px',
                                  border: '2px rgba(255, 255, 255, 0.10) solid',
                                }}
                              ></div>
                            </div>
                            <Wallets
                              setShowMetaMask={() => {
                                setShowMetaMask(true)
                              }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div>
                    <div
                      style={{
                        width: '416px',
                        height: '43px',
                        paddingTop: '3px', // Adjusted padding as py-3 in Tailwind
                        borderRadius: '44px', // Equivalent to rounded-[44px] in Tailwind
                        justifyContent: 'center',
                        alignItems: 'center',
                        display: 'inline-flex',
                      }}
                    >
                      <div
                        style={{
                          height: '19px',
                          justifyContent: 'center',
                          alignItems: 'center',
                          display: 'flex',
                          width: '416px',
                          gap: '4px',
                        }}
                      >
                        <div
                          style={{
                            width: '19px',
                            height: '19px',
                            position: 'relative',
                            borderRadius: '5px',
                          }}
                        />
                        <svg
                          width='19'
                          height='19'
                          viewBox='0 0 19 19'
                          fill='none'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <g clip-path='url(#clip0_240_3997)'>
                            <path
                              fill-rule='evenodd'
                              clip-rule='evenodd'
                              d='M19 0H0V19H19V0ZM10.079 5.60869V8.07896L14.1585 6.47031V8.29788C14.1585 8.68991 13.9298 9.04048 13.5854 9.17628L10.079 10.559V8.73509C10.0767 8.34551 9.84853 7.99783 9.5059 7.86274L6.57263 6.70603C6.22823 6.57021 5.99951 6.21964 5.99951 5.82761V4.00003L10.079 5.60869ZM10.079 10.5699V11.0459H10.0848V16.2081H8.404V12.3894L6.57263 11.6672C6.22823 11.5314 5.99951 11.1809 5.99951 10.7888V8.96124L10.079 10.5699Z'
                              fill='#808080'
                              fill-opacity='0.4'
                            />
                          </g>
                          <defs>
                            <clipPath id='clip0_240_3997'>
                              <rect
                                width='19'
                                height='19'
                                rx='5'
                                fill='white'
                              />
                            </clipPath>
                          </defs>
                        </svg>
                        <div
                          style={{
                            textAlign: 'center',
                            color: 'rgba(128, 128, 128, 0.40)', // Equivalent to text-zinc-500, text-opacity-40 in Tailwind
                            fontSize: '0.875rem', // Equivalent to text-sm in Tailwind
                            fontWeight: '600', // Equivalent to font-semibold in Tailwind
                            fontFamily: 'Montserrat, sans-serif',
                            lineHeight: '1.8',
                          }}
                        >
                          Powered by Tria
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <iframe
                  width='314'
                  height='586'
                  src={frameUrl}
                  allow='publickey-credentials-get'
                />
              )}
            </div>
          )}
        </>
      )}
      {showWallet && triaName && userAddress && (
        <div
          id='triaWallet'
          style={{
            display: walletVisible ? 'block' : 'none',
            backgroundColor: 'transparent',
            position: 'fixed',
            zIndex: 9999,
            borderRadius: '20px',
            top: posY,
            left: posX,
            transition: 'all 1s ease',
          }}
        >
          <div
            style={{
              position: 'relative',
              borderRadius: '20px',
            }}
          >
            <div
              style={{
                position: 'absolute',
                width: '312px',
                height: '40px',
                borderRadius: '20px',
                top: '-33px',
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'center',
              }}
            >
              <div
                onClick={() => {
                  setWalletVisible(false)
                }}
                style={{ cursor: 'pointer', backgroundColor: 'transparent' }}
              >
                <WalletCloseButton bgColor={'#FFFFFF'} />
              </div>
            </div>
            <div
              style={{
                height: '586px',
                width: '312px',
                borderRadius: '20px',
                overflow: 'hidden',

                boxShadow: `${
                  darkMode
                    ? `0px 0px 10px 1px #40404044`
                    : `0px 0px 10px 1px #10101044`
                }`,
                borderColor: `${darkMode ? `#40404044` : `#10101044`}`,
                borderWidth: '2px',
                borderStyle: 'solid',
                padding: 0,
              }}
            >
              <iframe
                width='312'
                height='586'
                src={iframeURL}
                allow='clipboard-read; clipboard-write; publickey-credentials-get'
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
        >
          <div
            style={{
              cursor: 'pointer',
              zIndex: 9999,

              opacity: `${walletVisible ? 0 : 1}`,
            }}
          >
            <TriaWalletButton bgColor={primaryColor || '#A855F7'} />
          </div>
        </Draggable>
      )}
      {/* </NavContext.Provider> */}
      {/* </WagmiConfig> */}
    </>
  )
}

export default Application
