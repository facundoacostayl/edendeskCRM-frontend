type Props = {
    children: React.ReactNode;
}

export const BrandSection: React.FC<Props> = ({children}) => {
  return (
    <section className="bg-gray-50">
      <div className="md:w-[80%] lg:h-32 mx-auto md:flex justify-between lg:justify-center lg:gap-20 items-center">
        {children}
        </div>
    </section>
  )
}
