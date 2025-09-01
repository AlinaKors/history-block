import styled from 'styled-components';
import { SwiperCustom } from './Swiper';

const Main = styled.main`
  width: 100%;
  height: 100vh;
  overflow: hidden;
  border-left: 2px solid #e2e5ec;
  border-right: 2px solid #e2e5ec;
  position: relative;
  padding: 170px 40px 104px 80px;

  &::before,
  &::after {
    content: '';
    position: absolute;
    background: #e2e5ec;
    z-index: -1;
  }

  &::before {
    top: 50%;
    left: 0;
    width: 100%;
    height: 2px;
    transform: translateY(-50%);
  }

  &::after {
    left: 50%;
    top: 0;
    width: 2px;
    height: 100%;
    transform: translateX(-50%);
  }

  h3 {
    font-size: 25px;
    font-family: 'Bebas Neue', sans-serif;
    color: #3877ee;
    margin-bottom: 15px;
  }

  .swiper {
    position: absolute;
    bottom: 104px;
    width: calc(100% - 40px - 80px);
    span {
      font-size: 20px;
    }
  }
`;

const H1 = styled.h1`
  font-size: 56px;
  line-height: 1.2;
  max-width: 354px;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    left: -80px;
    width: 5px;
    height: 120px;
    top: 8px;
    background: linear-gradient(180deg, #3877ee 0%, #ef5da8 100%);
  }
`;

const Timeline = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 530px;
  height: 530px;
  border: 2px solid #d0d5e0;
  border-radius: 50%;
`;

const YearsBlock = styled.div`
  display: flex;
  justify-content: space-between;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 980px;
`;

const Year = styled.div<{ color: string }>`
  color: ${(props) => props.color};
  font-size: 200px;
  line-height: 1.6;
  letter-spacing: -0.2;
  font-weight: bold;
`;

const DotsWrapper = styled.div<{ angle: number }>`
  position: absolute;
  inset: 0;
  transform: rotate(${(props) => props.angle}deg);
`;

const Dot = styled.span`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%) translateX(265px);
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #42567a;
`;

export interface IDesktopProps {
  className?: string;
}

const data = {
  Литература: {
    '1987': 'Выходит роман Умберто Эко «Маятник Фуко».',
    '1988': 'Салман Рушди публикует «Сатанинские стихи».',
    '1989': 'Кадзуо Исигуро получает Букеровскую премию за «Остаток дня».',
    '1990': 'Джонатан Франзен дебютирует романом «Двадцать седьмой город».',
    '1991': 'Тони Моррисон получает Нобелевскую премию по литературе.',
    '1992': 'Майкл Ондатже публикует «Английского пациента».',
    '1993': 'Анни Эрно выпускает автобиографический роман «Стыд».',
    '1994': 'Харуки Мураками издает «Хроники заводной птицы».',
  },
  Кино: {
    '1995': 'Премьера «Истории игрушек» — первого полнометражного 3D-мультфильма Pixar.',
    '1996': '«Крик» Уэса Крейвена возрождает жанр слэшера.',
    '1997': 'Выходит «Титаник» Джеймса Кэмерона, рекордсмен по кассовым сборам.',
    '1998': 'Спилберг выпускает «Спасти рядового Райана».',
    '1999': 'Премьера «Матрицы» Вачовски, культовый sci-fi боевик.',
    '2000': 'Выходит «Гладиатор» Ридли Скотта, получивший «Оскар».',
    '2001': 'Стартует киносерия «Властелин колец» с «Братством кольца».',
    '2002': 'Премьера «Человека-паука» Сэма Рэйми.',
  },
  Технологии: {
    '2003': 'Запущен iTunes Store от Apple.',
    '2004': 'Основан Facebook Марком Цукербергом.',
    '2005': 'Запуск YouTube.',
    '2006': 'Twitter появляется в сети.',
    '2007': 'Apple представляет первый iPhone.',
    '2008': 'Google выпускает браузер Chrome.',
    '2009': 'Запуск криптовалюты Bitcoin.',
    '2010': 'Выходит первый iPad.',
  },
  Наука: {
    '2011': 'Нобель по химии за квази-кристаллы (Дэн Шехтман).',
    '2012': 'В CERN подтверждена частица Хиггса.',
    '2013': 'Космический аппарат «Вояджер-1» покидает Солнечную систему.',
    '2014': 'Миссия «Розетта» высаживает зонд на комету.',
    '2015': 'Объявлено первое обнаружение гравитационных волн.',
    '2016': 'Обнаружена система TRAPPIST-1 с семью экзопланетами.',
    '2017': 'Астрономы фиксируют первую межзвездную комету `Оумуамуа`.',
  },
};

export const Desktop = ({ className }: IDesktopProps) => {
  const dataKeys = Object.keys(data);
  const countDots = dataKeys.length;

  return (
    <Main className={className}>
      <H1>Исторические даты</H1>
      <Timeline>
        <YearsBlock>
          <Year color="#5D5FEF">2015</Year>
          <Year color="#EF5DA8">2022</Year>
        </YearsBlock>
        {dataKeys.map((el: string, index: number) => (
          <DotsWrapper key={el} angle={(360 / countDots) * index}>
            <Dot>
              {index}
              <span>{el}</span>
            </Dot>
          </DotsWrapper>
        ))}
      </Timeline>
      <SwiperCustom el={data['Литература']} />
    </Main>
  );
};
