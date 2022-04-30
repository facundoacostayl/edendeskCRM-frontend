type Props = {
    children: React.ReactNode
}

export const MenuList: React.FC<Props> = ({children}) => {
  return (
    <ul className="w-full flex justify-between md:py-10 md:flex-col">
        {children}
    </ul>
  )
}
