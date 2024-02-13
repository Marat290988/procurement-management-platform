import { ButtonHTMLAttributes } from "react"

type UiButtonProps = {
  variant: 'primary' | 'secondary'
} & ButtonHTMLAttributes<HTMLButtonElement>

export function UiButton({
  className,
  variant,
  children
}: UiButtonProps) {

  return (
    <button 
      className={`
        ${className}
        px-4 h-10 rounded cursor-pointer flex gap-2 items-center justify-center text-[14px] font-[700]
        ${{
          primary: 'border-solid border-[2px] rounded-[5px] @apply border-[var(--border-color)]',
          secondary: 'border-solid border-[2px] rounded-[5px] @apply border-[#fff0] bg-[var(--error-color)] text-[var(--base-background-color)]'
        }[variant]} 
      `}
    >
      {children}
    </button>
  )
}