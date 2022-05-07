type Props = {
    children: React.ReactNode
    color: "primary" | "secondary"
    border?: boolean
}

export const InfoLi: React.FC<Props> = ({children, color, border}) => {
  return (
    <li className={`list-none text-lg font-semibold mx-2 my-5 ${border && "border-b border-gray-300"} ${color === "primary" ? "text-gray-500" : "text-black"}`}>{children}</li>
  )
}
