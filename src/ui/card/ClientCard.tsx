type Props = {
    children: React.ReactNode;
}

export const ClientCard: React.FC<Props> = ({children}) => {
  return (
    <article className={`flex w-[95%] max-w-xl mx-auto md:border border-gray-200 shadow-md md:px-5 md:py-1
    rounded-sm`}>
      {children}
    </article>
  )
}
