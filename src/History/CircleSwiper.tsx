// CircleSwiper.tsx
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import type { Swiper as SwiperType } from 'swiper';
import gsap from 'gsap';
import { Pagination } from 'swiper/modules';

const CircleContainer = styled.div`
  position: relative;
  width: 530px;
  height: 530px;
  margin-inline: auto;
  margin-top: 214px;
  border-radius: 50%;
  outline: 1px solid rgb(66, 86, 122, 0.2);
  border-radius: 50%;
  z-index: 1;

  @media (max-width: 1023px) {
    display: none;
  }
`;

const Point = styled.div<{ x: number; y: number; rotation: number; active?: boolean }>`
  position: absolute;
  left: ${(props) => props.x}px;
  top: ${(props) => props.y}px;
  width: ${(props) => (props.active ? 40 : 6)}px;
  height: ${(props) => (props.active ? 40 : 6)}px;
  background-color: ${(props) => (props.active ? '#f4f5f9' : '#42567a')};
  border-radius: 100%;
  display: flex;
  border: ${(props) => (props.active ? '2px solid #42567a' : 'none')};
  align-items: center;
  justify-content: center;
  color: #303e58;
  font-weight: bold;
  transform-origin: center;
  transform: translate(-50%, -50%) rotate(${(props) => props.rotation * -1}deg);
  cursor: pointer;
  transition: background-color 0.4s, width 0.2s, height 0.2s;

  &:hover {
    background-color: #f4f5f9;
    width: 40px;
    height: 40px;
    transition: background-color 0.4s, width 0.2s, height 0.2s;
    transform-origin: center;
    border: 2px solid #42567a;

    span {
      opacity: 1;
      transform: translateY(0px);
      transition: opacity 0.5s;
    }
  }
`;

const Count = styled.span<{ active?: boolean }>`
  opacity: ${(props) => (props.active ? 1 : 0)};
  position: absolute;
`;

const Label = styled.div<{ active?: boolean }>`
  opacity: 0;
  visibility: hidden;
  position: absolute;
  left: 60px;

  ${({ active }) =>
    active &&
    `
      opacity: 1;
      visibility: visible;
      transition: opacity 0.8s 0.5s ease;
    `}
`;

const PointsWrapper = styled.div<{ rotation: number }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transform-origin: center center;
  transform: rotate(${(props) => props.rotation}deg);
`;

const BulletsContainer = styled.div`
  @media (min-width: 1024px) {
    display: none;
  }
  gap: 20px;
  height: 10px;
  display: flex;
  justify-content: center;
  position: absolute;
  bottom: 52px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 3;
  .custom-bullet,
  .custom-bullet.custom-bullet-active {
    height: 10px;
    width: 10px;
    background-color: #42567a;
    border-radius: 50%;
    @media (max-width: 889px) {
      width: 6px;
      height: 6px;
    }
  }
  .custom-bullet.custom-bullet-active {
    opacity: 1;
  }

  .custom-bullet {
    opacity: 0.4;
  }

  @media (max-width: 889px) {
    gap: 10px;
    bottom: 32px;
  }
`;

const radius = 265;

interface CircleSwiperProps {
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  circleRef: React.MutableRefObject<SwiperType | null>;
  items: string[];
}

const CircleSwiper: React.FC<CircleSwiperProps> = ({
  activeIndex,
  setActiveIndex,
  circleRef,
  items,
}) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const pointsRefs = useRef([...Array(items.length)].map(() => React.createRef<HTMLDivElement>()));
  const [rotation, setRotation] = useState(0);

  const getCoordinates = (index: number, total: number) => {
    const angle = (360 / total) * (Math.PI / 180); // подсчет угла в радианах, для этого мы делим 360 на количество элементов, Math.PI/180 переводим в радианы
    const x = radius + radius * Math.cos(angle * index - Math.PI / 3); // Math.PI/3 чтобы сдвинуть на 60 градусов, так как первая точка у нас должна быть сверху справа
    const y = radius + radius * Math.sin(angle * index - Math.PI / 3);
    return { x, y };
  };

  useEffect(() => {
    const total = items.length;
    const targetAngle = -((activeIndex / total) * 360);
    gsap.to(wrapperRef.current, {
      rotation: targetAngle,
      duration: 0.8,
      ease: 'power2.out',
    });
    setRotation(targetAngle);
  }, [activeIndex, items.length]);

  return (
    <>
      <CircleContainer>
        <PointsWrapper ref={wrapperRef} rotation={rotation}>
          {items.map((item, idx) => {
            const coords = getCoordinates(idx, items.length);
            return (
              <Point
                key={idx}
                x={coords.x}
                y={coords.y}
                rotation={rotation}
                active={idx === activeIndex}
                onClick={() => circleRef.current?.slideTo(idx)}
              >
                <Count active={idx === activeIndex}>{idx + 1}</Count>
                <Label active={idx === activeIndex} ref={pointsRefs.current[idx]}>
                  {item}
                </Label>
              </Point>
            );
          })}
        </PointsWrapper>
      </CircleContainer>
      <BulletsContainer id="bullets" />
      <Swiper
        slidesPerView={1}
        modules={[Pagination]}
        className="swiper-circle"
        pagination={{
          clickable: true,
          el: '#bullets',
          type: 'bullets',
          bulletClass: 'custom-bullet',
          bulletActiveClass: 'custom-bullet-active',
        }}
        onSwiper={(swiper: SwiperType) => (circleRef.current = swiper)}
        onSlideChange={(swiper: SwiperType) => setActiveIndex(swiper.activeIndex)}
        style={{ height: '0px' }}
      >
        {items.map((item, idx) => (
          <SwiperSlide key={idx}>
            <div style={{ visibility: 'hidden' }}>{item}</div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default CircleSwiper;
