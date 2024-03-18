 const useTextHighLight = (source:string, find:string = '') => {
    // console.log(string, this.searchString)
    const searchString = (source) ? source.replace(/[^0-9a-zA-ZА-ЯЁёа-я- ]+/ug, '') : '';


    let matchString = find.match(new RegExp( find, 'gi')),
        space = new RegExp( ' ', 'g');


     console.log(searchString)
     console.log(matchString)
     return '';
    // if(matchString) {
    //     return find.replace(space, '&nbsp;').replace(matchString[0], `<span class="main-color">${matchString[0]}</span>`);
    // } else {
    //     return find;
    // }
}

export default useTextHighLight;