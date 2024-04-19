
import axios from 'axios'
const storedJsonString = localStorage.getItem('userData');

// Parse the JSON string back into an object
const storedData = JSON.parse(storedJsonString);
const auth= localStorage.getItem('key')
console.log(auth)

const getHeaderConfig = () => {
    return {
        headers: {
            Authorization: localStorage.getItem('key')
        }
    };
};


export const postNotes = async(data)=>{
    
    let res = await axios.post("https://fundoonotes.incubation.bridgelabz.com/api/notes/addNotes",data,getHeaderConfig())
    return res
}

export const getNotes = async()=>{
    let result = await axios.get("https://fundoonotes.incubation.bridgelabz.com/api/notes/getNotesList",getHeaderConfig())
    return result
}



export const Deleting= async(obj)=>{
    let response = await axios.post("https://fundoonotes.incubation.bridgelabz.com/api/notes/trashNotes",obj,getHeaderConfig())
    return response
}

export const updateArchive= async(obj)=>{
    let response = await axios.post("https://fundoonotes.incubation.bridgelabz.com/api/notes/archiveNotes",obj,getHeaderConfig())
    return response
}

export const UpdateColor= async(obj)=>{
    let response = await axios.post("https://fundoonotes.incubation.bridgelabz.com/api/notes/changesColorNotes",obj,getHeaderConfig())
    return response
}

export const DeleteForever = async(obj)=>{
    let res= await axios.post('https://fundoonotes.incubation.bridgelabz.com/api/notes/deleteForeverNotes',obj,getHeaderConfig())
    return res
}

export const EditeNotes= async (id,obj)=>{
    let res= await axios.patch(`https://fundoonotes.incubation.bridgelabz.com/api/notes/${id}`,obj,getHeaderConfig())
    return res
}