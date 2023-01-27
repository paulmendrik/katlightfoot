import React, { Fragment } from 'react';
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
<Close props={'/giclee/'}/>
{data.previous ? 
<Previous props={data.previous.slug} />
 : null }

{data.next ?
<Next props={data.next.slug} />
 : null }

<Card className='details' direction={['column-reverse', 'row']} >

<Box  pt={['40px','100px']} pb={['50px','50px']} px={['20px','0']} width={['100%','33.5%']}> 
<Flex alignContent={'center'} alignItems={'center'} height={'100%'}>
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
</Box>

<Box py={['20px','100px']} mt={['50px', '0']} width={['100%','65.5%']}>
<Box px={['20px','50px']} width={'full'}>
<AspectRatio   ratio={1}>
<Image src={urlFor(data.image).url()} />
</AspectRatio>
</Box>
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
