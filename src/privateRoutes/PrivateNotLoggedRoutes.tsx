import {Outlet, Navigate} from 'react-router-dom';

type Props = {
    authorize: boolean
}

export const PrivateNotLoggedRoutes: React.FC<Props> = ({authorize}) => {
  return (
    !authorize ? <Outlet/> : <Navigate to="/dashboard"/>
  )
}
