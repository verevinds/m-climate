import { SetStateAction, useState } from 'react';
import type { ImageListType } from 'react-images-uploading';
import ReactImageUploading from 'react-images-uploading';

type ImageUploadingProps = {
  callback: (value: SetStateAction<never[]>) => void;
};

const ImageUploading: React.FC<ImageUploadingProps> = ({ callback }) => {
  const [images, setImages] = useState([]);
  const maxNumber = 69;
  const onChange = (imageList: ImageListType) => {
    // data for submit
    // console.log(imageList, addUpdateIndex);
    // const data = new FormData();
    // data.append('file', imageList[addUpdateIndex].file);
    // Api().post('/api/files', data);
    if (callback) callback(imageList as never[]);
    setImages(imageList as never[]);
  };
  return (
    <ReactImageUploading
      multiple
      value={images}
      onChange={onChange}
      maxNumber={maxNumber}
      dataURLKey='data_url'
    >
      {({
        imageList,
        onImageUpload,
        onImageRemoveAll,
        onImageUpdate,
        onImageRemove,
        isDragging,
        dragProps,
      }) => (
        // write your building UI
        <div className='upload__image-wrapper'>
          <button
            type='button'
            style={isDragging ? { color: 'red' } : undefined}
            onClick={onImageUpload}
            {...dragProps}
          >
            Click or Drop here
          </button>
          &nbsp;
          <button type='button' onClick={onImageRemoveAll}>
            Remove all images
          </button>
          {imageList.map((image, index) => (
            // TODO
            // eslint-disable-next-line react/no-array-index-key
            <div key={index} className='image-item'>
              <img src={image['data_url']} alt='' width='100' />
              <div className='image-item__btn-wrapper'>
                <button type='button' onClick={() => onImageUpdate(index)}>
                  Update
                </button>
                <button type='button' onClick={() => onImageRemove(index)}>
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </ReactImageUploading>
  );
};

export default ImageUploading;
