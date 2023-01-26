import React, { Fragment } from 'react';
import { Header } from '../components/header'
import { Box } from '@chakra-ui/react';


export const GalleryLayout = ({ children }: any) => {


return (

<Fragment>
<Box px={['15px','80px']}>
<Header/>
{children}
</Box>
</Fragment>   
)
}