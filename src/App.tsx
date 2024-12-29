// import './App.css'

import { data, Navigate, Route, Routes } from "react-router-dom"
import NewNote from "./components/NewNote"
import { useLocalStorage } from "./hooks/useLocalStorage"
import { useMemo } from "react"
import {v4 as uuidV4} from "uuid"
import NoteList from "./components/NoteList"
import { NoteLayout } from "./components/NoteLayout"
import { Note } from "./components/Note"
import EditNote from "./components/EditNote"
export type Note = {
  id: string
} & NoteData

export type NoteData = {
  title:string,
  markdown: string,
  tag: Tag[]
}

export type Tag={
  id:string,
  label:string
}

export type RawNote={
  id:string
} & RawNoteData

export type RawNoteData = {
  title:string,
  markdown: string,
  tagIds: string[] 
}

function App() {
  const [notes,setNotes] = useLocalStorage<RawNote[]>("NOTE",[])
  const [tags,setTags] = useLocalStorage<Tag[]>("TAG",[])
  
  const notesWithTags = useMemo(() => {
    return notes.map((note)=>{
      return {...note, tags: tags.filter((tag)=>{
        note.tagIds.includes(tag.id)
      })}
    })
  }, [notes,tags])

  function onCreateNote({...data}:NoteData){
    setNotes((prevNotes)=>{
      return [
        ...prevNotes,
        {...data, id:uuidV4(), tagIds:tags.map((tag)=>tag.id)}
      ]
    })
  }

  function addTag(tag:Tag){
    setTags(prev=>[...prev,tag])
  }

  function onUpdateNote(id:string, {...data}:NoteData){
    setNotes((prevNotes)=>{
      return prevNotes.map(note=>{
        if(note.id === id)
          return {...note, ...data, tagIds:tags.map((tag)=>tag.id)}
        else
          return note
      })
    })
  }

  function onDelete(id:string){
    setNotes(prevNotes=>{
      return prevNotes.filter(note=>note.id !== id)
    })
  }
  return (
    <div className="m-4">
      <Routes>
        <Route path="/" element={<NoteList notes={notesWithTags} availableTags={tags}/>}/>

        <Route path="/new" element={<NewNote onSubmit={onCreateNote} onAddTag={addTag} availableTags={tags}/>}/>

        <Route path="/:id" element={<NoteLayout notes={notesWithTags}/>}>
          <Route index element={<Note onDelete={onDelete}/>}/>
          <Route path="edit" element={<EditNote onSubmit={onUpdateNote} onAddTag={addTag} availableTags={tags}/>}/>
          <Route path="*" element={<Navigate to="/" />}/>
        </Route>

      </Routes>
    </div>
  )
}

export default App
