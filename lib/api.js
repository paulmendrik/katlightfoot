import groq from 'groq';
import client from './sanity';
import imageUrlBuilder from '@sanity/image-url';

const builder = imageUrlBuilder(client)

export function urlFor(source) {
  return builder.image(source)
}

const sliderFields = `
  _id,
  title,
  slide,
  mobile,
  order
`
export async function getAllSlides() {
  const results = await client
    .fetch(`*[_type == "slider"] | order(order) {${sliderFields}}`);
  return results;
}

const paintingFields = `
  _id,
  title,
  image,
  'slug': slug.current,
  price,
  order, 
  currentPainting,
`

export async function getAllPaintings() {
  const results = await client
    .fetch(`*[_type == "gallery"] | order(order) {${paintingFields}}`);
  return results;
}



const canvasFields = `
  _id,
  title,
  image,
  'slug': slug.current,
  size,
  price,
  order
`

export async function getAllCanvasPrints() {
  const results = await client
    .fetch(`*[_type == "canvas"] | order(order) {${canvasFields}}`);
  return results;
}

const gicleeFields = `
  _id,
  title,
  image,
  'slug': slug.current,
  printsize,
  mountedsize,
  size,
  mountedprice,
  price,
  order
`

export async function getAllGicleePrints() {
  const results = await client
    .fetch(`*[_type == "giclee"] | order(order) {${gicleeFields}}`);
  return results;
}


const aboutFields = `
  _id,
  title,
  image,
  content
`
export async function getAboutPage() {
  const results = await client
    .fetch(`*[_type == "about"]{${aboutFields}}`);
  return results;
}


const contactFields = `
  _id,
  title,
  image,
  content
`
export async function getContactPage() {
  const results = await client
    .fetch(`*[_type == "contact"]{${contactFields}}`);
  return results;
}

const exhibitionsFields = `
  _id,
  title,
  content,
  exhibitions,
  slides,
  'images': slides[].asset->url,
  'venues': exhibitions[].venue,
  'dates': exhibitions[].date,
  'expos': exhibitions[],
`

export async function getExhibitionsContent() {
  const results = await client
    .fetch(`*[_type == "exhibitions"]{${exhibitionsFields}}`);
  return results;
}



export async function getExhibitionsSlides() {
  const results = await client
    .fetch(`*[_type == "exhibitions"] {'slideUrl': slides[0].asset->url}`); 
  return results;
}


const pressFields = `
  _id,
  title,
  'slug': slug.current,
  intro,
  image,
  content,
`



export async function getAllPressArticles() {
  const results = await client
    .fetch(`*[_type == "press"] {${pressFields}}`);
  return results;
}