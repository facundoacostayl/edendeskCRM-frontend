type Props = {
    children: React.ReactNode;
}

export const ClientCard: React.FC<Props> = ({children}) => {
  return (
    <article className={`flex w-[95%] max-w-lg mx-auto bg-white border border-gray-200 shadow-md px-2
    rounded-sm`}>
      {children}
    </article>
  )
}
