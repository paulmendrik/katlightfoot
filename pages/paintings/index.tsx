import React, { Fragment } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { GalleryLayout } from '../../layouts';
import { motion  } from "framer-motion";
import { urlFor } from '../../lib/api';
import { AspectRatio, Box, SimpleGrid, Text } from '@chakra-ui/react';
import { getAllPaintings } from '../../lib/api';

type Props = {
  images: any;
}

export default function Gallery({ images }: Props) {


const item = {
hidden: { opacity: 0 },
show: { opacity: 1 }
}

const container = {
hidden: { opacity: 0 },
show: { opacity: 1, transition: { type: 'tween', duration: 0.1, ease: 'easeInOut' } }
}


return (

<Fragment>
<GalleryLayout >
<Box>
<Text as={'h1'} className={'title'} pt={['1.5rem', '2rem']} fontSize={['1.2rem','1.4rem']} >Paintings</Text>
</Box>
<SimpleGrid
className='gallery'
mt={['1.5rem', '2rem']}
as={motion.div} 
variants={container}
initial="hidden"
whileInView={"show"}
columns={[1,4]} 
spacingX={['0','20px']}
spacingY={['10px', '10px']}
>

{images.map((image: { _id: any; title: string ; image: any; slug: any; order: any; }) =>
<Box key={image._id} as={motion.div} variants={item} id={image.order} >
<Link  href={`/paintings/${image.slug}`}>
<AspectRatio  ratio={1/1}>
<Image
src={urlFor(image.image).url()}
width={100}
height={100}
alt={image.title}
/>
</AspectRatio>
<Text as={'h4'} className={'title'} py={'30px'} >{image.title}</Text>
</Link>
</Box>
)}
</SimpleGrid>
</GalleryLayout>
</Fragment>
)
}

 export async function getStaticProps(){
    const images = await getAllPaintings();
    return {
      props: {
        images
      },
      revalidate: 10,
    }
  }
    