const usePhoneCheck = (phone:string):string =>{
    phone = phone.replace(/[^0-9]/g, '');

    console.log(phone)

    const  formattedPhone = '+7( ' + phone.substring(0, 3) + ' ' + phone.substring(3, 6) + ' ' + phone.substring(6, 9);

    return formattedPhone;
    // return phone.replace(/[^0-9a-zA-ZА-ЯЁёа-я- ]+/ug, '');
}
export default usePhoneCheck;