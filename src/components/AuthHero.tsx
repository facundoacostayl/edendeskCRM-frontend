import { Link } from "react-router-dom";

type Props = {
  title: string,
  subtitle?: string
}

export const AuthHero: React.FC<Props> = ({title, subtitle}) => {
  return (
    <div className="py-7 flex flex-col items-center gap-3 md:gap-5">
        <Link to="/"><img className="w-[50%] max-w-[400px] mx-auto" src={require('../img/logo.png')} alt="logo" /></Link>
        <h1 className="text-center text-4xl md:text-5xl font-bold text-slate-700">{title}</h1>
        <p className="text-lg md:text-xl text-gray-500">{subtitle}</p>
    </div>
  )
}
