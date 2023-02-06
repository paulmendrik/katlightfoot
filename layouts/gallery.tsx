import React, { Fragment } from 'react';
import { motion } from 'framer-motion';
import { Header } from '../components/header'
import { Box } from '@chakra-ui/react';


export const GalleryLayout = ({ children }: any) => {


return (

<Fragment>
<motion.div
initial={{ x: -300, y: 0, opacity: 0 }}
animate={{ x: 0, y: 0, opacity: 1 }}
exit={{ x: -300, y: 0, opacity: 0 }}
transition={{ delay: 0.1 , type: 'tween', ease: 'linear'}}
>
<Box px={['15px','40px']}>
<Header nav={'#010101'} color={'#010101'} border={'1px #ebebeb solid'}/>
</Box>
<Box  px={['15px','40px']}>
{children}
</Box>
</motion.div>
</Fragment>   
)
}