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

export {arrayToString};