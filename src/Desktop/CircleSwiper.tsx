// CircleSwiper.tsx
import React, { useState } from 'react';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import { useRef } from 'react';

interface Item {
  id: number;
  label: string;
}

const items: Item[] = [
  { id: 1, label: 'Кино' },
  { id: 2, label: 'Литература' },
  { id: 3, label: 'Наука' },
  { id: 4, label: 'Технологии' },
];

const CircleContainer = styled.div`
  position: relative;
  width: 530px;
  height: 530px;
  border-radius: 50%;
`;

const Point = styled.div<{ active?: boolean; x: number; y: number }>`
  position: absolute;
  left: ${(props) => props.x}px;
  top: ${(props) => props.y}px;
  width: ${(props) => (props.active ? '40px' : '10px')};
  height: ${(props) => (props.active ? '40px' : '10px')};
  background-color: ${(props) => (props.active ? '#F4F5F9' : '#42567a')};
  border-radius: 50%;
  border: ${(props) => (props.active ? '2px solid #303E58' : 'none')};
  display: flex;
  align-items: center;
  justify-content: center;
  color: #303e58;
  font-weight: bold;
  transition: all 0.3s;
`;

const Label = styled.div`
  position: absolute;
  left: 50px;
  top: 50%;
  transform: translateY(-50%);
  white-space: nowrap;
  font-weight: normal;
  color: #303e58;
`;

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

const CircleSwiper: React.FC = () => {
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const radius = 265;

  const getCoordinates = (index: number, total: number, activeIndex: number) => {
    const diff = index === activeIndex ? 20 : 5;
    const angle = ((index - activeIndex) / total) * 2 * Math.PI - Math.PI / 2;
    const x = radius + radius * Math.cos(angle) - diff;
    const y = radius + radius * Math.sin(angle) - diff;
    return { x, y };
  };

  return (
    <>
      <CircleContainer>
        {items.map((item, idx) => {
          const coords = getCoordinates(idx, items.length, activeIndex);
          return (
            <Point key={item.id} active={idx === activeIndex} x={coords.x} y={coords.y}>
              {idx === activeIndex && <Label>{item.label}</Label>}
              {idx === activeIndex && item.id}
            </Point>
          );
        })}
      </CircleContainer>

      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        onSlideChange={(swiper: SwiperType) => setActiveIndex(swiper.activeIndex)}
      >
        <BtnContainer>
          <NavBtn
            onClick={() => swiperRef.current?.slidePrev()}
            direction="prev"
            className="prevSlider"
          ></NavBtn>
          <NavBtn
            onClick={() => swiperRef.current?.slideNext()}
            direction="next"
            className="nextSlider"
          ></NavBtn>
        </BtnContainer>
      </Swiper>
    </>
  );
};

export default CircleSwiper;
