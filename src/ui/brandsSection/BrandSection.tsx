type Props = {
    children: React.ReactNode;
}

export const BrandSection: React.FC<Props> = ({children}) => {
  return (
    <section className="md:w-[75%] mx-auto md:flex justify-between items-center">
        {children}
    </section>
  )
}
