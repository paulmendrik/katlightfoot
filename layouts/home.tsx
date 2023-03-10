import React, { Fragment } from 'react';
import { motion } from 'framer-motion';
import { Header } from '../components';
import { Box } from '@chakra-ui/react';


export const HomeLayout = () => {

return (

<Fragment>
<motion.div
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
exit={{ opacity: 0 }}
transition={{ delay: 0.1 , type: 'tween', ease: 'linear'}}
>
<Box px={['15px','40px']}>
<Header nav={'white'} color={'white'} border={'none'}/>
</Box>
</motion.div>
</Fragment>   
)
}