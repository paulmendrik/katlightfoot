import React, { Fragment } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import groq from 'groq';
import { PortableText } from '@portabletext/react';
import { PageLayout } from '../../layouts';
import { Box, Text } from '@chakra-ui/react';
import { urlFor } from '../../lib/api';
import client from '../../lib/sanity';


type Props = {
  data: any;
}

export default function Article({ data }: Props) {
return (

<Fragment>
<PageLayout>
<Box>
<Text as={'h1'} className="title" pt={['1.5rem', '2rem']} fontSize={['1.2rem','1.4rem']} >{data.title}</Text>
</Box>

<Box className="press" mt={['1.5rem', '2rem']} mb={['2rem', '2rem']} > 
<Box  fontSize={['1rem', '1rem']}>
<Box float={['none', 'left']} mr={['0', '1.5rem']} mb={['1rem', '1.5rem']} >
<Image  src={urlFor(data.image).url()} width={400} height={400} alt={data.title} /> 
</Box> 
<PortableText value={data.content} />
<Link href="/press">Back</Link>
</Box>
</Box>
</PageLayout>
</Fragment>
)
}

const query = groq`*[_type == 'press' && slug.current == $slug][0]{
  title,
  image,
  intro,
  slug,
  content
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
  const paths = await client.fetch(groq`*[_type == "press" && defined(slug.current)][].slug.current`)
  return {
    paths: paths.map((slug: {slug: any}) => ({params: {slug}})),
    fallback: 'blocking',
  }
}

