import styled from 'styled-components';
import gsap from 'gsap';

import { useEffect, useRef, useState } from 'react';

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

  &::before,
  &::after {
    content: '';
    position: absolute;
    width: 8px;
    height: 2px;
    background: #3877ee;
    top: 50%;
    left: 50%;
    transform-origin: left center;
  }

  &:disabled {
    display: block;
    visibility: hidden;
  }

  &::before {
    transform: translate(-50%, -50%) rotate(45deg);
  }

  &::after {
    transform: translate(-50%, -50%) rotate(-45deg);
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

interface SwiperCustomProps {
  el: Record<string, string>;
  changeSwiper?: number;
}

export const SwiperCustom: React.FC<SwiperCustomProps> = ({ el, changeSwiper }) => {
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
        duration: 1.4,
      },
    );
  }, [changeSwiper]);

  return (
    <SwiperContainer ref={swiperContainer}>
      <BtnContainer>
        <NavBtn direction="prev" className="prevSlider"></NavBtn>
        <NavBtn direction="next" className="nextSlider"></NavBtn>
      </BtnContainer>
      <Swiper
        spaceBetween={80}
        slidesPerView={'auto'}
        freeMode={true}
        modules={[Navigation]}
        navigation={{
          nextEl: '.nextSlider',
          prevEl: '.prevSlider',
        }}
        onBeforeInit={(swiper: SwiperType) => {
          swiperRef.current = swiper;
        }}
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
