import React from 'react'

interface CryptoIconProps {
  chain: string
  className?: string
  size?: number
}

// Официальные логотипы из CDN (лицензионные)
const ICON_URLS: Record<string, string> = {
  // Ethereum - официальный логотип
  ethereum: 'https://cdn.jsdelivr.net/gh/ethereum/ethereum-brand-kit@master/logos/ETH-logo-icon.svg',
  
  // Arbitrum - официальный логотип
  arbitrum: 'https://cdn.arbitrum.io/logo-arbitrum.svg',
  
  // Optimism - официальный логотип
  optimism: 'https://community.optimism.io/images/optimism-token.svg',
  
  // Base - официальный логотип (Coinbase)
  base: 'https://assets.base.org/base-token-logo.svg',
  
  // Polygon - официальный логотип
  polygon: 'https://cdn.prod.website-files.com/62c3325a9e6dcb3cb7b5c7b6/64045edd13d13d106981d850_polygon.svg',
  
  // BSC - официальный логотип
  bsc: 'https://assets.binance.org/bnb-chain.svg',
  
  // Solana - официальный логотип
  solana: 'https://cdn.jsdelivr.net/gh/solana-labs/solana@master/docs/src/images/solana-logo.svg',
  
  // zkSync - официальный логотип
  zksync: 'https://assets.zksync.io/logos/zksync-logo.svg',
  
  // Avalanche - официальный логотип
  avalanche: 'https://assets.avax.network/logos/AVAX-logo.svg',
  
  // Fantom - официальный логотип
  fantom: 'https://assets.fantom.network/logos/fantom-logo.svg',
  
  // Cosmos - официальный логотип
  cosmos: 'https://assets.cosmos.network/logos/cosmos-hub.svg',
  
  // Gnosis - официальный логотип
  gnosis: 'https://assets.gnosischain.com/logos/gnosis-logo.svg',
  
  // Linea - официальный логотип (ConsenSys)
  lineal: 'https://assets.linea.build/logos/linea-logo.svg',
  
  // Mantle - официальный логотип
  mantle: 'https://assets.mantle.xyz/logos/mantle-logo.svg',
}

