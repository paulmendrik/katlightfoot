import React, { Fragment } from 'react';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import groq from 'groq';
import { PaintingLayout } from '../../layouts';
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

<Close props={`/giclee/#${data.order}`}/>

<Card className='details' mt={['80px', '120px']} direction={['column-reverse', 'row']} >

<Box  py={['40px', '80px']}  width={['100%','25%']}> 
<AnimatePresence>
<motion.div
key={router.asPath}
initial={{ y: 100, opacity: 0 }}
animate={{ y: 0, opacity: 1 }}
exit={{ y: 100, opacity: 0 }}
transition={{ delay: 0.1 , type: 'tween', ease: 'linear'}}
>
<Flex  alignItems={'flex-start'} height={'100%'}>
<VStack alignItems={'start'}>

<Text as={'p'} className={'name'} fontSize={'1rem'} >{data.title}</Text> 

{data.printsize ? 
<Text as={'p'} className={'printsize'} fontSize={'1rem'} >{data.printsize}</Text>
: null 
}

{data.mountedsize ? 
<Text as={'p'} className={'mountedsize'} fontSize={'1rem'} >{data.mountedsize}</Text>
: null 
}

{data.size ? 
<Text as={'p'} className={'framedsize'} fontSize={'1rem'} >{data.size}</Text>
:  null 
}

{data.mountedprice ?
<Text as={'p'} className={'mountedprice'} fontSize={'1rem'} >{data.mountedprice}</Text> 
: null
}

{data.price ?
<Text as={'p'} className={'framedprice'} fontSize={'1rem'} >{data.price}</Text> 
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
key={router.asPath}
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

const query = groq`*[_type == 'giclee' && slug.current == $slug][0]{
  title,
  image,
  slug,
  printsize,
  mountedsize,
  size,
  mountedprice,
  price,
  order,
  "current": { 
    "slug": slug.current,title,order 
  },
  "next": *[_type == 'giclee' && ^._createdAt < _createdAt] | order(_createdAt asc)[0]{ 
      "slug": slug.current,title,order
  },
  "previous": *[_type == 'giclee' && ^._createdAt > _createdAt] | order(_createdAt asc)[-1]{ 
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
  const paths = await client.fetch(groq`*[_type == "giclee" && defined(slug.current)][].slug.current`)
  return {
    paths: paths.map((slug: {slug: any}) => ({params: {slug}})),
    fallback: 'blocking',
  }
}
