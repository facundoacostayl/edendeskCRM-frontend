type Props = {
    children: React.ReactNode;
}

export const AppContainer: React.FC<Props> = ({children}) => {
  return (
    <div className="py-5">{children}</div>
  )
}
