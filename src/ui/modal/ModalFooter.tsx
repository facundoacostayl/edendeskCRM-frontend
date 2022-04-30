type Props = {
  children: JSX.Element | JSX.Element[]
}

export const ModalFooter: React.FC<Props> = ({children}) => {
  return (
    <footer className="flex gap-2 pt-3">
      {children}
    </footer>
  )
}
