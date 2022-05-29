type Props = {
    children: React.ReactNode
    color: "primary" | "secondary"
}

export const InfoLi: React.FC<Props> = ({children, color}) => {
  return (
    <li className={`list-none text-md md:text-lg lg:text-xl xl:text-2xl font-semibold mx-2 my-3 md:my-6 xl:my-8 ${color === "primary" ? "text-gray-500" : "text-black"}`}>{children}</li>
  )
}
