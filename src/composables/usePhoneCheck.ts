const usePhoneCheck = (phone:string):string =>{
    return phone.replace(/[^0-9a-zA-ZА-ЯЁёа-я- ]+/ug, '');
}
export default usePhoneCheck;