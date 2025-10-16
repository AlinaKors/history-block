import styled from 'styled-components';
import { SwiperCustom } from './Swiper';
import CircleSwiper from './CircleSwiper';
import { useRef, useState } from 'react';
import type { Swiper as SwiperType } from 'swiper';
import { YearsBlock } from './YearsBlock';

const Main = styled.main`
  width: 100%;
  border-left: 1px solid rgb(66, 86, 122, 0.1);
  border-right: 1px solid rgb(66, 86, 122, 0.1);
  display: grid;
  position: relative;
  padding: 0 80px;

  @media (max-width: 1023px) {
    padding: 0 40px;
    height: 100vh;
    overflow-x: hidden;
  }

  @media (max-width: 889px) {
    padding: 0 20px;
  }

  &::before,
  &::after {
    content: '';
    position: absolute;
    background: #42567a;
    z-index: -1;
    opacity: 0.1;
    @media (max-width: 1023px) {
      display: none;
    }
  }

  &::before {
    transform: translateY(480px);
    margin-inline: auto;
    width: 100%;
    height: 1px;
    left: 0;
  }

  &::after {
    height: 100%;
    width: 1px;
    left: 50%;
  }

  h3 {
    font-size: 1.25rem;
    font-family: 'Bebas Neue', sans-serif;
    color: #3877ee;
    margin-bottom: 15px;
    @media (max-width: 889px) {
      font-size: 1.14rem;
    }
  }

  @media (max-width: 1023px) {
    border: none;
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: flex-start;
    padding: 0 20px;
  }

  .event-swiper {
    user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
    .swiper-slide:not(:last-child) {
      padding-right: 80px;
      box-sizing: content-box;
      @media (max-width: 1023px) {
        padding-right: 40px;
      }
      @media (max-width: 889px) {
        padding-right: 24px;
      }
    }
  }
`;

const H1 = styled.h1`
  font-size: 2.8rem;
  line-height: 1.2;
  max-width: 354px;
  position: absolute;
  left: 78px;
  top: 170px;
  z-index: 2;

  @media (max-width: 1023px) {
    max-width: 240px;
    left: 40px;
    top: 60px;
    position: static;
    margin-top: 80px;
  }

  @media (max-width: 889px) {
    max-width: 124px;
    font-size: 20px;
    margin-top: 58px;
  }

  &::before {
    content: '';
    position: absolute;
    left: -80px;
    width: 5px;
    height: 120px;
    top: 8px;
    background: linear-gradient(180deg, #3877ee 0%, #ef5da8 100%);

    @media (max-width: 1023px) {
      display: none;
    }
  }
`;

const YearsWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  position: absolute;
  top: 400px;
  width: 100%;
  z-index: 2;
  @media (max-width: 1023px) {
    margin-top: 64px;
    position: static;
    justify-content: space-between;
    flex-grow: 1;
    align-items: center;
  }
  @media (max-width: 889px) {
    margin-top: 56px;
  }
`;

const CurrentSlide = styled.div`
  font-size: 0.7rem;
  position: absolute;
  top: -38px;
  @media (max-width: 1023px) {
    top: -32px;
    font-size: 1rem;
  }
`;

const NavBtn = styled.button<{ direction?: 'prev' | 'next'; disabled: boolean }>`
  position: relative;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 1px solid #42567a;
  background: #f4f5f9;
  cursor: pointer;
  transform: rotate(${(props) => (props.direction === 'next' ? '180deg' : '0deg')});
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};
  @media (max-width: 889px) {
    transform: rotate(${(props) => (props.direction === 'next' ? '0deg' : '180deg')});
    width: 25px;
    height: 25px;
  }

  &::before {
    content: '';
    position: absolute;
    width: 9px;
    height: 9px;
    top: 18px;
    left: 21px;
    border-top: 2px solid #42567a;
    border-right: 2px solid #42567a;
    transform: rotate(225deg);
    @media (max-width: 889px) {
      width: 3px;
      height: 3px;
      top: 9px;
      left: 9px;
      transform: rotate(45deg);
    }
  }
