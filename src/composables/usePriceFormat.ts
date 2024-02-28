export const usePriceFormat = (price:number) => {
    return (price) ? price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") : price;
}