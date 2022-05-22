//TYPES
import {Status} from '../../types';

//COMPONENTS
import {Spinner} from '../spinner';

type Props = {
    children: React.ReactNode,
    status: Status,
    direction?: string
}

export const PageContent = ({children, status, direction}: Props) => {
  return (
    <div className={`w-[90%] max-w-[1440px] mx-auto md:flex md:${direction} justify-between items-center md:gap-5`}>
      {status === Status.init ? <Spinner/> : children}
    </div>
  );
};
