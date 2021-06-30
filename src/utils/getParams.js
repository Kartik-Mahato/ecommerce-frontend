const getParams = (query) => {
    if (query) {
        
        const queryString = query.split("?")[1];
        
        if (queryString.length > 0) {
            const params = queryString.split("&");
            
            const paramObject = {};
            params.forEach(param => {
                const keyValue = param.split("=");
                paramObject[keyValue[0]] = keyValue[1];
            });

            return paramObject;
        }
    }
    return {}
}

export default getParams