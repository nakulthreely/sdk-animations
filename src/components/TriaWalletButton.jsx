import React, { useState } from 'react'

export const TriaWalletButton = ({ bgColor, stackui }) => {
  const hexToRGB = (hex) => {
    const r = parseInt(hex.slice(1, 3), 16)
    const g = parseInt(hex.slice(3, 5), 16)
    const b = parseInt(hex.slice(5, 7), 16)
    return { r, g, b }
  }

  // Get the RGB components of the provided bgColor
  const rgbColor = hexToRGB(bgColor)

  return (
    <>
      {!stackui && (
        <div>
          <svg
            width='134'
            height='134'
            viewBox='0 0 134 134'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <defs>
              <filter
                id='dynamic-shadow'
                x='0'
                y='0'
                width='180'
                height='180'
                filterUnits='userSpaceOnUse'
                color-interpolation-filters='sRGB'
              >
                <feDropShadow
                  dx='0'
                  dy='4'
                  stdDeviation='10'
                  floodColor={`rgb(${rgbColor.r},${rgbColor.g},${rgbColor.b})`}
                  floodOpacity='0.5'
                />
              </filter>
              {/* ...other defs content... */}
            </defs>
            <g filter='url(#dynamic-shadow)'>
              <rect
                x='35'
                y='35'
                width='64'
                height='64'
                rx='32'
                fill='#101010'
              />
            </g>
            <g filter='url(#dynamic-shadow)'>
              <rect
                x='37.5098'
                y='37.5098'
                width='58.9804'
                height='58.9804'
                rx='29.4902'
                fill='url(#paint1_linear_1316_13027)'
                shape-rendering='crispEdges'
              />
              <g clip-path='url(#clip0_1316_13027)'>
                <path
                  fill-rule='evenodd'
                  clip-rule='evenodd'
                  d='M81 53H53V81H81V53ZM67.8533 61.2654V64.9058L73.8652 62.5352V65.2285C73.8652 65.8062 73.5281 66.3228 73.0206 66.5229L67.8533 68.5606V65.8728C67.8498 65.2986 67.5136 64.7863 67.0087 64.5872L62.686 62.8826C62.1784 62.6824 61.8414 62.1658 61.8414 61.5881V58.8948L67.8533 61.2654ZM67.8533 68.5767V69.2782H67.8618V76.8857H65.3848V71.2581L62.686 70.1938C62.1784 69.9937 61.8414 69.4771 61.8414 68.8993V66.206L67.8533 68.5767Z'
                  fill='#101010'
                />
              </g>
              <rect
                x='37.7598'
                y='37.7598'
                width='58.4804'
                height='58.4804'
                rx='29.2402'
                stroke={bgColor}
                stroke-width='0.5'
                shape-rendering='crispEdges'
              />
            </g>
            <defs>
              <filter
                id='filter0_d_1316_13027'
                x='0'
                y='0'
                width='134'
                height='134'
                filterUnits='userSpaceOnUse'
                color-interpolation-filters='sRGB'
              >
                <feFlood flood-opacity='0' result='BackgroundImageFix' />
                <feColorMatrix
                  in='SourceAlpha'
                  type='matrix'
                  values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
                  result='hardAlpha'
                />
                <feOffset />
                <feGaussianBlur stdDeviation='17.5' />
                <feComposite in2='hardAlpha' operator='out' />
                <feColorMatrix
                  type='matrix'
                  values='0 0 0 0 0.567674 0 0 0 0 0.48 0 0 0 0 1 0 0 0 0.35 0'
                />
                <feBlend
                  mode='normal'
                  in2='BackgroundImageFix'
                  result='effect1_dropShadow_1316_13027'
                />
                <feBlend
                  mode='normal'
                  in='SourceGraphic'
                  in2='effect1_dropShadow_1316_13027'
                  result='shape'
                />
              </filter>
              <filter
                id='filter1_d_1316_13027'
                x='6.50977'
                y='6.50977'
                width='120.98'
                height='120.98'
                filterUnits='userSpaceOnUse'
                color-interpolation-filters='sRGB'
              >
                <feFlood flood-opacity='0' result='BackgroundImageFix' />
                <feColorMatrix
                  in='SourceAlpha'
                  type='matrix'
                  values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
                  result='hardAlpha'
                />
                <feOffset />
                <feGaussianBlur stdDeviation='15.5' />
                <feComposite in2='hardAlpha' operator='out' />
                <feColorMatrix
                  type='matrix'
                  values='0 0 0 0 0.567674 0 0 0 0 0.48 0 0 0 0 1 0 0 0 0.68 0'
                />
                <feBlend
                  mode='normal'
                  in2='BackgroundImageFix'
                  result='effect1_dropShadow_1316_13027'
                />
                <feBlend
                  mode='normal'
                  in='SourceGraphic'
                  in2='effect1_dropShadow_1316_13027'
                  result='shape'
                />
              </filter>
              <linearGradient
                id='paint0_linear_1316_13027'
                x1='35'
                y1='35'
                x2='112.218'
                y2='65.1631'
                gradientUnits='userSpaceOnUse'
              >
                <stop stop-color='#101010' />
                <stop offset='1' stop-color={bgColor} />
              </linearGradient>
              <linearGradient
                id='paint1_linear_1316_13027'
                x1='37.5098'
                y1='37.5098'
                x2='108.671'
                y2='65.3071'
                gradientUnits='userSpaceOnUse'
              >
                <stop stop-color={bgColor} />
                <stop offset='1' stop-color={bgColor} />
              </linearGradient>
              <clipPath id='clip0_1316_13027'>
                <rect
                  x='53'
                  y='53'
                  width='28'
                  height='28'
                  rx='6'
                  fill='#101010'
                />
              </clipPath>
            </defs>
          </svg>
        </div>
      )}
      {stackui && (
        <div>
          <svg
            width='134'
            height='134'
            viewBox='0 0 134 134'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            {/* <defs>
          <filter id="dynamic-shadow" x="0" y="0" width="180" height="180" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
            <feDropShadow dx="0" dy="4" stdDeviation="20" floodColor={`rgb(${rgbColor.r},${rgbColor.g},${rgbColor.b})`} floodOpacity="0.5" />
          </filter>
          {/* ...other defs content... 
        </defs> */}
            <g filter=''>
              <rect
                x='35'
                y='35'
                width='64'
                height='64'
                rx='32'
                fill='#101010'
              />
            </g>
            <g filter=''>
              <rect
                x='37.5098'
                y='37.5098'
                width='58.9804'
                height='58.9804'
                rx='29.4902'
                fill='#AAFF00'
                shape-rendering='crispEdges'
              />
              <g clip-path='url(#clip0_1316_13027)'>
                <path
                  fill-rule='evenodd'
                  clip-rule='evenodd'
                  d='M81 53H53V81H81V53ZM67.8533 61.2654V64.9058L73.8652 62.5352V65.2285C73.8652 65.8062 73.5281 66.3228 73.0206 66.5229L67.8533 68.5606V65.8728C67.8498 65.2986 67.5136 64.7863 67.0087 64.5872L62.686 62.8826C62.1784 62.6824 61.8414 62.1658 61.8414 61.5881V58.8948L67.8533 61.2654ZM67.8533 68.5767V69.2782H67.8618V76.8857H65.3848V71.2581L62.686 70.1938C62.1784 69.9937 61.8414 69.4771 61.8414 68.8993V66.206L67.8533 68.5767Z'
                  fill='#101010'
                />
              </g>
              <rect
                x='37.7598'
                y='37.7598'
                width='58.4804'
                height='58.4804'
                rx='29.2402'
                stroke={bgColor}
                stroke-width='0.5'
                shape-rendering='crispEdges'
              />
            </g>
            <defs>
              <filter
                id='filter0_d_1316_13027'
                x='0'
                y='0'
                width='134'
                height='134'
                filterUnits='userSpaceOnUse'
                color-interpolation-filters='sRGB'
              >
                <feFlood flood-opacity='0' result='BackgroundImageFix' />
                <feColorMatrix
                  in='SourceAlpha'
                  type='matrix'
                  values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
                  result='hardAlpha'
                />
                <feOffset />
                <feGaussianBlur stdDeviation='17.5' />
                <feComposite in2='hardAlpha' operator='out' />
                <feColorMatrix
                  type='matrix'
                  values='0 0 0 0 0.567674 0 0 0 0 0.48 0 0 0 0 1 0 0 0 0.35 0'
                />
                <feBlend
                  mode='normal'
                  in2='BackgroundImageFix'
                  result='effect1_dropShadow_1316_13027'
                />
                <feBlend
                  mode='normal'
                  in='SourceGraphic'
                  in2='effect1_dropShadow_1316_13027'
                  result='shape'
                />
              </filter>
              <filter
                id='filter1_d_1316_13027'
                x='6.50977'
                y='6.50977'
                width='120.98'
                height='120.98'
                filterUnits='userSpaceOnUse'
                color-interpolation-filters='sRGB'
              >
                <feFlood flood-opacity='0' result='BackgroundImageFix' />
                <feColorMatrix
                  in='SourceAlpha'
                  type='matrix'
                  values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
                  result='hardAlpha'
                />
                <feOffset />
                <feGaussianBlur stdDeviation='15.5' />
                <feComposite in2='hardAlpha' operator='out' />
                <feColorMatrix
                  type='matrix'
                  values='0 0 0 0 0.567674 0 0 0 0 0.48 0 0 0 0 1 0 0 0 0.68 0'
                />
                <feBlend
                  mode='normal'
                  in2='BackgroundImageFix'
                  result='effect1_dropShadow_1316_13027'
                />
                <feBlend
                  mode='normal'
                  in='SourceGraphic'
                  in2='effect1_dropShadow_1316_13027'
                  result='shape'
                />
              </filter>
              <linearGradient
                id='paint0_linear_1316_13027'
                x1='35'
                y1='35'
                x2='112.218'
                y2='65.1631'
                gradientUnits='userSpaceOnUse'
              >
                <stop stop-color='#101010' />
                <stop offset='1' stop-color={bgColor} />
              </linearGradient>
              <linearGradient
                id='paint1_linear_1316_13027'
                x1='37.5098'
                y1='37.5098'
                x2='108.671'
                y2='65.3071'
                gradientUnits='userSpaceOnUse'
              >
                <stop stop-color={bgColor} />
                <stop offset='1' stop-color={bgColor} />
              </linearGradient>
              <clipPath id='clip0_1316_13027'>
                <rect
                  x='53'
                  y='53'
                  width='28'
                  height='28'
                  rx='6'
                  fill='#101010'
                />
              </clipPath>
            </defs>
          </svg>
        </div>
      )}
    </>
  )
}
