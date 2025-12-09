const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function fetchSafaris(){
    const res =await fetch(`${BASE_URL}/safaris?populate=*`);
    if(!res.ok) throw new Error("failed to fetch safaris");
    const data = await res.json();
    return data.data
}
//fetching all safaris
 export async function fetchSafarisById(id) {
    const res = await fetch(`${BASE_URL}/safaris/${id}?populate=*`);
    if(!res.ok) throw new Error ("faile to fetch safari");
    const data = await res.json();
    return data.data;
    
 }