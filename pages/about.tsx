import React, { Fragment } from 'react';
import Image from 'next/image';
import { PortableText } from '@portabletext/react';
import { urlFor } from '../lib/api';
import { PageLayout } from '../layouts';
import { Box,Card, CardBody, Text, SimpleGrid } from '@chakra-ui/react';
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
<Card mt={['0.5rem', '2rem']} direction={['column-reverse', 'row']} variant='unstyled'>
{props.map((prop: { _id: any; image: any; title: string; content: any; }) =>
<Fragment>
<Box key={prop._id} fontSize={['1rem', '1rem']} w={['100%', '50%']} >
<PortableText value={prop.content} />
</Box>
<Box key={prop._id}  pl={['0', '2rem']} pb={'1rem'} >
<Image  src={urlFor(prop.image).url()} width={500} height={500} alt={prop.title} /> 
</Box> 
</Fragment>
)}
</Card>
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