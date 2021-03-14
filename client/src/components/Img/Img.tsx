import { ImgHTMLAttributes } from 'react';

const Img: React.FC<ImgHTMLAttributes<HTMLImageElement>> = ({
  src,
  className,
  alt,
  ...restProps
}) => {
  return (
    <picture className={className}>
      {/* <source
        srcSet={
          src && src !== '/svg/no-camera.svg'
            ? `${src.substr(0, src.lastIndexOf('.'))}.avif`
            : '/svg/no-camera.svg'
        }
        type='src/avif'
      /> */}
      <source
        srcSet={
          src && src !== '/svg/no-camera.svg'
            ? `${src.substr(0, src.lastIndexOf('.'))}.webp`
            : '/svg/no-camera.svg'
        }
        type='image/webp'
      />
      <img
        src={src || '/svg/no-camera.svg'}
        alt={alt}
        className={className}
        loading='lazy'
        {...restProps}
      />
    </picture>
  );
};
export default Img;
