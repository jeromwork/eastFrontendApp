 const useTextHighLight = (source:string, find:string = '') => {
    const searchString = (source) ? source.replace(/[^0-9a-zA-ZА-ЯЁёа-я- ]+/ug, '') : '';

//todo not tested for real examples
    let matchString = searchString.match(new RegExp( find, 'gi')),
        space = new RegExp( ' ', 'g');
    if(matchString) {
        return find.replace(space, '&nbsp;').replace(matchString[0], `<span class="main-color">${matchString[0]}</span>`);
    } else {
        return source;
    }
}

export default useTextHighLight;