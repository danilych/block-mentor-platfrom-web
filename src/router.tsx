import { createBrowserRouter } from 'react-router-dom'
import BridgePage from '@/pages/bridge'
import VestingPage from '@/pages/vesting'

export const router = createBrowserRouter([
  {
    path: '/bridge/:tokenAddress',
    element: <BridgePage />,
  },
  {
    path: '/vesting/:tokenAddress',
    element: <VestingPage />,
  },
  {
    path: '*',
    element: <BridgePage />,
  },
])
