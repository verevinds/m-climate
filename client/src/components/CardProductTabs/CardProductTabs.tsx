import { selectProductItem } from '@redux/reducer/product';
import { Button } from '@verevinds/ui-kit';
import cn from 'classnames';
import { useState } from 'react';
import { useSelector } from 'react-redux';

import styles from './cardproducttabs.module.scss';

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
          {type && (
            <div className={styles['line']}>
              <span>Тип</span>
              <span className={styles['dots']} />
              <span className={styles['value']}>{type}</span>
            </div>
          )}
          {servicedArea && (
            <div className={styles['line']}>
              <span>Обслуживаемая площадь</span>
              <span className={styles['dots']} />
              <span className={styles['value']}>{servicedArea}</span>
            </div>
          )}
          {powerCooling && (
            <div className={styles['line']}>
              <span>Мощность (охлаждение)</span>
              <span className={styles['dots']} />
              <span className={styles['value']}>{`${powerCooling} кВт`}</span>
            </div>
          )}
          {powerHeating && (
            <div className={styles['line']}>
              <span>Мощность (обогрев)</span>
              <span className={styles['dots']} />
              <span className={styles['value']}>{`${powerHeating} кВт`}</span>
            </div>
          )}
          {powerConsumptionCooling && (
            <div className={styles['line']}>
              <span>Потребляемая мощность (охлаждение)</span>
              <span className={styles['dots']} />
              <span className={styles['value']}>
                {`${powerConsumptionCooling} Вт`}
              </span>
            </div>
          )}
          {powerConsumptionHeating && (
            <div className={styles['line']}>
              <span>Потребляемая мощность (нагрев)</span>
              <span className={styles['dots']} />
              <span className={styles['value']}>
                {`${powerConsumptionHeating} Вт`}
              </span>
            </div>
          )}
          {energyEfficiency && (
            <div className={styles['line']}>
              <span>Класс энергоэффективности</span>
              <span className={styles['dots']} />
              <span className={styles['value']}>{energyEfficiency}</span>
            </div>
          )}
          {noiseInside && (
            <div className={styles['line']}>
              <span>Уровень шума (внутри)</span>
              <span className={styles['dots']} />
              <span className={styles['value']}>{`${noiseInside} дБ`}</span>
            </div>
          )}
          {noiseOutside && (
            <div className={styles['line']}>
              <span>Уровень шума (снаружи)</span>
              <span className={styles['dots']} />
              <span className={styles['value']}>{`${noiseOutside} дБ`}</span>
            </div>
          )}
          {sizeIndoor && (
            <div className={styles['line']}>
              <span>Размер (Внутренний блок)</span>
              <span className={styles['dots']} />
              <span className={styles['value']}>{`${sizeIndoor} мм`}</span>
            </div>
          )}
          {sizeOutdoor && (
            <div className={styles['line']}>
              <span>Размер (Наружный блок)</span>
              <span className={styles['dots']} />
              <span className={styles['value']}>{`${sizeOutdoor} мм`}</span>
            </div>
          )}
          {weightIndoor && (
            <div className={styles['line']}>
              <span>Вес (Внутренний блок)</span>
              <span className={styles['dots']} />
              <span className={styles['value']}>{`${weightIndoor} кг`}</span>
            </div>
          )}
          {weightOutdoor && (
            <div className={styles['line']}>
              <span>Вес (Наружный блок)</span>
              <span className={styles['dots']} />
              <span className={styles['value']}>{`${weightOutdoor} кг`}</span>
            </div>
          )}
          {warranty && (
            <div className={styles['line']}>
              <span>Гарантия</span>
              <span className={styles['dots']} />
              <span className={styles['value']}>{`${warranty} мес`}</span>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
