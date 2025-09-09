
export const valiseURLConvert = (name)=>{

    const url = name?.toString().replace(" ","-").replace(",","-").replaceAll("&" , "-")

        return url
}