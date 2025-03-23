import { useState, useEffect } from 'react'
import { ArrowDownUp } from 'lucide-react'
import { useParams } from 'react-router-dom'
import ParticleEffect from '@/components/Canvas'
import { networkIcons } from '@/assets'

interface NetworkInfo {
  id: string
  name: string
  icon: string
  balance?: string
  isEnabled: boolean
}

const defaultNetworks: NetworkInfo[] = [
  { id: 'arbitrum-sepolia', name: 'Arbitrum Sepolia', icon: networkIcons.arbitrumIcon, isEnabled: true },
  { id: 'base-sepolia', name: 'Base Sepolia', icon: networkIcons.baseIcon, isEnabled: true },
]

const BridgePage = () => {
  const { walletAddress } = useParams<{ walletAddress: string }>()
  const [amount, setAmount] = useState('')
  const [fromNetwork, setFromNetwork] = useState('')
  const [toNetwork, setToNetwork] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [networks, setNetworks] = useState<NetworkInfo[]>(defaultNetworks)

  useEffect(() => {
    const fetchWalletInfo = async () => {
      if (!walletAddress) return

      try {
        //TODO: Replace with your actual backend API endpoint
        const response = await fetch(`/api/wallet/${walletAddress}`)
        const data = await response.json()
        
        // Update networks with balances and availability
        setNetworks(data.networks || defaultNetworks)
      } catch (error) {
        console.error('Error fetching wallet info:', error)
        setError('Failed to load wallet information')
      }
    }

    fetchWalletInfo()
  }, [walletAddress])

  const handleSwapNetworks = () => {
    if (fromNetwork && toNetwork) {
      const temp = fromNetwork
      setFromNetwork(toNetwork)
      setToNetwork(temp)
    }
  }

  const handleBridge = async () => {
    if (!walletAddress) {
      setError('Invalid wallet address')
      return
    }
    if (!fromNetwork || !toNetwork) {
      setError('Please select networks')
      return
    }
    if (!amount || parseFloat(amount) <= 0) {
      setError('Please enter a valid amount')
      return
    }

    const selectedFromNetwork = networks.find(n => n.id === fromNetwork)
    if (!selectedFromNetwork?.isEnabled) {
      setError('Selected network is not available')
      return
    }

    try {
      setIsLoading(true)
      setError(null)

      // Replace with your actual backend API endpoint
      const response = await fetch('/api/bridge', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          walletAddress,
          fromNetwork,
          toNetwork,
          amount,
        }),
      })

      if (!response.ok) {
        throw new Error('Bridge request failed')
      }

      const data = await response.json()
      // Handle successful bridge response
      console.log('Bridge successful:', data)
      
      // Refresh network information
      const updatedNetworksResponse = await fetch(`/api/wallet/${walletAddress}/networks`)
      const updatedNetworksData = await updatedNetworksResponse.json()
      setNetworks(updatedNetworksData.networks || defaultNetworks)

    } catch (error: unknown) {
      console.error('Bridge error:', error)
      setError(
        error instanceof Error ? error.message : 'Failed to bridge tokens. Please try again.'
      )
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-white">
        <ParticleEffect />
        <div className="flex items-center gap-3 text-lg text-gray-700">
          <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
          Processing bridge transaction...
        </div>
      </div>
    )
  }

  return (
    <div className="w-full min-h-screen p-4 md:p-6 relative">
      <ParticleEffect />
      <div className="max-w-xl mx-auto relative">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Bridge Tokens</h1>
          {walletAddress && (
            <div className="text-sm text-gray-600">
              Wallet: {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
            </div>
          )}
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200 shadow-sm p-6 md:p-8">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
              {error}
            </div>
          )}

          <div className="space-y-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                From Network
              </label>
              <div className="grid grid-cols-2 gap-4">
                {networks.map((network) => (
                  <button
                    key={network.id}
                    onClick={() => {
                      if (network.id === toNetwork) {
                        setToNetwork(fromNetwork)
                      }
                      setFromNetwork(network.id)
                      setError(null)
                    }}
                    disabled={network.id === toNetwork || !network.isEnabled}
                    className={`
                      flex items-center justify-center gap-2.5 p-4 rounded-lg border-2
                      transition-all duration-200 backdrop-blur-sm
                      ${
                        fromNetwork === network.id
                          ? 'bg-blue-600 border-blue-600 text-white shadow-md scale-[1.02]'
                          : 'border-gray-200 text-gray-700 hover:border-blue-400 hover:text-blue-600'
                      }
                      ${(network.id === toNetwork || !network.isEnabled) ? 'opacity-50 cursor-not-allowed' : ''}
                    `}
                  >
                    <img src={network.icon} alt={network.name} className="w-8 h-8 object-contain" />
                    <div className="flex flex-col items-center">
                      <span>{network.name}</span>
                      {network.balance && (
                        <span className="text-sm opacity-75">
                          {network.balance} ETH
                        </span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-center">
              <button
                onClick={handleSwapNetworks}
                disabled={!fromNetwork || !toNetwork}
                className={`
                  p-2.5 rounded-full border-2 border-gray-200 backdrop-blur-sm
                  transition-all duration-200
                  ${
                    fromNetwork && toNetwork
                      ? 'hover:border-blue-400 hover:bg-blue-50 hover:scale-110'
                      : 'opacity-50 cursor-not-allowed'
                  }
                `}
              >
                <ArrowDownUp className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                To Network
              </label>
              <div className="grid grid-cols-2 gap-4">
                {networks.map((network) => (
                  <button
                    key={network.id}
                    onClick={() => {
                      if (network.id === fromNetwork) {
                        setFromNetwork(toNetwork)
                      }
                      setToNetwork(network.id)
                      setError(null)
                    }}
                    disabled={network.id === fromNetwork || !network.isEnabled}
                    className={`
                      flex items-center justify-center gap-2.5 p-4 rounded-lg border-2
                      transition-all duration-200 backdrop-blur-sm
                      ${
                        toNetwork === network.id
                          ? 'bg-blue-600 border-blue-600 text-white shadow-md scale-[1.02]'
                          : 'border-gray-200 text-gray-700 hover:border-blue-400 hover:text-blue-600'
                      }
                      ${(network.id === fromNetwork || !network.isEnabled) ? 'opacity-50 cursor-not-allowed' : ''}
                    `}
                  >
                    <img src={network.icon} alt={network.name} className="w-8 h-8 object-contain" />
                    <div className="flex flex-col items-center">
                      <span>{network.name}</span>
                      {network.balance && (
                        <span className="text-sm opacity-75">
                          {network.balance} ETH
                        </span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Amount
              </label>
              <div className="relative">
                <input
                  type="number"
                  placeholder="0.0"
                  value={amount}
                  onChange={(e) => {
                    setAmount(e.target.value)
                    setError(null)
                  }}
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 text-gray-900 
                    placeholder-gray-400 transition-colors duration-200 backdrop-blur-sm
                    focus:outline-none focus:border-blue-400 bg-white/50"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                  <span className="text-gray-600 font-medium">ETH</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleBridge}
              disabled={!fromNetwork || !toNetwork || !amount || isLoading}
              className={`
                w-full py-3.5 px-4 rounded-lg font-medium text-base
                transition-all duration-200 backdrop-blur-sm
                ${
                  !fromNetwork || !toNetwork || !amount || isLoading
                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-md'
                }
              `}
            >
              {isLoading ? 'Processing...' : 'Bridge Tokens'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BridgePage
