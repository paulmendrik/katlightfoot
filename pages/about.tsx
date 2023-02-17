import React, { Fragment } from 'react';
import { PortableText } from '@portabletext/react';
import { urlFor } from '../lib/api';
import { PageLayout } from '../layouts';
import {AspectRatio, Box, Image, Text } from '@chakra-ui/react';
import { getAboutPage } from '../lib/api';

type Props = {
  props: any;
}


export default function About({ props }: Props) {


return (

<Fragment>
<PageLayout>
<Box>
<Text as={'h1'} className="title" pt={['1.5rem', '2rem']} fontSize={['1.2rem','1.4rem']} >Biography</Text>
</Box>
<Box className="about" mt={['1.5rem', '2rem']} > 
{props.map((prop: { _id: any; image: any; title: string; content: any; }) =>
<Box >
<Box className='image'  ml={['0','4rem']} mb={['1rem', '2rem']} float={['none', 'right']}  >

<Image  
src={urlFor(prop.image).url()} 
width={['100%','400px']}
objectFit={'fill'} 
objectPosition={'center'}
alt={prop.title} 
/> 

</Box>
<PortableText value={prop.content} />
</Box>
)}
</Box>
</PageLayout>
</Fragment>

)

}

export async function getStaticProps(){
  const props = await getAboutPage();
  return {
    props: {
      props
    },
    revalidate: 10,
  }
}