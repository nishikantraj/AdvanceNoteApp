import { useMemo, useState } from "react"
import { Link } from "react-router-dom"
import ReactSelect from "react-select"
import { Tag } from "../App"
import { NoteCard, SimplifiedNote } from "./NoteCard"


type NoteListProps={
  availableTags:Tag[]
  notes: SimplifiedNote[]
}
export const NoteList = ({availableTags, notes}:NoteListProps) => {
    const [selectedTags, setSelectedTags] = useState<Tag[]>([])
    const [title, setTitle] = useState("")
    
    const filteredNotes= useMemo(()=>{
      return notes.filter(note=>{
        return (title==="" || note.title.toLowerCase().includes(title.toLowerCase())) && (selectedTags.length==0 || selectedTags.every(tag=>note.tags.some(noteTag=> noteTag.id==tag.id)))
      })
    },[title, selectedTags, notes])
    console.log(filteredNotes);
    
  return (
    <div>

      {/* Navigatioin Pane */}
      <div className="flex justify-center gap-5">
        <p>
          MarkDown layout is not working. Will be fixed soon.
        </p>
        <a href="https://github.com/nishikantraj/AdvanceNoteApp" className="underline text-red-600">Source code</a>
      </div>
      <div id="navigationPane" className="flex">
          <h1 className="text-4xl font-bold flex-1">Notes</h1>
          <div className="h-auto w-1/4 flex justify-around items-center">
              <Link to="/new">
                <button className="border-[1px] border-gray-400 rounded-md px-3 py-1 bg-[#517dc0] hover:bg-[#116EFA] text-white">Create</button>
              </Link>
              <Link to="/">
                <button className="border-[1px] border-gray-400 rounded-md px-3 py-1 text-gray-500 bg-gray-200 hover:bg-gray-400 hover:text-white">Edit Tags</button>
              </Link>
          </div>
      </div>

      {/* title and tag */}
      <div>
          <form >
            <div className="py-5 flex justify-between w-1/2 gap-24">
              {/* Title input */}
              <div id="title" className="flex flex-col gap-1 w-full">
                  <label className="text-gray-700 font-medium">Title</label>
                  <input
                      className="border-2 border-gray-500 rounded-md h-10 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      type="text"
                      value={title}
                      onChange={e=>setTitle(e.target.value)}
                  />
              </div>

              {/* Tag input */}
              <div id="tags" className="flex flex-col gap-1 w-full">
                  <label>Tags</label>
                  {/* <input className="border-2 border-gray-500 rounded-md" type="text"/> */}
                  <ReactSelect 
                      className="border-2 border-gray-500 rounded-md"
                      isMulti
                      options={availableTags.map(tag=>{
                          return {label:tag.label,value:tag.id}
                      })}
                      value={selectedTags.map((tag)=>{
                          return {label:tag.label,value:tag.id}
                      })}
                      onChange={tags=>{
                          setSelectedTags((tags.map((tag)=>{
                              return {label:tag.label, id:tag.value}
                          })))
                      }}
                  />
              </div>
          </div>
        </form>
      </div>

      {/* NoteCards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-3">
          {filteredNotes.map(note=>(
            <div key={note.id}>
              <NoteCard id={note.id} title={note.title} tags={note.tag}/>
            </div>
          ))}
      </div>
    </div>
  )
}

export default NoteList