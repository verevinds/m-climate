import Img from '@components/Img';

import styles from './dismantling.module.scss';

export default function Dismantling() {
  return (
    <article className={styles['wrap']}>
      <h1>Демонтаж кондиционера – от 1500 руб</h1>
      <br />
      <Img
        src='/service/dismantling.jpg'
        alt='монтаж'
        className={styles['img']}
      />

      <section className={styles['block']}>
        <p>М.Климат предлагает своим клиентам услугу демонтажа кондиционера.</p>
        <p>
          Для дальнейшей исправной работы техники необходимо произвести демонтаж
          квалифицированными специалистами по всем техническим требованиям с
          сохранением фреона. Мы предлагаем услугу демонтажа систем
          кондиционирования воздуха любой сложности.
        </p>
      </section>
    </article>
  );
}
