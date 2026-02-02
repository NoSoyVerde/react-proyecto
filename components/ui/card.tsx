import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * Card component - Main container for card layouts
 * Provides consistent styling and structure
 */
function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      role="article"
      className={cn(
        "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm transition-shadow hover:shadow-md",
        className
      )}
      {...props}
    />
  )
}

/**
 * CardHeader component - Header section of the card
 * Supports responsive container queries and action slots
 */
function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        className
      )}
      {...props}
    />
  )
}

/**
 * CardTitle component - Main title of the card
 * Semantic heading for better accessibility
 */
function CardTitle({ 
  className, 
  as: Component = "h3",
  ...props 
}: React.ComponentProps<"div"> & { as?: React.ElementType }) {
  return React.createElement(
    Component,
    {
      "data-slot": "card-title",
      className: cn("leading-none font-semibold text-lg", className),
      ...props
    }
  )
}

/**
 * CardSubtitle component - Secondary title/subtitle
 * Complements the main title
 */
function CardSubtitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-subtitle"
      className={cn("text-muted-foreground text-xs font-medium uppercase tracking-wide", className)}
      {...props}
    />
  )
}

/**
 * CardDescription component - Descriptive text
 * Provides additional context or information
 */
function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-muted-foreground text-sm leading-relaxed", className)}
      {...props}
    />
  )
}

/**
 * CardAction component - Action slot, typically for buttons or icons
 * Positioned in the top-right by default
 */
function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end flex gap-2",
        className
      )}
      {...props}
    />
  )
}

/**
 * CardContent component - Main content area
 * Default padding and layout
 */
function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-6 flex flex-col gap-4", className)}
      {...props}
    />
  )
}

/**
 * CardImage component - Image/media container
 * Responsive image support with proper aspect ratio
 */
function CardImage({ className, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) {
  return (
    <img
      data-slot="card-image"
      className={cn("w-full h-auto rounded-lg object-cover aspect-video", className)}
      {...props}
      alt={props.alt || "Card image"}
    />
  )
}

/**
 * CardFooter component - Footer section
 * Typically used for metadata, timestamps, or secondary actions
 */
function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center justify-between px-6 pt-4 border-t [.border-t]:pt-6 text-xs text-muted-foreground", className)}
      {...props}
    />
  )
}

/**
 * CardBadge component - Badge/tag for categorization
 * Useful for status indicators or tags
 */
function CardBadge({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="card-badge"
      className={cn(
        "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary",
        className
      )}
      {...props}
    />
  )
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardSubtitle,
  CardAction,
  CardDescription,
  CardContent,
  CardImage,
  CardBadge,
}