`;

const BtnContainer = styled.div`
  display: flex;
  gap: 20px;
`;

const NavigateCircle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  position: relative;

  @media (max-width: 1023px) {
    order: 4;
    margin-bottom: 20px;
  }
`;

export interface IDesktopProps {
  className?: string;
}

const data = {
  Литература: {
    '1987':
      'Выходит роман Умберто Эко «Маятник Фуко» — сложное философское произведение о поиске скрытых смыслов и теорий заговора, которое укрепило Эко как одного из самых интеллектуальных авторов XX века.',
    '1988':
      'Салман Рушди публикует «Сатанинские стихи». Роман вызвал огромный международный скандал, был запрещён во многих странах, а сам автор оказался под угрозой жизни из-за фетвы аятоллы Хомейни.',
    '1989':
      'Кадзуо Исигуро получает Букеровскую премию за «Остаток дня». Роман о дворецком и его воспоминаниях стал классикой и исследованием темы памяти, долга и утраченного времени.',
    '1990':
      'Джонатан Франзен дебютирует романом «Двадцать седьмой город». Критики отметили его как одну из самых амбициозных попыток описать американское общество конца XX века.',
    '1991':
      'Тони Моррисон получает Нобелевскую премию по литературе. Она стала первой афроамериканкой, удостоенной этой награды, за вклад в литературу и исследование афроамериканской идентичности.',
    '1992':
      'Майкл Ондатже публикует «Английского пациента». Роман о судьбах людей во время Второй мировой войны позже был экранизирован и получил 9 «Оскаров».',
    '1993':
      'Анни Эрно выпускает автобиографический роман «Стыд». Это важная работа о личной и коллективной памяти, которая впоследствии принесла Эрно Нобелевскую премию (в 2022 году).',
    '1994':
      'Харуки Мураками издает «Хроники заводной птицы». Один из самых известных его романов, где реальность переплетается с мистикой и психологическими мотивами.',
  },
  Кино: {
    '1995':
      'Премьера «Истории игрушек» — первого полнометражного 3D-мультфильма Pixar. Фильм изменил индустрию анимации, открыв эру компьютерных мультфильмов.',
    '1996':
      '«Крик» Уэса Крейвена возрождает жанр слэшера. Фильм стал культовым благодаря сочетанию ужаса, сатиры и самоиронии, породив целую франшизу.',
    '1997':
      'Выходит «Титаник» Джеймса Кэмерона. Фильм стал мировым феноменом, собрав более 2 млрд долларов и получив 11 «Оскаров».',
    '1998':
      'Спилберг выпускает «Спасти рядового Райана». Реалистичные сцены высадки в Нормандии изменили подход к военным фильмам.',
    '1999':
      'Премьера «Матрицы» Вачовски. Фильм не только стал культовым в жанре sci-fi, но и повлиял на визуальный стиль кино, популяризировав эффект «bullet time».',
    '2000':
      'Выходит «Гладиатор» Ридли Скотта. Исторический эпос вернул интерес к античным темам и стал лауреатом премии «Оскар» как лучший фильм.',
    '2001':
      'Стартует киносерия «Властелин колец» с «Братством кольца». Экранизация Толкина задала новый стандарт в жанре фэнтези.',
    '2002':
      'Премьера «Человека-паука» Сэма Рэйми. Успех фильма запустил «золотую эру» супергеройского кино.',
  },
  Технологии: {
    '2003':
      'Запущен iTunes Store от Apple. Магазин изменил индустрию музыки, сделав цифровую дистрибуцию массовой и легальной альтернативой пиратству.',
    '2004':
      'Основан Facebook Марком Цукербергом. Соцсеть быстро превратилась в глобальную платформу общения, медиа и бизнеса.',
    '2005':
      'Запуск YouTube. Платформа изменила подход к видеоконтенту и сделала возможным феномен видеоблогеров и стримеров.',
    '2006':
      'Появление Twitter. Краткие сообщения в 140 символов задали новую культуру новостей и мгновенной коммуникации.',
    '2007':
      'Apple представляет первый iPhone. Это событие навсегда изменило индустрию мобильных устройств и повседневные привычки людей.',
    '2008':
      'Google выпускает браузер Chrome. Сегодня он является самым популярным браузером в мире, задав стандарт скорости и удобства.',
    '2009':
      'Запуск криптовалюты Bitcoin. Первая децентрализованная цифровая валюта положила начало целой индустрии блокчейна и финансовых инноваций.',
    '2010':
      'Выходит первый iPad. Apple открыла новый сегмент устройств между смартфоном и ноутбуком.',
  },
  Наука: {
    '2011':
      'Нобель по химии за открытие квази-кристаллов (Дэн Шехтман). Это открытие сломало представления о симметрии в кристаллографии.',
    '2012':
      'В CERN подтверждена частица Хиггса. Это стало ключевым подтверждением Стандартной модели физики элементарных частиц.',
    '2013':
      'Космический аппарат «Вояджер-1» покидает Солнечную систему, став первым рукотворным объектом, достигшим межзвёздного пространства.',
    '2014':
      'Миссия «Розетта» впервые в истории высадила зонд на поверхность кометы. Огромный шаг в исследовании космоса.',
    '2015':
      'Объявлено первое обнаружение гравитационных волн. Эксперимент LIGO подтвердил предсказания Эйнштейна спустя 100 лет.',
    '2016':
      'Обнаружена система TRAPPIST-1 с семью экзопланетами. Три из них находятся в зоне обитаемости, что вызвало бурю интереса к поиску внеземной жизни.',
    '2017':
      'Астрономы фиксируют первую межзвездную комету `Оумуамуа`. Её необычная форма и траектория породили множество гипотез, включая даже «инопланетный зонд».',
  },
};

