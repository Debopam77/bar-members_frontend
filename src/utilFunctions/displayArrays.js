const arrayToString = (array, limit) => {
    let result = '';
    if(!limit)
        limit = 20;
    array.forEach((element, key)=> {
        if(key > limit - 1)
            return;
        result = result + element;
        if(key < array.length - 1 && key < limit - 1)
            result = result + ', ';
    });
    return result;
}

const arrayToDayString = (array) => {
    let result = '';
    const dayValue = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    
    array.forEach((element) => {
        result = result + ' ' + dayValue[parseInt(element) - 1];
    });

    return result
}

export {arrayToString, arrayToDayString};