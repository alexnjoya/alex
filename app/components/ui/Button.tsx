import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { motion, HTMLMotionProps } from "framer-motion"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

// Separate interfaces for regular and motion buttons
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  animated?: false
}

export interface AnimatedButtonProps
  extends Omit<HTMLMotionProps<"button">, "className">,
    VariantProps<typeof buttonVariants> {
  asChild?: false
  animated: true
  className?: string
}

// Union type for all button props
export type AllButtonProps = ButtonProps | AnimatedButtonProps

const Button = React.forwardRef<HTMLButtonElement, AllButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    // Check if it's an animated button
    if ('animated' in props && props.animated) {
      const { animated, ...motionProps } = props as AnimatedButtonProps
      return (
        <motion.button
          className={cn(buttonVariants({ variant, size, className }))}
          ref={ref}
          {...motionProps}
        />
      )
    }

    // Regular button logic
    const { animated, ...regularProps } = props as ButtonProps
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...regularProps}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }