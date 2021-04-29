import { useSelector } from 'react-redux';
import { AppState } from '../../state/app.reducers';
import { Image } from '../../interfaces/Image';
import ImageComponent from 'react-graceful-image';
import './Grid.css';
import ButtonOverLayer from './ButtonOverlayer';

const Grid = () => {
  const images: Image[][] = useSelector(
    (state: { appState: AppState }) => state.appState.images
  );
  return (
    <div className="row no-margin masonry-grid">
      {images.map((imgChunk, index) => (
        <div className="col-md-6 col-lg-3 masonry-column" key={index}>
          {imgChunk.map((img, imgIndex) => (
            <div key={imgIndex} className="img-wrapper">
              <div className="thumbnail">
                <ImageComponent
                  className="giphy-image"
                  width={img.width}
                  alt={img.title}
                  src={img.url}
                />
                <ButtonOverLayer url={img.url} imgId={img.id} />
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Grid;
