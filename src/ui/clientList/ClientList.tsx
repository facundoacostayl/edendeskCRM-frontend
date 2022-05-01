type Props = {
    children: React.ReactNode;
}

export const ClientList: React.FC<Props> = ({children}) => {
  return (
    <ul className="border border-gray-200 shadow-sm">
        <div className="flex justify-between p-4">
          <p className="w-full font-medium">Nombre</p>
          <p className="w-1/3 font-medium">Saldo</p>
         
        </div>
        {children}
    </ul>
  )
}
