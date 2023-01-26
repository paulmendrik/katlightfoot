import React, { Fragment } from 'react';
import { Header } from '../components/header'
import { Box, Flex, Spacer, Text } from '@chakra-ui/react';


export const PageLayout = ({ children }: any) => {


return (

<Fragment>
<Box px={['15px','40px']}>
<Header/>
{children}
</Box>
</Fragment>   
)
}