import React, { Fragment } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Nav } from './nav';
import { Flex, Spacer, Text } from '@chakra-ui/react';


export const Header = () => {

const router = useRouter();
const white =  (router.asPath == '/')


return (

<Fragment>
<Flex 
className={'header'}
position={'relative'}
top={'0'}
py={['20px', '28px']} 
background={white ? 'transparent' : '#ffffff'} 
borderBottom={white ? 'none' : '1px #ebebeb solid'}
justifyContent={"center"} 
alignItems={"center"}
zIndex={'2000'} 
>

<Link href={'/'}>
<Text as={'h1'} fontSize={['1rem', '1.75rem']} color={white ? 'white' : '#010101'} >
Katharine Lightfoot
</Text>
</Link>

<Spacer display={['block', 'block']}/>

<Nav/>
</Flex>
</Fragment>   
)
}