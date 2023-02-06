import React, { Fragment } from 'react';
import { motion } from 'framer-motion';
import { Header, Footer } from '../components';
import { Box } from '@chakra-ui/react';


export const PageLayout = ({ children }: any) => {


return (

<Fragment>
<motion.div
initial={{ x: -300, opacity: 0 }}
animate={{ x: 0, opacity: 1 }}
exit={{ x: -300, opacity: 0 }}
transition={{ delay: 0.1 , type: 'tween', ease: 'linear'}}
>
<Box position={'relative'} px={['15px','40px']}>
<Header nav={'#010101'} color={'#010101'} border={'1px #ebebeb solid'}/>
{children}
<Footer/>
</Box>
</motion.div>
</Fragment>   
)
}