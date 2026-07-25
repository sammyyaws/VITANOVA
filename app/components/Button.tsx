import React, { ComponentPropsWithoutRef } from 'react'

// Extending the native button props ensures onClick, type, disabled, etc. are perfectly typed
interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  label: string
  bgcolour?: string
  textcolour?: string
  font?: string
  hover?: string
}

export default function Button({
  label, 
  bgcolour ,         
  hover ,       
  textcolour , 
  font , 
  className ,
  ...props 
}: ButtonProps) {
  return (
    <button 
      className={`${bgcolour} ${hover} ${textcolour} ${font} px-4 py-2 rounded-md transition-colors ${className}`} 
      {...props}
    >
      {label}
    </button>
  )
}