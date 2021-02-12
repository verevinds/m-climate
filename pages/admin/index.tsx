// TODO
/* eslint-disable spaced-comment */
// TODO
/* eslint-disable @typescript-eslint/ban-ts-comment */
import LayoutAdmin from '@components/AdminLayout';
import Api from '@src/utils/Api';
import { useState } from 'react';
import ImageUploading from 'react-images-uploading';

const Admin = () => {
  const [images, setImages] = useState([]);
  const maxNumber = 69;
  // @ts-ignore
  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    Api().post('/api/files', imageList[0].file);
    setImages(imageList);
  };
  return (
    <LayoutAdmin title='Панель администратора'>
      <ImageUploading
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
      </ImageUploading>
    </LayoutAdmin>
  );
};

export default Admin;
