type Props = {
  children: JSX.Element | JSX.Element[]
}

export const ModalFooter: React.FC<Props> = ({children}) => {
  return (
    <footer className="flex justify-center gap-2 mt-5">
      {children}
    </footer>
  )
}
