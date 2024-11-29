'use client'

import { ReactNode, useState } from 'react'

export default function ErrorBoundary({
  children,
  fallback = 'An unexpected error occurred.',
}: {
  children: ReactNode
  fallback?: ReactNode
}) {
  const [hasError, setHasError] = useState(false)

  const handleRetry = () => setHasError(false)

  if (hasError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <p className="text-xl font-bold text-red-600 mb-4">{fallback}</p>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          onClick={handleRetry}
        >
          Retry
        </button>
      </div>
    )
  }

  return (
    <div
      onError={() => {
        setHasError(true)
      }}
    >
      {children}
    </div>
  )
}