export const History = ({ className }: IDesktopProps) => {
  const dataKeys = Object.keys(data) as (keyof typeof data)[];

  const [activeIndex, setActiveIndex] = useState(0);

  const circleRef = useRef<SwiperType | null>(null);

  const activeIndexSlide = activeIndex + 1 < 10 ? `0${activeIndex + 1}` : activeIndex + 1;
  const lastIndexSlide = dataKeys.length < 10 ? `0${dataKeys.length}` : dataKeys.length;

  const from = Number(Object.keys(data[dataKeys[activeIndex]])[0]);
  const to = Number(
    Object.keys(data[dataKeys[activeIndex]])[Object.keys(data[dataKeys[activeIndex]]).length - 1],
  );

  return (
    <>
      <Main className={className}>
        <H1>Исторические даты</H1>
        <YearsWrapper>
          <YearsBlock color="#5D5FEF" year={from} />
          <YearsBlock color="#EF5DA8" year={to} />
        </YearsWrapper>

        <CircleSwiper
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
          circleRef={circleRef}
          items={dataKeys}
        />

        <NavigateCircle>
          <CurrentSlide>
            {activeIndexSlide}/{lastIndexSlide}
          </CurrentSlide>
          <BtnContainer>
            <NavBtn
              onClick={() => circleRef.current?.slidePrev()}
              direction="prev"
              disabled={activeIndex === 0}
            />
            <NavBtn
              onClick={() => circleRef.current?.slideNext()}
              direction="next"
              disabled={activeIndex === dataKeys.length - 1}
            />
          </BtnContainer>
        </NavigateCircle>

        <SwiperCustom
          el={data[dataKeys[activeIndex]]}
          nameCategory={dataKeys[activeIndex]}
          changeSwiper={activeIndex}
        />
      </Main>
    </>
  );
};
