type Props = {
    children: React.ReactNode
}

export const SidebarContainer:React.FC<Props> = ({children}) => {
  return (
    <nav className="w-full fixed md:static bottom-0 left-0 md:w-16 md:top-0 md:left-0 md:flex flex-col items-center md:justify-between py-5 bg-white
    border-t md:border-t-transparent md:border-x border-gray-200 shadow-sm">
        {children}
    </nav>
  )
}
