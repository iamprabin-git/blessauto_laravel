import React from 'react';
// 1. Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// 2. Import Swiper modules
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';

// 3. Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

// 4. Import your images (Ensure these paths match your folder structure)
import SliderOne from '../../assets/images/bike1.jpg';
import SliderTwo from '../../assets/images/honda.jpg';
import SliderThree from '../../assets/images/banner-2.jpg';

const Hero = () => {
  return (
    <section className="section-1">
      <Swiper
        // Install modules
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        effect="fade" // Smooth transition for a premium feel
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation={true}
        loop={true}
      >
        <SwiperSlide>
          <div
            className="content"
            style={{ 
              backgroundImage: `url(${SliderThree})`,
              backgroundPosition: 'center',
              backgroundSize: 'cover' 
            }}
          >
            {/* You can add text overlays here later */}
          </div>
        </SwiperSlide>
        
        <SwiperSlide>
          <div
            className="content"
            style={{ 
              backgroundImage: `url(${SliderTwo})`,
              backgroundPosition: 'center',
              backgroundSize: 'cover' 
            }}
          ></div>
        </SwiperSlide>

        <SwiperSlide>
          <div
            className="content"
            style={{ 
              backgroundImage: `url(${SliderOne})`,
              backgroundPosition: 'center',
              backgroundSize: 'cover' 
            }}
          ></div>
        </SwiperSlide>
      </Swiper>
    </section>
  );
}

export default Hero;