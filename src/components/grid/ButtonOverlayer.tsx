import { toast } from 'react-toastify';
import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { setExcludedImg } from '../../state/app.actions';

type Props = {
  url: string;
  imgId: string;
};
const ButtonOverLayer: FC<Props> = ({ url, imgId }) => {
  const dispatch = useDispatch();

  const copy = () => {
    const input = document.createElement('input');
    input.setAttribute('value', url);
    document.body.appendChild(input);
    input.select();
    document.execCommand('copy');
    document.body.removeChild(input);
    toast('Copied to clipboard!', { type: 'success' });
  };

  const deleteImage = () => {
    dispatch(setExcludedImg(imgId));
    toast.error('Image Removed!');
  };

  return (
    <div className="overlay">
      <button className="btn btn-danger mg-r5" onClick={deleteImage}>
        Delete
      </button>
      <button className="btn btn-primary" onClick={copy}>
        Copy
      </button>
    </div>
  );
};

export default ButtonOverLayer;
