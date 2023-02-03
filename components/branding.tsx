import React, { Fragment } from 'react';
import Link from 'next/link';
import { Navigation } from './navigation';
import { Flex, Spacer, Text } from '@chakra-ui/react';


export const Branding = () => {

return (

<Fragment>
<Flex 
className={'branding'}
position={'relative'}
top={'0'}
py={['20px', '28px']} 
background={'transparent'} 
justifyContent={"center"} 
alignItems={"center"}
zIndex={'2000'} 
>

<Link href={'/'}>
<Text as={'h1'} fontSize={['1rem', '1.75rem']} color={'white'} >
Katharine Lightfoot
</Text>
</Link>

<Spacer display={['block', 'block']}/>

<Navigation/>
</Flex>
</Fragment>   
)
}