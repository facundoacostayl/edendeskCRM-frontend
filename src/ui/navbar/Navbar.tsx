import React from "react"

type Props = {
    children?: React.ReactNode
}

export const Navbar: React.FC<Props> = ({children}) => {
  return (
    <nav className="md:w-[75%] mx-auto bg-white flex justify-between items-center p-2">{children}</nav>
  )
}
