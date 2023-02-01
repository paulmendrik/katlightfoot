import React, { Fragment } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Icon } from '@chakra-ui/react';
import { TfiAngleLeft } from 'react-icons/tfi';


type Props = {
    props: any;
  }
 

export const Previous = ({props}: Props) => {

return (


<Fragment>
<motion.div onTap={() => window.location.reload()} >
<Link  href={props} >
<Icon as={TfiAngleLeft}
position={'fixed'}
display={['none', 'block']}
top={['65%','50%']}
left={['20px','20px']}
width={'24px'}
height={'24px'}
cursor={'pointer'}
color={'#A0AEC0'}
_hover={{color: '#4A5568'}}
zIndex={'5000'}
/>
</Link>
</motion.div>
</Fragment> 
  
)
}
