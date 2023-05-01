const urlAlphabet = 'useandomr26T198340abcd75pxefghijklrtyuertykqxtoaxbfhjklqvwyzrict'

 export const nanoid = (size = 21) => {
  let id = ''
  let i = size
  while (i--) {
    id += urlAlphabet[(Math.random() * 64) | 0]
  }
  return id
 }