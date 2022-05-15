type Props = {
    children: React.ReactNode;
}

export const ClientLi: React.FC<Props> = ({children}) => {
  return (
   <li className="w-full grid grid-cols-3 grid-rows-1 items-center p-4 border-y border-gray-200">
     {children}
   </li>
  )
}
