type Props = {
    children: React.ReactNode
}

export const SidebarContainer:React.FC<Props> = ({children}) => {
  return (
    <nav className="w-full md:h-screen z-50 fixed md:static bottom-0 left-0 md:w-[100px] md:top-0 md:left-0 md:flex flex-col items-center md:justify-between py-2 bg-white
    border-t md:border-t-transparent md:border-x border-gray-200 shadow-sm">
        {children}
    </nav>
  )
}
