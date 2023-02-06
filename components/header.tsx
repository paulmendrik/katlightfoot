import React, { Fragment } from 'react';
import Link from 'next/link';
import { Navigation } from './navigation';
import { Flex, Spacer, Text } from '@chakra-ui/react';

type Props = {
    color: any;
    border: any;
    nav: any;
}


export const Header = ({color, border, nav}: Props) => {

return (

<Fragment>
<Flex 
className={'header'}
position={'relative'}
top={'0'}
py={['20px', '28px']} 
background={'transparent'} 
borderBottom={border}
justifyContent={"center"} 
alignItems={"center"}
zIndex={'2000'} 
>

<Link href={'/'}>
<Text as={'h1'} fontSize={['1rem', '1.75rem']} color={color} >
Katharine Lightfoot
</Text>
</Link>

<Spacer display={['block', 'block']}/>

<Navigation color={nav}  />
</Flex>
</Fragment>   
)
}