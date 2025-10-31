import React from 'react'
import type { IconType } from 'react-icons';

interface ButtonProps{
    label: string;
    onClick:(e: React.MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
    outline?: boolean;
    small?: boolean;
    icon?: IconType;

}

const Button: React.FC<ButtonProps> = ({
    label,
    onClick,
    disabled,
    outline,
    small,
    icon: Icon

}) => {
  return (
    <button 
      onClick={onClick}
      disabled={disabled}
      className={`
        relative 
        disabled:opacity-70
        disabled: cursor-not-allowed
        rounded-lg
        hover:opacity-80
        transition
        w-full
        ${outline ? 'bg-pageBg border border-beige text-beige' : 'bg-gold text-black'}
        ${small ? 'py-1 px-2' : 'py-3 px-4'}
        ${small ? 'text-sm' : 'text-md'}
        ${small ? 'font-light' : 'font-light'}
        
    `}
     >
       {Icon  && (<Icon size={24} className='bodyabsolute left-4 top-3'/>)}
       {label}
    </button>
  )
}

export default Button