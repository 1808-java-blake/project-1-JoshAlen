
export const toCurrency = (num: number): any => {
    return (num).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'); 
}

export const formatTime = (date: string): any => {
    const d = new Date(date);
    return(`${d.getMonth()}-${d.getDate()}-${d.getFullYear()}`);
}