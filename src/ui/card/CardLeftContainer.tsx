type Props = {
    children: React.ReactNode
}

export const CardLeftContainer: React.FC<Props> = ({children}) => {
  return (
    <header className="w-4/6 md:w-3/6 flex flex-col justify-center text-center">
        {children}
    </header>
  )
}
