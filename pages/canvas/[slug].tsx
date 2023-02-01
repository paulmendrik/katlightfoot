import React, { Fragment } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import groq from 'groq';
import { PaintingLayout } from '../../layouts';
import { Close, Next, Previous } from '../../components';
import { AspectRatio, Box, Card, Flex, Image, Text, VStack } from '@chakra-ui/react';
import { urlFor } from '../../lib/api';
import client from '../../lib/sanity';

type Props = {
  data: any;
}

export default function Painting({ data }: Props) {

return (
<Fragment>
<PaintingLayout>
<Close props={'/canvas/'}/>

{data.previous ? 
<Previous props={data.previous.slug} />
 : null }

{data.next ?
<Next props={data.next.slug} />
 : null }


<Card className='details' mt={['80px', '120px']} direction={['column-reverse', 'row']} >

<Box  py={['40px', '80px']}  width={['100%','25%']}> 
<AnimatePresence>
<motion.div
initial={{ y: 100, opacity: 0 }}
animate={{ y: 0, opacity: 1 }}
exit={{ y: 100, opacity: 0 }}
transition={{ delay: 0.1 , type: 'tween', ease: 'linear'}}
>
<Flex alignContent={'center'} alignItems={'center'} height={'100%'}>
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

</VStack>
</Flex>
</motion.div>
</AnimatePresence>
</Box>

<Box className='painting'  width={['100%','75%']} >
<AnimatePresence>
<motion.div 
initial={{ opacity: 0, scale: 0 }}
animate={{ opacity: 1, scale: 1 }}
exit={{ opacity: 0, scale: 0 }}
transition={{ delay: 0.1 , type: 'tween', ease: 'linear'}}
>
<AspectRatio   ratio={1}>
<Image src={urlFor(data.image).url()} />
</AspectRatio>
</motion.div>
</AnimatePresence>
</Box>

</Card>
</PaintingLayout>
</Fragment>

)

}

const query = groq`*[_type == 'canvas' && slug.current == $slug][0]{
  title,
  image,
  slug,
  size,
  price,
  order,
  "current": { 
    "slug": slug.current,title,order 
  },
  "next": *[_type == 'canvas' && ^._createdAt < _createdAt] | order(_createdAt asc)[0]{ 
      "slug": slug.current,title,order
  },
  "previous": *[_type == 'canvas' && ^._createdAt > _createdAt] | order(_createdAt asc)[-1]{ 
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
  const paths = await client.fetch(groq`*[_type == "canvas" && defined(slug.current)][].slug.current`)
  return {
    paths: paths.map((slug: {slug: any}) => ({params: {slug}})),
    fallback: 'blocking',
  }
}
