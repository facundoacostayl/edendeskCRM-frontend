type Props = {
    children: React.ReactNode;
}

export const ClientLi: React.FC<Props> = ({children}) => {
  return (
   <li className="flex items-center p-4 border-y border-gray-200">
     {children}
   </li>
  )
}
