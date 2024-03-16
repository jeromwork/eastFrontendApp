const usePhoneFormat = (phone:string):string =>{

    phone = phone.replace('+7(', '').replace(/[^0-9]/g, '');


    let  formattedPhone = '+7(' + phone.substring(0, 3);
    if(phone.length > 3) formattedPhone += ') '
    formattedPhone += phone.substring(3, 6)
    if(phone.length > 6) formattedPhone += '-'
    formattedPhone += phone.substring(6, 8)
    if(phone.length > 8) formattedPhone += '-'
    formattedPhone += phone.substring(8, 10)
    //its scurry code, may be exists ready git code

    return formattedPhone;
}
export default usePhoneFormat;