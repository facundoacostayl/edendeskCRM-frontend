import {Outlet, Navigate} from 'react-router-dom';

type Props = {
    authorize: boolean
}

export const PrivateLoggedRoutes: React.FC<Props> = ({authorize}) => {
  return (
    authorize ? <Outlet/> : <Navigate to="/login"/>
  )
}
