import React, { Fragment } from 'react';
import { motion  } from "framer-motion";
import { PortableText } from '@portabletext/react';
import { AspectRatio, Box, Image, Card, Text, SimpleGrid } from '@chakra-ui/react';
import { PageLayout } from '../layouts';
import { getExhibitionsContent } from '../lib/api';
import { urlFor } from '../lib/api';


type Props = {
  props: any;
}

export default function Exhibitions({ props }: Props) {

const item = {
hidden: { opacity: 0 },
show: { opacity: 1 }
}

const container = {
hidden: { opacity: 0 },
show: { opacity: 1, transition: { staggerChildren: 1, type: 'tween', duration: 0.1, ease: 'easeInOut' } }
}
    
return (

<Fragment>        

{props.map((prop: { _id: any; content: any; expos: any; }) => 


<PageLayout>

<Box>
<Text as={'h1'} className="title" pt={['1.5rem', '2rem']}  fontSize={['1.2rem','1.4rem']} >
Exhibitions
</Text>
</Box>

<Box pt={'1.5rem'}>
<PortableText key={prop._id} value={prop.content} />
</Box>


<SimpleGrid
className='exhibition'
mt={['1rem', '1rem']}
as={motion.div} 
variants={container}
initial="hidden"
whileInView={"show"}
columns={[1,4]} 
spacingX={['0','20px']}
spacingY={['10px', '10px']}
>


{prop.expos.map((expo: { venue: string ; image: any; }, i: React.Key | null | undefined) =>
<Box key={i} as={motion.div} variants={item} >
<AspectRatio  ratio={1/1}>
<Image
src={urlFor(expo.image.asset).url()}
width={['100%', '100%']}
height={100}
alt={expo.venue}
/>
</AspectRatio>
<Text as={'h4'} className={'title'} py={'30px'} >{expo.venue}</Text>
</Box>
)}
</SimpleGrid>

</PageLayout>
              
)}

</Fragment>
      
)
}


export async function getStaticProps(){
  const props = await getExhibitionsContent();
  return {
    props: {
      props
    },
    revalidate: 10,
  }
}