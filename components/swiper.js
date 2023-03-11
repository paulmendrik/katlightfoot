import React, { Fragment, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Thumbs } from 'swiper';
import 'swiper/css';
import { urlFor } from '../lib/api';
import { AspectRatio, Box, Image, SimpleGrid, Text} from '@chakra-ui/react';

export const Glider = ({ data }) => {

const [thumbsSwiper, setThumbsSwiper] = useState(null);

return (

<Fragment> 
<Box className='painting'  width={['100%','60%']} >

<Swiper modules={[Thumbs]} thumbs={{ swiper: thumbsSwiper }} slidesPerView={1} >
{data.slides.map((slide, i) =>
<SwiperSlide>
<AspectRatio key={i} ratio={1}>
<Image src={urlFor(slide.image.asset).url()} />
</AspectRatio>
</SwiperSlide>
)}
</Swiper>


<Box position={'absolute'} pr={['0', '20px']} left={0} top={['95%','200px']} width={['100%','40%']}> 
<Text as={'p'} className={'more'} fontSize={['1rem','1.25rem']}>Further Images</Text>
<Swiper 
modules={[Thumbs]}
watchSlidesProgress
onSwiper={setThumbsSwiper}
slidesPerView={3}
>
<SimpleGrid column={3} gap={5} >
{data.slides.map((slide, i) =>
<SwiperSlide key={i}>
<Image pt={'20px'} src={urlFor(slide.image.asset).url()} width={['86px','160px']} />
</SwiperSlide>
)}
</SimpleGrid>
</Swiper>
</Box>

</Box>

</Fragment>
)
}