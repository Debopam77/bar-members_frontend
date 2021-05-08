    //Function to make objects from arrays like : [1,2,3] => {{value : 1}, {value : 2}, {value : 3}}
    const arrToObj = (toConvert)=> {
        let arr = toConvert;
        arr.forEach((value, key)=> {
            if( value )
                 arr[key] = { 'value' : value }
            else 
                arr[key] = {}
        });
        return arr.filter((value) => {
            return (value['value'])
        });
    }

    //Will convert array like ['dayHere', false, false, false, 'dayHere', false, 'dayHere'] to [1,5,7]
    const keyToValueConvert = (input) => {
        let arr = [];
        input.forEach((value, key) => {
            if( value!= false )
                arr.push(key);
        });

        return arr;
    }

    export {arrToObj, keyToValueConvert};