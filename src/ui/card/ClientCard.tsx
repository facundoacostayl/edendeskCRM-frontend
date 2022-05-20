type Props = {
    children: React.ReactNode;
}

export const ClientCard: React.FC<Props> = ({children}) => {
  return (
    <article className={`flex w-[95%] max-w-xl mx-auto bg-white border border-gray-200 shadow-md px-2 md:px-5 md:py-5
    rounded-sm`}>
      {children}
    </article>
  )
}
