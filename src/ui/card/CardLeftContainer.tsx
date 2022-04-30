type Props = {
    children: React.ReactNode
}

export const CardLeftContainer: React.FC<Props> = ({children}) => {
  return (
    <header className="flex flex-col justify-center">
        {children}
    </header>
  )
}
