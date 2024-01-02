import React from 'react'

const WalletCloseButton = ({ bgColor }) => {
  const hexToRGB = (hex) => {
    const r = parseInt(hex.slice(1, 3), 16)
    const g = parseInt(hex.slice(3, 5), 16)
    const b = parseInt(hex.slice(5, 7), 16)
    return { r, g, b }
  }

  // Get the RGB components of the provided bgColor
  const rgbColor = hexToRGB(bgColor)
  return (
    <svg
      width='110'
      height='38'
      viewBox='0 0 110 38'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <defs>
        <filter
          id='dynamic-shadow-wallet'
          x='0'
          y='0'
          width='180'
          height='180'
          filterUnits='userSpaceOnUse'
          color-interpolation-filters='sRGB'
        >
          <feDropShadow
            dx='0'
            dy='-3'
            stdDeviation='1'
            floodColor={`rgb(${rgbColor.r},${rgbColor.g},${rgbColor.b})`}
            floodOpacity='0.04'
          />
        </filter>
        {/* ...other defs content... */}
      </defs>
      <g filter='url(#dynamic-shadow-wallet)'>
        <path
          d='M0 35H2.34523C11.1426 35 19.6355 31.7787 26.22 25.9443L30.9961 21.7123C44.8891 9.4021 65.8643 9.67334 79.4343 22.3387L82.6264 25.318C89.2925 31.5397 98.0714 35 107.19 35H110V37.5H0V35Z'
          fill='#101010'
        />
        <path
          d='M60.9401 22.2125L56.0501 27.1025C55.4726 27.68 54.5276 27.68 53.9501 27.1025L49.0601 22.2125'
          stroke='#FAFAFA'
          strokeOpacity='0.8'
          strokeWidth='1.5'
          strokeMiterlimit='10'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </g>
    </svg>
  )
}

export default WalletCloseButton
