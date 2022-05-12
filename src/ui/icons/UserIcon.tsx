type Props = {
  children: React.ReactNode
}

export const UserIcon: React.FC<Props> = ({children}) => {
  return (
    <li className={`hidden w-full md:flex items-center justify-center md:h-[70px] cursor-pointer hover:bg-gray-200`}>
      <p className="text-center text-gray-700 text-2xl font-semibold">{children}</p>
    </li>
  )
}
