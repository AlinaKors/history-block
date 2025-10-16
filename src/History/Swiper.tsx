import styled from 'styled-components';
import gsap from 'gsap';

import { useEffect, useRef } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';

import 'swiper/css';
import 'swiper/css/navigation';

const NavBtn = styled.button<{ direction?: 'prev' | 'next' }>`
  position: relative;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #fff;
  cursor: pointer;
  box-shadow: 0px 0px 15px rgba(56, 119, 238, 0.1);
  transform: rotate(${(props) => (props.direction === 'next' ? '180deg' : '0deg')});

  @media (max-width: 1023px) {
    display: none;
  }

  &::before {
    content: '';
    position: absolute;
    width: 5px;
    height: 5px;
    top: 17px;
    left: 17px;
    border-top: 2px solid #3877ee;
    border-right: 2px solid #3877ee;
    transform: rotate(225deg);
    @media (max-width: 889px) {
      width: 6px;
      height: 6px;
    }
  }

  &:disabled {
    display: block;
    visibility: hidden;
  }
`;

const BtnContainer = styled.div`
  position: absolute;
  top: 41px;
  bottom: 16px;
  display: flex;
  justify-content: space-between;
  width: calc(100% + 120px);
  left: -60px;
`;

const SwiperContainer = styled.div`
  opacity: 0;
  display: grid;
  margin: 56px 0px 104px;

  @media (max-width: 1023px) {
    margin: 40px 0 80px;
  }

  .swiper {
    width: 100%;

    span {
      font-size: 1rem;
    }
  }

  .swiper-slide {
    max-width: 16rem;
  }
`;

const NameCategory = styled.div`
  display: none;
  @media (max-width: 1023px) {
    width: 100%;
    display: flex;
    flex-direction: column;
    font-weight: bold;
    font-size: 1.5rem;
    &::after {
      content: '';
      width: 100%;
      height: 1px;
      background: #c7cdd9;
      margin-top: 24px;
      margin-bottom: 20px;
    }
  }
  @media (max-width: 889px) {
    font-size: 1.2rem;
  }
`;
interface SwiperCustomProps {
  el: Record<string, string>;
  nameCategory?: string;
  changeSwiper?: number;
}

export const SwiperCustom: React.FC<SwiperCustomProps> = ({ el, nameCategory, changeSwiper }) => {
  const swiperRef = useRef<SwiperType | null>(null);
  const swiperContainer = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!swiperContainer.current) return;

    gsap.fromTo(
      swiperContainer.current,
      { opacity: 0, y: 10 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
      },
    );
  }, [changeSwiper]);

  return (
    <SwiperContainer ref={swiperContainer}>
      <BtnContainer>
        <NavBtn direction="prev" className="prevSlider"></NavBtn>
        <NavBtn direction="next" className="nextSlider"></NavBtn>
      </BtnContainer>
      <NameCategory>{nameCategory}</NameCategory>
      <Swiper
        spaceBetween={0}
        slidesPerView={'auto'}
        freeMode={true}
        grabCursor={true}
        modules={[Navigation]}
        navigation={{
          nextEl: '.nextSlider',
          prevEl: '.prevSlider',
        }}
        onBeforeInit={(swiper: SwiperType) => {
          swiperRef.current = swiper;
        }}
        className="event-swiper"
      >
        {Object.entries(el).map(([key, value]) => (
          <SwiperSlide>
            <div key={key}>
              <h3>{key}</h3>
              <div>{value}</div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </SwiperContainer>
  );
};
