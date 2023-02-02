import React, { Fragment } from 'react';
import Image from 'next/image';
import { PortableText } from '@portabletext/react';
import { urlFor } from '../lib/api';
import { PageLayout } from '../layouts';
import { Box,Card,CardBody,Text } from '@chakra-ui/react';
import { getContactPage } from '../lib/api';

type Props = {
  props: any;
}

export default function Contact({props}: Props) {
return (
<Fragment>
<PageLayout>
<Box>
<Text as={'h1'} className="title" pt={['1.5rem','2rem']} fontSize={['1.2rem','1.4rem']}>Contact</Text>
</Box>
<Box className="contact">
{props.map((prop: { _id: any; image: any; title: string; content: any; }) =>
<Card key={prop._id} mt={['0.5rem', '2rem']} direction={{ base: 'column', sm: 'row' }} variant='unstyled'>
<Box mb={['0','1rem']}  w={['100%', 'auto']}>
<Image 
src={urlFor(prop.image).url()} 
width={500} 
height={500} 
alt={prop.title} 
/>
</Box>
<CardBody pl={['0','2rem']} py={['1rem', '0']}  w={['100%', '50%']} >
<PortableText value={prop.content} /> 
</CardBody>
</Card>
)}
</Box>
</PageLayout>
</Fragment>
)

}

export async function getStaticProps(){
  const props = await getContactPage();
  return {
    props: {
      props
    },
    revalidate: 10,
  }
}