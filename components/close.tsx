import React, { Fragment } from 'react';
import Link from 'next/link';
import { Icon } from '@chakra-ui/react';
import { TfiClose } from 'react-icons/tfi';

type Props = {
    props: any;
  }
 

export const Close = ({props}: Props) => {

return (


<Fragment>
<Link  href={props} scroll={false} >
<Icon as={TfiClose}
position={'fixed'}
top={['30px','30px']}
right={['20px','30px']}
width={'24px'}
height={'24px'}
cursor={'pointer'}
color={'#A0AEC0'}
_hover={{color: '#4A5568'}}
zIndex={'5000'}
/>
</Link>
</Fragment> 
  
)
}
