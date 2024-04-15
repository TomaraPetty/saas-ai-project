import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const Logo = () => {
  return (
    <div className='text-3xl text-center py-4 font-heading'>
      Make Noise
      <FontAwesomeIcon
        icon={faPhone}
        className='pl-2 text-2xl text-slate-400 m-2'
      />
    </div>
  );
};
