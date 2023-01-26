import React, { Fragment } from 'react';
import { Box } from '@chakra-ui/react';


export const PaintingLayout = ({ children }: any) => {


return (
<Fragment>
<Box px={['0','100px']}>
{children}
</Box>
</Fragment>   
)
}