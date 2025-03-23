import { useState } from 'react'
import { ArrowDownUp } from 'lucide-react'
import ParticleEffect from '@/components/Canvas'

const networks = [
  { id: 'arbitrum-sepolia', name: 'Arbitrum Sepolia', icon: '🔵' },
  { id: 'base-sepolia', name: 'Base Sepolia', icon: '🔷' },
]

const BridgePage = () => {
  const [amount, setAmount] = useState('')
  const [fromNetwork, setFromNetwork] = useState('')
  const [toNetwork, setToNetwork] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSwapNetworks = () => {
    if (fromNetwork && toNetwork) {
      const temp = fromNetwork
      setFromNetwork(toNetwork)
      setToNetwork(temp)
    }
  }

  const handleBridge = async () => {
    if (!fromNetwork || !toNetwork) {
      setError('Please select networks')
      return
    }
    if (!amount || parseFloat(amount) <= 0) {
      setError('Please enter a valid amount')
      return
    }

    try {
      setIsLoading(true)
      setError(null)
      await new Promise(resolve => setTimeout(resolve, 1000))
    } catch (error: Error | unknown) {
      if (error instanceof Error) {
        setError(error.message)
      } else {
        setError('Failed to bridge tokens. Please try again.')
      }
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
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">Bridge Tokens</h1>

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
                    disabled={network.id === toNetwork}
                    className={`
                      flex items-center justify-center gap-2.5 p-4 rounded-lg border-2
                      transition-all duration-200 font-medium backdrop-blur-sm
                      ${
                        fromNetwork === network.id
                          ? 'bg-blue-600 border-blue-600 text-white shadow-md scale-[1.02]'
                          : 'border-gray-200 text-gray-700 hover:border-blue-400 hover:text-blue-600'
                      }
                      ${network.id === toNetwork ? 'opacity-50 cursor-not-allowed' : ''}
                    `}
                  >
                    <span className="text-xl">{network.icon}</span>
                    <span>{network.name}</span>
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
                    disabled={network.id === fromNetwork}
                    className={`
                      flex items-center justify-center gap-2.5 p-4 rounded-lg border-2
                      transition-all duration-200 font-medium backdrop-blur-sm
                      ${
                        toNetwork === network.id
                          ? 'bg-blue-600 border-blue-600 text-white shadow-md scale-[1.02]'
                          : 'border-gray-200 text-gray-700 hover:border-blue-400 hover:text-blue-600'
                      }
                      ${network.id === fromNetwork ? 'opacity-50 cursor-not-allowed' : ''}
                    `}
                  >
                    <span className="text-xl">{network.icon}</span>
                    <span>{network.name}</span>
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
