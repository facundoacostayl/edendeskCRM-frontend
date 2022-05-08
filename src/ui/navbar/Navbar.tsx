import React from "react"

type Props = {
    children?: React.ReactNode
}

export const Navbar: React.FC<Props> = ({children}) => {
  return (
    <nav className="md:w-[90%] lg:w-[80%] mx-auto flex justify-between items-center p-2">{children}</nav>
  )
}
