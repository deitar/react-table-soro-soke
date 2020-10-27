// to enable deep level flatten use recursion with reduce and concat
function flatDeep(arr, d = 1) {
    return d > 0 ? arr.reduce((acc, val) => acc.concat(Array.isArray(val) ? flatDeep(val, d - 1) : val), []) :
        arr.slice();
};

function range(lowEnd, highEnd) {
    var list = [];
    for (var i = lowEnd; i <= highEnd; i++) {
        list.push(i);
    }
}

function getArrayDepth(value) {
    return Array.isArray(value) ? 
    1 + Math.max(...value.map(getArrayDepth)) :
    0;
}


export default flatDeep;