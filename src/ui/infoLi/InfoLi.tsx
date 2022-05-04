type Props = {
    children: React.ReactNode
    color: "primary" | "secondary"
}

export const InfoLi: React.FC<Props> = ({children, color}) => {
  return (
    <li className={`list-none text-lg font-semibold mx-2 my-5 ${color === "primary" ? "text-gray-500" : "text-black"}`}>{children}</li>
  )
}
