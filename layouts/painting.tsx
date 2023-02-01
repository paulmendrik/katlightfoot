import React, { Fragment } from 'react';
import { Box } from '@chakra-ui/react';


export const PaintingLayout = ({ children }: any) => {


return (
<Fragment>
<Box px={['20px','80px']} >
{children}
</Box>
</Fragment>   
)
}