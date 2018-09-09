
export const toCurrency = (num: number): any => {
    return (num).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'); 
}

// export const formatTime = (date: string): any => {
//     const d = new Date(date);
//     return(`${d.getMonth()}-${d.getDate()}-${d.getFullYear()}`);
// }

export const formatTime = (data: string): string => {
    return data.replace(/(.+)T(.+)/, '$1');
}

export const stringTruncate = (str: string): any => {
    if(str.length > 10){
     return `${str.substring(0, 10)}...`;
    }
    return str;
}

export const logoutClearUp = () => {
    localStorage.clear();
}