
import sanityClient from '@sanity/client';

const options = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  projectId: 'cy2u04th',
  useCdn: typeof document !== 'undefined' && process.env.NODE_ENV === 'production',
  apiVersion: '2021-10-21'
}

export default sanityClient(options);
