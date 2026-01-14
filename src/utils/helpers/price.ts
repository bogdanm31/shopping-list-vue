export const formatPrice = (value: string | number) => new Intl.NumberFormat('it-IT', {
  style:'currency',
  currency: 'EUR'
}).format(+value);