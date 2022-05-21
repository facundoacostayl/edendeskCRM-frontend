//TYPES
import {Status} from '../../types';

//COMPONENTS
import {Spinner} from '../spinner';

type Props = {
    children: React.ReactNode,
    status: Status
}

export const PageContent = ({children, status}: Props) => {
  return (
    <div className="w-[90%] max-w-[1440px] mx-auto md:flex justify-between items-center md:gap-5">
      {status === Status.init ? <Spinner/> : children}
    </div>
  );
};
