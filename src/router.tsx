import { createBrowserRouter } from 'react-router-dom'
import BridgePage from '@/pages/bridge'

export const router = createBrowserRouter([
  {
    path: '/bridge/:walletAddress',
    element: <BridgePage />,
  },
  {
    path: '*',
    element: <BridgePage />,
  },
])
