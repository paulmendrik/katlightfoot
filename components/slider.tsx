import React, { Fragment } from 'react';
import { useMediaQuery } from '@chakra-ui/react';
import AliceCarousel from 'react-alice-carousel';
import { urlFor } from '../lib/api';
import { Box } from '@chakra-ui/react';
import 'react-alice-carousel/lib/alice-carousel.css';

type Props = {
  props: any;
}

export const Slider = ({ props }: Props) => {

const [desktop] = useMediaQuery('(min-width: 1024px)', {
  ssr: true,
  fallback: false, 
})

return (

<Fragment> 
<Box className='slider' >
<AliceCarousel
animationDuration={8000}
infinite
disableButtonsControls={true}
disableDotsControls={true}
animationType='fadeout' 
autoPlay={true}
items= {props.map((slide: { slide: any; order: any; mobile: any; }) => ( 
<Box
key={slide.order}
className='each-slide' 
backgroundImage={desktop ? urlFor(slide.slide).url() : urlFor(slide.mobile).url() }
backgroundSize={'cover'}
backgroundPosition={'top, center'}
backgroundRepeat={"no-repeat"}
/>
))}
>
</AliceCarousel>
</Box> 
</Fragment>
)
}