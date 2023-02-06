import React, { Fragment } from 'react';
import Link from 'next/link';
import { Box, Flex, Text, Stack } from '@chakra-ui/react';


export const Footer = () => {

return (

<Fragment>
<Flex 
className='footer' 
position={'relative'}
mt={'auto'}
py={['20px', '30px']} 
borderTop={'1px #ebebeb solid'} 
width={'100%'}
>
<Stack direction={['column', 'row']}>
<Text as={'h5'} fontSize={['0.5rem', '0.5rem']} >
Copyright © 2023 Katharine Lightfoot
</Text>

<Link href={'/'}>
<Text as={'h5'} pl={['0','1rem']} fontSize={['0.5rem', '0.5rem']} >Site by IMWD </Text>
</Link>
</Stack>
</Flex>
</Fragment>   
)
}