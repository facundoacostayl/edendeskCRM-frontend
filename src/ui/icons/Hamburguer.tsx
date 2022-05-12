type Props = {
  children: React.ReactNode
}

export const Hamburguer: React.FC<Props> = ({children}) => {
  return (
    <span className="hidden md:block text-4xl font-bold">{children}</span>
  )
}
