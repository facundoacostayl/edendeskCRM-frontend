type Props = {
    children: React.ReactNode
}

export const CardRightContainer: React.FC<Props> = ({ children }) => {
  return (
    <footer className="flex flex-col justify-end">
        {children}
    </footer>
  )
}
