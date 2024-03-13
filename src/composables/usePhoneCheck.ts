const usePhoneCheck = (phone:string):string =>{
    phone = phone.replace(/\D+/g, '');
    // if (!phone) phone = '+7('
    return phone;
    // return phone.replace(/[^0-9a-zA-ZА-ЯЁёа-я- ]+/ug, '');
}
export default usePhoneCheck;