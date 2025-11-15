"use client"

import { Check } from "lucide-react"

import {
  Collection as AriaCollection,
  Header as AriaHeader,
  ListBox as AriaListBox,
  ListBoxItem as AriaListBoxItem,
  ListBoxItemProps as AriaListBoxItemProps,
  ListBoxProps as AriaListBoxProps,
  Section as AriaSection,
  composeRenderProps,
} from "react-aria-components"

import { cn } from "@/lib/utils"

const ListBoxSection = AriaSection

const ListBoxCollection = AriaCollection

function ListBox<T extends object>({
  className,
  ...props
}: AriaListBoxProps<T>) {
  return (
    <AriaListBox
      className={composeRenderProps(className, (className) =>
        cn(
          className,
          "group overflow-auto rounded-md border border-gray-300 bg-white pt-1 pr-1 pb-1 pl-1 text-black shadow-md outline-none",
          /* Empty */
          "data-[empty]:p-6 data-[empty]:text-center data-[empty]:text-sm"
        )
      )}
      {...props}
    />
  )
}

const ListBoxItem = <T extends object>({
  className,
  children,
  ...props
}: AriaListBoxItemProps<T>) => {
  return (
    <AriaListBoxItem
      textValue={
        props.textValue || (typeof children === "string" ? children : undefined)
      }
      className={composeRenderProps(className, (className) =>
        cn(
          "relative flex w-full cursor-default select-none items-center justify-start rounded-sm pl-1 pr-2 py-1.5 text-left text-sm text-black outline-none",
          /* Disabled */
          "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
          /* Focused */
          "data-[focused]:bg-gray-100 data-[focused]:text-black",
          /* Hovered */
          "data-[hovered]:bg-gray-100 data-[hovered]:text-black",
          className
        )
      )}
      {...props}
    >
      {composeRenderProps(children, (children, renderProps) => (
        <>
          {renderProps.isSelected && (
            <span className="absolute left-1 flex size-4 items-center justify-center pointer-events-none z-10">
              <Check className="size-3 text-black" />
            </span>
          )}
          <span className={renderProps.isSelected ? "pl-6" : "pl-1"}>{children}</span>
        </>
      ))}
    </AriaListBoxItem>
  )
}

function ListBoxHeader({
  className,
  ...props
}: React.ComponentProps<typeof AriaHeader>) {
  return (
    <AriaHeader
      className={cn("py-1.5 pl-8 pr-2 text-sm font-semibold text-black", className)}
      {...props}
    />
  )
}

export {
  ListBox,
  ListBoxItem,
  ListBoxHeader,
  ListBoxSection,
  ListBoxCollection,
}

