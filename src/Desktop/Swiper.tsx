import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';

interface SwiperCustomProps {
  el: Record<string, string>;
}

export const SwiperCustom: React.FC<SwiperCustomProps> = ({ el }) => {
  return (
    <Swiper
      spaceBetween={50}
      slidesPerView={3}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper: any) => console.log(swiper)}
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
  );
};
