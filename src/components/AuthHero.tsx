type Props = {
  title: string
}

export const AuthHero: React.FC<Props> = ({title}) => {
  return (
    <div className="py-10 flex flex-col items-center gap-5">
        <img className="w-[100px] mx-auto" src={require('../img/logo.png')} alt="logo" />
        <h1 className="text-center text-4xl font-bold text-slate-700">{title}</h1>
    </div>
  )
}
