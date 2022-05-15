type Props = {
    children: React.ReactNode
}

export const CardRightContainer: React.FC<Props> = ({ children }) => {
  return (
    <footer className="w-2/6 flex flex-col items-end justify-end text-right text-sm">
        {children}
    </footer>
  )
}
