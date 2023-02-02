import React, { Fragment } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Nav } from './nav';
import { Flex, Spacer, Text } from '@chakra-ui/react';


export const Header = () => {

const router = useRouter();
const black =  ( router.route != '/')


return (

<Fragment>
<Flex 
className={'header'}
position={'relative'}
top={'0'}
py={['20px', '28px']} 
background={black ? 'transparent' : '#ffffff'} 
borderBottom={black ? '1px #ebebeb solid' : 'none'}
justifyContent={"center"} 
alignItems={"center"}
zIndex={'2000'} 
>

<Link href={'/'}>
<Text as={'h1'} fontSize={['1rem', '1.75rem']} color={black ? '#010101' : 'white'} >
Katharine Lightfoot
</Text>
</Link>

<Spacer display={['block', 'block']}/>

<Nav/>
</Flex>
</Fragment>   
)
}