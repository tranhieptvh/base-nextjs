"use client"

import { Toaster as Sonner, ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="light"
      position="top-right"
      className="toaster group"
      toastOptions={{
        classNames: {
          toast: "group toast",
          description: "text-slate-500",
          actionButton: "bg-slate-900 text-slate-50",
          cancelButton: "bg-slate-100 text-slate-500",
          success: "bg-green-50 text-green-900 border-green-200 border",
          error: "bg-red-50 text-red-900 border-red-200 border",
          warning: "bg-yellow-50 text-yellow-900 border-yellow-200 border",
          info: "bg-blue-50 text-blue-900 border-blue-200 border",
        },
      }}
      style={{
        "--normal-bg": "white",
        "--normal-text": "black",
        "--normal-border": "#e2e8f0",
        "--success-bg": "#f0fdf4",
        "--success-text": "#166534",
        "--success-border": "#bbf7d0",
        "--error-bg": "#fef2f2",
        "--error-text": "#dc2626",
        "--error-border": "#fecaca",
        "--warning-bg": "#fefce8",
        "--warning-text": "#ca8a04",
        "--warning-border": "#fde68a",
        "--info-bg": "#eff6ff",
        "--info-text": "#1d4ed8",
        "--info-border": "#bfdbfe",
      } as React.CSSProperties}
      {...props}
    />
  )
}

export { Toaster }
