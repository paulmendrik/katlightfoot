import React, { Fragment } from 'react';
import Link from 'next/link';
import { PageLayout } from '../../layouts';
import { Box,Card,Image,  Text,  Stack } from '@chakra-ui/react';
import { urlFor } from '../../lib/api';
import { getAllPressArticles } from '../../lib/api'

type Props = {
  props: any;
}


export default function Press({ props }: Props) {
 
return (

<PageLayout>

<Box>
<Text as={'h1'} className="title" pt={['1.5rem', '2rem']}  fontSize={['1.2rem','1.4rem']} >
Press
</Text>
</Box>

<Fragment>



{props.map((prop: { _id: any; title: string; image: any, intro: any; slug: any; }) => 
<Card
  key={prop._id}
  mt={['0.5rem', '2rem']}
  className='press'
  direction={['column', 'row']}
  variant='unstyled'
>

<Box w={['100%', '25%']}>
<Image 
src={urlFor(prop.image).url()} 
width={['100%','500px']} 
objectFit={'fill'}
objectPosition={'center'}
alt={prop.title} 
/>
</Box>

<Box py={['1rem', '0']} pl={['0', '1rem']} w={['100%', '75%']}>
<Stack>  
<Text as={'h3'}  fontSize={['1.125rem','1.25rem']} > {prop.title} </Text>
<Text as={'p'}  fontSize={['1rem','1rem']} > {prop.intro} </Text>
<Link  href={`/press/${prop.slug}`}  scroll={false}>Read More</Link>
</Stack>
</Box>
</Card>

)}



</Fragment> 


</PageLayout>


)
}



export async function getStaticProps(){
  const props = await getAllPressArticles();
  return {
    props: {
      props
    },
    revalidate: 10,
  }
}