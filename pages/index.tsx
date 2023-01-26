import React, { Fragment } from 'react';
import { HomeLayout } from '../layouts/';
import { Slider } from '../components/slider';
import { getAllSlides } from '../lib/api';
import 'react-alice-carousel/lib/alice-carousel.css';



type Props = {
  slides: any;
}

export default function Home ({ slides }: Props) {



return (

<Fragment>
<HomeLayout/>
<Slider props={slides} /> 
</Fragment>
)
}

export async function getStaticProps() {
const slides = await getAllSlides();
return {
  props: {
    slides
  },
  revalidate: 10,
}
}
