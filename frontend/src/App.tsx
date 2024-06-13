import { RouterProvider } from 'react-router-dom'
import { router } from './routes'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './lib/react-query'
import { ThemeProvider } from './components/theme/theme-provider'

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="booking-services-theme">
        <RouterProvider router={router} />
      </ThemeProvider>
    </QueryClientProvider>
  )
}
