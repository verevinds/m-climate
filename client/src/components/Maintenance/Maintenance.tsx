import styles from './maintenance.module.scss';

export default function Maintenance() {
  return (
    <div className={styles['block']}>
      <h1>Сервисное обслуживание – от 2000 руб.</h1>
      <br />
      <p>Важно своевременно и регулярно производить чистку кондиционера.</p>
      <p>
        Даже бытовой кондиционер нуждается в обслуживании. Приведем ряд проблем,
        с которыми Вы можете столкнуться, игнорируя профилактику:
      </p>
      <ul className={styles['list']}>
        <li>
          Поломка техники, так как при сильном загрязнении внутреннего блока
          нарушается работа вентилятора, что приводит к перегреву и износу
          компрессора. К сожалению, ремонт такого недуга причинит значительный
          урон семейному бюджету.
        </li>
        <li>
          Аллергия, простудные заболевания и прочее, поскольку скапливается
          пыль, вирусы, споры плесени и грибка, пыльца и мелкий ссор.
        </li>
        <li>
          Медленное охлаждение, так как слои пыли не дают воздуху циркулировать
          в привычном режиме.
        </li>
      </ul>
      <br />
      <p>Поводом для чистки может стать:</p>
      <ul className={styles['list']}>
        <li>Неприятный запах</li>
        <li>Повышенный уровень шума, треск </li>
        <li>Повышенное потребление электроэнергии</li>
        <li>Плохое охлаждение</li>
        <li>Протечка конденсата.</li>
      </ul>
    </div>
  );
}
