import React from "react"

type Props = {
    children?: React.ReactNode
}

export const Navbar: React.FC<Props> = ({children}) => {
  return (
    <nav className="p-2 bg-indigo-700">
      <div className="md:w-[90%] lg:w-80% mx-auto flex justify-between items-center">
        {children}
      </div>
    </nav>
  )
}
