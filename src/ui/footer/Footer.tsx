type Props = {
    children: React.ReactNode
}

export const Footer: React.FC<Props> = ({children}) => {
  return (
    <div className="w-[95%] md:w-[75%] mx-auto py-5 flex items-center justify-between border-t border-slate-200">{children}</div>
  )
}
