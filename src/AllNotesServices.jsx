
import axios from 'axios'

const headerConfig = {
    headers : {
        Authorization: localStorage.getItem('token')
    }
}

export const postNotes = async(data)=>{
    console.log(headerConfig)
    let res = await axios.post("https://fundoonotes.incubation.bridgelabz.com/api/notes/addNotes",data,headerConfig)
    return res
}

export const getNotes = async()=>{
    let result = await axios.get("https://fundoonotes.incubation.bridgelabz.com/api/notes/getNotesList",headerConfig)
    return result
}



export const Deleting= async(obj)=>{
    let response = await axios.post("https://fundoonotes.incubation.bridgelabz.com/api/notes/trashNotes",obj,headerConfig)
    return response
}

export const updateArchive= async(obj)=>{
    let response = await axios.post("https://fundoonotes.incubation.bridgelabz.com/api/notes/archiveNotes",obj,headerConfig)
    return response
}

export const UpdateColor= async(obj)=>{
    let response = await axios.post("https://fundoonotes.incubation.bridgelabz.com/api/notes/changesColorNotes",obj,headerConfig)
    return response
}

export const DeleteForever = async(obj)=>{
    let res= await axios.post('https://fundoonotes.incubation.bridgelabz.com/api/notes/deleteForeverNotes',obj,headerConfig)
    return res
}