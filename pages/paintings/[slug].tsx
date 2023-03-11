import React, {Fragment, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import groq from 'groq';
import { PaintingLayout } from '../../layouts';
import { Glider } from '../../components';
import { Close } from '../../components';
import { AspectRatio, Box, Card, Flex, Image, Text, VStack } from '@chakra-ui/react';
import { urlFor } from '../../lib/api';
import client from '../../lib/sanity';


type Props = {
  data: any;
}


export default function Painting({ data }: Props) {

const router = useRouter();

return (
<Fragment>
<PaintingLayout>

<Close props={`/paintings/#${data.order}`}/>

<AnimatePresence>
<motion.div
key={router.asPath}
initial={{ y: 100, opacity: 0 }}
animate={{ y: 0, opacity: 1 }}
exit={{ y: 100, opacity: 0 }}
transition={{ delay: 0.1 , type: 'tween', ease: 'linear'}}
>

<Card className='details' position={'relative'} mt={['80px', '100px']} direction={['column-reverse', 'row']} >

<Box  py={['20px', '40px']}  width={['100%','40%']}> 

<Flex  alignItems={'flex-start'} height={'100%'}>
<VStack alignItems={'start'}>

<Text as={'p'} className={'name'} fontSize={'1rem'} >{data.title}</Text> 

{data.size ? 
<Text as={'p'} className={'size'} fontSize={'1rem'} >{data.size}</Text>
: null 
}

{data.price ?
<Text as={'p'} className={'price'} fontSize={'1rem'} >{data.price}</Text> 
: null
}

{data.sold ? 
<Text className='sold' fontSize={['1rem','1.25rem']} >Sold</Text>
: null
}

</VStack>
</Flex>
</Box>

<Glider data={data} />

</Card> 
</motion.div>
</AnimatePresence>
</PaintingLayout>  
</Fragment>
)
}
const query = groq`*[_type == 'gallery' && slug.current == $slug][0]{
  title,
  image,
  large,
  slug,
  size,
  price,
  sold,
  order,
  views,
  "slides": views[],
  "current": { 
    "slug": slug.current,title,order 
  },
  "next": *[_type == 'gallery' && ^._createdAt < _createdAt] | order(_createdAt asc)[0]{ 
      "slug": slug.current,title,order
  },
  "previous": *[_type == 'gallery' && ^._createdAt > _createdAt] | order(_createdAt asc)[-1]{ 
      "slug": slug.current, title,order
  },
}`


export async function getStaticProps({ params }: any) {
  const { slug = "" } = params
  const data  = await client.fetch(query, {slug});
  return {
    props: {
      data,
    },
    revalidate: 10,
  }
}

export const getStaticPaths = async () => {
  const paths = await client.fetch(groq`*[_type == "gallery" && defined(slug.current)][].slug.current`)
  return {
    paths: paths.map((slug: {slug: any}) => ({params: {slug}})),
    fallback: 'blocking',
  }
}

