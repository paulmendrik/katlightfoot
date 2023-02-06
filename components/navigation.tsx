import React, { Fragment, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Box, Flex, List, ListItem } from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon} from '@chakra-ui/icons';
import { item } from '../lib/types'; 

type Props = {
    color: any;
}


export const Navigation = ({color}: Props) => {


const [ isOpen, setOpen ] = useState(false);

const icon = {
    hidden: { scale: 0, opacity: 0 },
    show: { scale: 1, opacity: 1, transition: { delay: 0.5,  duration: 1,  ease: 'easeInOut'}},
    exit: { scale: 0, opacity: 0 }
}

const menu = {
    initial: { y: '-2000px', height: 0, opacity: 0, transition: { duration: 2, type: 'tween'}},
    open: { y: 0, height: '100vh',  opacity: 1, transition: { duration: 2, type: 'tween'}},
    closed: { y: '-2000px', height: 0, opacity: 0, transition: { duration: 2, type: 'tween'}}
}
   
const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 1, delay: 0.5,  duration: 1,  ease: 'easeInOut' } },
    exit: { opacity: 0 },
}

const items: Array<item> = [
{
label: 'Home',
 href: '/',
 key: '1',
},
{
label: 'About',
href: '/about',
key: '2',
},
{
label: 'Paintings',
href: '/paintings',
key: '3',
},
{
label: 'Canvas Prints',
href: '/canvas',
key: '4'
},
{
label: 'Giclee Prints',
href: '/giclee',
key: '5'
},
{
label: 'Exhibitions',
href: '/exhibitions',
key: '6'
},
{
label: 'Press',
href: '/press',
key: '7',
},
{
label: 'The Mew Stone Gallery',
href: 'https://www.themewstonegallery.com',
key: '8',
},
{
label: 'Contact',
href: '/contact',
key: '9',
}
]


return (

<Fragment>


<Box 
as={motion.div}
className={'icon'} 
mt={'-1'}
onTap={() => setOpen(!isOpen)}
cursor={'pointer'}
>
<HamburgerIcon  boxSize={['6','8']} color={color}  />  
</Box>

<AnimatePresence>
{isOpen && ( 
<Box 
className="navigation"
as={motion.div}
variants={menu}
initial={"initial"}
animate={"open"}
exit={"closed"}
color={color}
>

<Box 
as={motion.div}
className={'close'}
variants={icon}
initial="hidden"
whileInView={"show"}
position={'absolute'} 
top={['1.25rem','2.5rem']}
right={['15px','40px']}
onTap={() => setOpen(!isOpen)}
cursor={'pointer'}
zIndex={'4000'}
>
<CloseIcon boxSize={['4','4']} color={'white'} /> 
</Box>

<Flex className='menu'>
<List  
mt={['-120','0']}
as={motion.div} 
variants={container}
initial="hidden"
whileInView={"show"}
>

{items.map((item, i ) => (
<motion.div
key={item.key}
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
transition={{ duration: 1, delay: i * 0.75 , ease: 'linear'}}
>
<ListItem  py={['2px', '4px']} fontSize={['1.2rem', '1.6rem']} lineHeight={['1.6rem', '1.8rem']}>
<Link href={item.href }>{item.label}</Link>
</ListItem>
</motion.div>
))}

</List>
</Flex>
</Box>
)}
</AnimatePresence>
</Fragment>   
)
}
