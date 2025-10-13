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

  &[hidden] {
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
  z-index: 2;
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
  .swiper {
    width: 100%;
    span {
      font-size: 1rem;
    }
  }
`;

interface SwiperCustomProps {
  el: Record<string, string>;
  changeSwiper?: number;
}

export const SwiperCustom: React.FC<SwiperCustomProps> = ({ el, changeSwiper }) => {
  const swiperRef = useRef<SwiperType | null>(null);
  const swiperContainer = useRef<HTMLDivElement | null>(null);

  const [activeIndex, setActiveIndex] = useState(0);

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
        <NavBtn direction="prev" className="prevSlider" hidden={activeIndex === 0}></NavBtn>
        <NavBtn
          direction="next"
          className="nextSlider"
          hidden={activeIndex === Object.keys(el).length - 3}
        ></NavBtn>
      </BtnContainer>
      <Swiper
        spaceBetween={80}
        slidesPerView={3}
        slidesPerGroup={1}
        modules={[Navigation]}
        navigation={{
          nextEl: '.nextSlider',
          prevEl: '.prevSlider',
        }}
        onBeforeInit={(swiper: SwiperType) => {
          swiperRef.current = swiper;
        }}
        onSlideChange={(swiper: SwiperType) => setActiveIndex(swiper.activeIndex)}
      >
        {Object.entries(el).map(([key, value]) => (
          <SwiperSlide>
            <div key={key}>
              <h3>{key}</h3>
              <span>{value}</span>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </SwiperContainer>
  );
};
