import React, { Fragment, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Box, Flex, IconButton, List, ListItem } from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon} from '@chakra-ui/icons';
import { item } from '../lib/types'; 



export const Nav = () => {


const [ isOpen, setOpen ] = useState(false);

const router = useRouter()

const black =  ( router.asPath != '/')


const menu = {
    initial: { y: '-2000px', height: 0, opacity: 0, transition: { duration: 2, type: 'tween'}},
    open: { y: 0, height: '100vh',  opacity: 0.9, transition: { duration: 2, type: 'tween'}},
    closed: { y: '-2000px', height: 0, opacity: 0, transition: { duration: 2, type: 'tween'}}
}
   
const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 1, delay: 0.5,  duration: 1,  ease: 'easeInOut' } },
    exit: { opacity: 0 },
}


function refreshPage() {
    window.location.reload();
    setOpen(false);
}

function openMenu() {
    setOpen(true)
 }

function closeMenu() {
   window.location.reload();
   setOpen(false)
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
label: 'Gallery',
href: '/gallery',
key: '3',
},
{
label: 'Canvas',
href: '/canvas',
key: '4'
},
{
label: 'Giclee',
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
label: 'Contact',
href: '/contact',
key: '8',
}
]


return (

<Fragment>


<Box 
className={'icon'} 
mt={'-1'}
onClick={isOpen ? closeMenu : openMenu} 
>
{isOpen ? <CloseIcon boxSize={['4','4']} color={'white'} /> : <HamburgerIcon  boxSize={['6','8']} color={black ? '#A0AEC0' : 'white'} /> }  
</Box>

<Box 
className="navigation"
as={motion.div}
variants={menu}
initial={"initial"}
animate={isOpen ? "open" : "closed"}
>
<Flex className='menu'>
<List  
mt={['-120','0']}
as={motion.div} 
variants={container}
initial="hidden"
animate={isOpen ? "show" : "hidden"}
exit="hidden"
>
<AnimatePresence>
{items.map((item, i ) => (
<motion.div
key={item.key} 
initial={!isOpen ? { opacity: 0 } : { opacity: 1 }}
animate={isOpen ? { opacity: 1 } : { opacity: 0 }}
exit={!isOpen ? { opacity: 0} : { opacity: 1 }}
transition={{ duration: 1, delay: i * 1 , ease: 'linear'}}
>
<ListItem py={['2px', '4px']} fontSize={['1.2rem', '1.6rem']} lineHeight={['1.6rem', '1.8rem']}>
<Link href={item.href} onClick={closeMenu}>{item.label}</Link>
</ListItem>
</motion.div>
))}
</AnimatePresence>
</List>
</Flex>
</Box>
</Fragment>   
)
}
