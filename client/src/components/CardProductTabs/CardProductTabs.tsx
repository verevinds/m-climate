import { selectProductItem } from '@redux/reducer/product';
import { Product } from '@src/interface';
import { Button } from '@verevinds/ui-kit';
import cn from 'classnames';
import { useState } from 'react';
import { useSelector } from 'react-redux';

import styles from './cardproducttabs.module.scss';

function createLine<T extends Product>(
  value: T[keyof T],
  name: string,
  unit?: string,
) {
  return (
    value && (
      <div className={styles['line']}>
        <span className={styles['name']}>{name}</span>
        <span className={styles['dots']} />
        <span className={styles['value']}>
          {unit ? `${value} ${unit}` : value}
        </span>
      </div>
    )
  );
}

export default function CardProductTabs() {
  const item = useSelector(selectProductItem);
  const [isDescription, toggleIsDescription] = useState(
    Boolean(item?.description),
  );

  const clickFeatures = () => toggleIsDescription(false);
  const clickDescription = () => toggleIsDescription(true);

  if (!item) return null;
  const {
    description,
    weightOutdoor,
    weightIndoor,
    warranty,
    type,
    sizeOutdoor,
    sizeIndoor,
    servicedArea,
    powerHeating,
    powerCooling,
    powerConsumptionHeating,
    powerConsumptionCooling,
    noiseOutside,
    noiseInside,
    energyEfficiency,
  } = item;

  return (
    <section className={styles['tabs']}>
      <div className={styles['block']}>
        {description && (
          <Button
            variant='transparent'
            className={cn(
              styles['button'],
              isDescription && styles['button-active'],
            )}
            onClick={clickDescription}
          >
            Описание
          </Button>
        )}
        <Button
          variant='transparent'
          className={cn(
            styles['button'],
            !isDescription && styles['button-active'],
          )}
          onClick={clickFeatures}
        >
          Характеристики
        </Button>
      </div>

      {description && isDescription ? (
        <div className={styles['content']}>
          <h2>Описание товара</h2>
          <div
            dangerouslySetInnerHTML={{ __html: description }}
            className={styles['description']}
          />
        </div>
      ) : (
        <div className={styles['content']}>
          <h2>Основные характеристики</h2>
          {createLine(type, 'Тип')}

          {createLine(servicedArea, 'Обслуживаемая площадь')}

          {createLine(powerCooling, 'Мощность (охлаждение)', 'кВт')}
          {createLine(powerHeating, 'Мощность (обогрев)', 'кВт')}

          {createLine(
            powerConsumptionCooling,
            'Потребляемая мощность (охлаждение)',
            'Вт',
          )}
          {createLine(
            powerConsumptionHeating,
            'Потребляемая мощность (нагрев)',
            'Вт',
          )}

          {createLine(energyEfficiency, 'Класс энергоэффективности')}

          {createLine(noiseInside, 'Уровень шума (внутри)', 'дБ')}
          {createLine(noiseOutside, 'Уровень шума (снаружи)', 'дБ')}

          {createLine(sizeIndoor, 'Размер (Внутренний блок)', 'мм')}
          {createLine(sizeOutdoor, 'Размер (Наружный блок)', 'мм')}

          {createLine(weightIndoor, 'Вес (Внутренний блок)', 'кг')}
          {createLine(weightOutdoor, 'Вес (Наружный блок)', 'кг')}

          {createLine(warranty, 'Гарантия', 'мес')}
        </div>
      )}
    </section>
  );
}
