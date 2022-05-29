import {Button} from '../controls/button';

type Props = {
    children: React.ReactNode;
}

export const ClientList: React.FC<Props> = ({children}) => {
  return (
    <ul className="w-full border border-gray-200 shadow-sm">
        <div className="grid grid-cols-3 grid-rows-1 items-center gap-7 p-2 md:p-4">
          <p className="mx-auto text-lg md:text-2xl font-medium">Nombre</p>
          <p className="mx-auto text-lg md:text-2xl font-medium">Saldo</p>
          <div className="opacity-0">
          <Button colorScheme="primary">Editar</Button>
          </div>
        </div>
        {children}
    </ul>
  )
}