// Fallback SVG для каждой сети
const FALLBACK_ICONS: Record<string, JSX.Element> = {
  ethereum: (
    <svg viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="16" fill="#627EEA"/>
      <path d="M16 4L15.85 4.51V22.49L16 23L22 19.5L16 4Z" fill="white" fillOpacity="0.602"/>
      <path d="M16 4L10 19.5L16 23V11.85L16 4Z" fill="white"/>
    </svg>
  ),
  arbitrum: (
    <svg viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="16" fill="#28A0F0"/>
      <path d="M16 6L10 16L16 26L22 16L16 6Z" fill="white"/>
    </svg>
  ),
  optimism: (
    <svg viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="16" fill="#FF0420"/>
      <circle cx="12" cy="14" r="5" fill="white"/>
      <circle cx="20" cy="18" r="5" fill="white" fillOpacity="0.7"/>
    </svg>
  ),
  base: (
    <svg viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="16" fill="#0052FF"/>
      <path d="M10 12H22L20 20H12L10 12Z" fill="white"/>
    </svg>
  ),
  polygon: (
    <svg viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="16" fill="#8247E5"/>
      <path d="M11 10L16 7L21 10V16L16 19L11 16V10Z" fill="white"/>
    </svg>
  ),
  bsc: (
    <svg viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="16" fill="#F3BA2F"/>
      <path d="M16 8L12 12L16 16L20 12L16 8Z" fill="white"/>
    </svg>
  ),
  solana: (
    <svg viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="16" fill="url(#solana-gradient)"/>
      <defs>
        <linearGradient id="solana-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#9945FF"/>
          <stop offset="100%" stopColor="#14F195"/>
        </linearGradient>
      </defs>
      <path d="M9 12L11 10H23L21 12H9Z" fill="white"/>
      <path d="M9 16L11 14H23L21 16H9Z" fill="white"/>
      <path d="M9 20L11 18H23L21 20H9Z" fill="white"/>
    </svg>
  ),
  zksync: (
    <svg viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="16" fill="#8C8DFC"/>
      <path d="M16 8L10 14L16 20L22 14L16 8Z" fill="white"/>
    </svg>
  ),
  avalanche: (
    <svg viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="16" fill="#E84142"/>
      <path d="M16 6L8 20H12L16 13L20 20H24L16 6Z" fill="white"/>
    </svg>
  ),
  fantom: (
    <svg viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="16" fill="#13B5EC"/>
      <circle cx="16" cy="16" r="8" stroke="white" strokeWidth="3"/>
    </svg>
  ),
  cosmos: (
    <svg viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="16" fill="#2E3148"/>
      <circle cx="16" cy="16" r="6" fill="white"/>
    </svg>
  ),
  gnosis: (
    <svg viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="16" fill="#04795B"/>
      <path d="M16 8L18 11H22L19 14L20 18L16 16L12 18L13 14L10 11H14L16 8Z" fill="white"/>
    </svg>
  ),
  lineal: (
    <svg viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="16" fill="#0A0A0A"/>
      <circle cx="16" cy="16" r="12" stroke="white" strokeWidth="1.5"/>
      <circle cx="16" cy="16" r="8" stroke="white" strokeWidth="1.5"/>
      <circle cx="16" cy="16" r="2" fill="white"/>
    </svg>
  ),
  mantle: (
    <svg viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="16" fill="#00D5FF"/>
      <path d="M10 16L14 20L22 12" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  scroll: (
    <svg viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="16" fill="#000000"/>
      <path d="M8 16L12 20L20 10L24 14" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="24" cy="8" r="3" fill="white"/>
    </svg>
  ),
  blast: (
    <svg viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="16" fill="#FF8800"/>
      <path d="M16 6L18 12L24 12L19 16L21 22L16 18L11 22L13 16L8 12L14 12L16 6Z" fill="white"/>
    </svg>
  ),
  mode: (
    <svg viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="16" fill="#FF0080"/>
      <path d="M10 16L14 20L22 12L26 16" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  manta: (
    <svg viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="16" fill="#1FB6FF"/>
      <ellipse cx="16" cy="16" rx="12" ry="6" stroke="white" strokeWidth="2"/>
      <circle cx="16" cy="16" r="3" fill="white"/>
    </svg>
  ),
}

export const CryptoIcon: React.FC<CryptoIconProps> = ({ chain, className = '', size = 32 }) => {
  const chainKey = chain.toLowerCase()
  const iconUrl = ICON_URLS[chainKey]
  const fallbackIcon = FALLBACK_ICONS[chainKey] || FALLBACK_ICONS.ethereum

  const [hasError, setHasError] = React.useState(false)

  if (hasError || !iconUrl) {
    return (
      <div 
        className={className}
        style={{ width: size, height: size }}
      >
        {fallbackIcon}
      </div>
    )
  }

  return (
    <div 
      className={`relative ${className}`}
      style={{ width: size, height: size }}
    >
      <img
        src={iconUrl}
        alt={chain}
        className="w-full h-full object-contain"
        loading="lazy"
        onError={() => setHasError(true)}
      />
    </div>
  )
}

// Компонент для логотипа OmniPath в виде глаза
export const OmniPathLogo: React.FC<{ size?: number; className?: string; animated?: boolean }> = ({ 
  size = 64, 
  className = '',
  animated = true 
}) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 100 100" 
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Градиент для глаза */}
        <linearGradient id="eyeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ea580c">
            {animated && (
              <animate 
                attributeName="stop-color" 
                values="#ea580c;#f97316;#fb923c;#ea580c" 
                dur="3s" 
                repeatCount="indefinite" 
              />
            )}
          </stop>
          <stop offset="50%" stopColor="#f97316">
            {animated && (
              <animate 
                attributeName="stop-color" 
                values="#f97316;#fb923c;#f97316;#f97316" 
                dur="3s" 
                repeatCount="indefinite" 
              />
            )}
          </stop>
          <stop offset="100%" stopColor="#fb923c">
            {animated && (
              <animate 
                attributeName="stop-color" 
                values="#fb923c;#ea580c;#f97316;#fb923c" 
                dur="3s" 
                repeatCount="indefinite" 
              />
            )}
          </stop>
        </linearGradient>

        {/* Свечение */}
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>

        {/* Градиент для зрачка */}
        <radialGradient id="pupilGradient" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#000000"/>
          <stop offset="70%" stopColor="#1a1a1a"/>
          <stop offset="100%" stopColor="#ea580c"/>
        </radialGradient>
      </defs>

      {/* Внешняя форма глаза */}
      <path 
        d="M10 50 Q25 25, 50 25 Q75 25, 90 50 Q75 75, 50 75 Q25 75, 10 50 Z" 
        fill="url(#eyeGradient)"
        filter="url(#glow)"
        opacity="0.9"
      >
        {animated && (
          <animate 
            attributeName="d" 
            values="M10 50 Q25 25, 50 25 Q75 25, 90 50 Q75 75, 50 75 Q25 75, 10 50 Z;
                    M10 50 Q25 30, 50 30 Q75 30, 90 50 Q75 70, 50 70 Q25 70, 10 50 Z;
                    M10 50 Q25 25, 50 25 Q75 25, 90 50 Q75 75, 50 75 Q25 75, 10 50 Z" 
            dur="4s" 
            repeatCount="indefinite" 
          />
        )}
      </path>

      {/* Радужка */}
      <circle cx="50" cy="50" r="18" fill="url(#eyeGradient)">
        {animated && (
          <animate 
            attributeName="r" 
            values="18;17;18" 
            dur="2s" 
            repeatCount="indefinite" 
          />
        )}
      </circle>

      {/* Зрачок */}
      <circle cx="50" cy="50" r="10" fill="url(#pupilGradient)">
        {animated && (
          <animate 
            attributeName="r" 
            values="10;8;10" 
            dur="3s" 
            repeatCount="indefinite" 
          />
        )}
      </circle>

      {/* Блик в зрачке */}
      <circle cx="53" cy="47" r="3" fill="white" opacity="0.8">
        {animated && (
          <animate 
            attributeName="opacity" 
            values="0.8;0.4;0.8" 
            dur="2s" 
            repeatCount="indefinite" 
          />
        )}
      </circle>

      {/* Дополнительные линии для эффекта наблюдения */}
      <path 
        d="M50 25 L50 15" 
        stroke="url(#eyeGradient)" 
        strokeWidth="2" 
        strokeLinecap="round"
        opacity="0.6"
      >
        {animated && (
          <animate 
            attributeName="opacity" 
            values="0.6;0.2;0.6" 
            dur="1.5s" 
            repeatCount="indefinite" 
          />
        )}
      </path>

      <path 
        d="M50 75 L50 85" 
        stroke="url(#eyeGradient)" 
        strokeWidth="2" 
        strokeLinecap="round"
        opacity="0.6"
      >
        {animated && (
          <animate 
            attributeName="opacity" 
            values="0.6;0.2;0.6" 
            dur="1.5s" 
            repeatCount="indefinite" 
            begin="0.5s" 
          />
        )}
      </path>

      <path 
        d="M25 50 L15 50" 
        stroke="url(#eyeGradient)" 
        strokeWidth="2" 
        strokeLinecap="round"
        opacity="0.6"
      >
        {animated && (
          <animate 
            attributeName="opacity" 
            values="0.6;0.2;0.6" 
            dur="1.5s" 
            repeatCount="indefinite" 
            begin="0.25s" 
          />
        )}
      </path>

      <path 
        d="M75 50 L85 50" 
        stroke="url(#eyeGradient)" 
        strokeWidth="2" 
        strokeLinecap="round"
        opacity="0.6"
      >
        {animated && (
          <animate 
            attributeName="opacity" 
            values="0.6;0.2;0.6" 
            dur="1.5s" 
            repeatCount="indefinite" 
            begin="0.75s" 
          />
        )}
      </path>

      {/* Орбитальные кольца */}
      <ellipse 
        cx="50" 
        cy="50" 
        rx="35" 
        ry="12" 
        stroke="url(#eyeGradient)" 
        strokeWidth="1" 
        fill="none"
        opacity="0.3"
        transform="rotate(-30 50 50)"
      >
        {animated && (
          <animate 
            attributeName="ry" 
            values="12;10;12" 
            dur="5s" 
            repeatCount="indefinite" 
          />
        )}
      </ellipse>

      <ellipse 
        cx="50" 
        cy="50" 
        rx="35" 
        ry="12" 
        stroke="url(#eyeGradient)" 
        strokeWidth="1" 
        fill="none"
        opacity="0.3"
        transform="rotate(30 50 50)"
      >
        {animated && (
          <animate 
            attributeName="ry" 
            values="12;10;12" 
            dur="5s" 
            repeatCount="indefinite" 
            begin="1s" 
          />
        )}
      </ellipse>
    </svg>
  )
}

export default CryptoIcon
