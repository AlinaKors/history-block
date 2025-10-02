import styled from 'styled-components';

import { useRef } from 'react';

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

  &::before {
    transform: translate(-50%, -50%) rotate(45deg);
  }

  &::after {
    transform: translate(-50%, -50%) rotate(-45deg);
  }
`;

const BtnContainer = styled.div`
  position: absolute;
  bottom: 16px;
  display: flex;
  justify-content: space-between;
  width: calc(100% + 80px);
  left: -60px;
`;

const SwiperContainer = styled.div`
  align-self: end;
  position: relative;
  .swiper {
    position: absolute;
    bottom: 0;
    width: calc(100% - 40px);
    span {
      font-size: 20px;
    }
  }
`;

interface SwiperCustomProps {
  el: Record<string, string>;
}

export const SwiperCustom: React.FC<SwiperCustomProps> = ({ el }) => {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <SwiperContainer>
      <BtnContainer>
        <NavBtn direction="prev" className="prevSlider"></NavBtn>
        <NavBtn direction="next" className="nextSlider"></NavBtn>
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
