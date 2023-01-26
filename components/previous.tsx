import React, { Fragment } from 'react';
import Link from 'next/link';
import { Icon } from '@chakra-ui/react';
import { TfiAngleLeft } from 'react-icons/tfi';


type Props = {
    props: any;
  }
 

export const Previous = ({props}: Props) => {

return (


<Fragment>
<Link  href={props} >
<Icon as={TfiAngleLeft}
position={'fixed'}
top={['65%','40%']}
left={['20px','30px']}
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
