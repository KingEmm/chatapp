export default get = async (url)=>{
    try{
        let data = await fetch('url')
        data = await data.json()
        return data;
    }catch(error){
        console.log(error);
    }
}
