import { FormEvent, useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import CreatableReactSelect from "react-select/creatable"
import { NoteData, Tag } from "../App"
import {v4 as uuidV4} from "uuid"

type NoteFormProps={
    onSubmit: (data:NoteData)=>void,
    onAddTag: (tag:Tag)=>void,
    availableTags: Tag[]
} & Partial<NoteData>

const Form = ({onSubmit, onAddTag, availableTags,title="", markdown="",tag=[]}:NoteFormProps) => {
    const titleRef = useRef<HTMLInputElement>(null)
    const markDownRef = useRef<HTMLTextAreaElement>(null)
    const [selectedTags, setSelectedTags] = useState<Tag[]>(tag)
    const navigate = useNavigate()
    
    function handleSubmit(e:FormEvent){
        e.preventDefault()
        
        onSubmit({
            title: titleRef.current!.value,
            markdown: markDownRef.current!.value,
            tag: selectedTags
        })
        navigate("..")
    }
  return (
    <div>
        <form onSubmit={handleSubmit}>

            <div className="py-5 flex justify-between w-1/2 gap-24">
                
                {/* Title input */}
                <div id="title" className="flex flex-col gap-1 w-full">
                    <label className="text-gray-700 font-medium">Title</label>
                    <input
                        className="border-2 border-gray-500 rounded-md h-10 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        type="text"
                        placeholder="Enter your title"
                        required
                        ref={titleRef}
                        defaultValue={title}
                    />
                </div>

                {/* Tag input */}
                <div id="tags" className="flex flex-col gap-1 w-full">
                    <label>Tags</label>
                    {/* <input className="border-2 border-gray-500 rounded-md" type="text"/> */}
                    <CreatableReactSelect 
                        className="border-2 border-gray-500 rounded-md"
                        isMulti
                        onCreateOption={label=>{
                            const newTag = {id:uuidV4(), label}
                            onAddTag(newTag)
                            setSelectedTags(prev=>[...prev,newTag])
                        }}
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


            <div>
                {/*Form to write */}
                <div id="markdown" className="flex flex-col gap-1 w-full">
                    <label>Body</label>
                    <textarea rows={20}
                        required
                        placeholder="type here..."
                        ref={markDownRef}
                        defaultValue={markdown}
                        className="border-2 border-gray-500 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                </div>

                {/* buttons */}
                <div id="btn" className="flex justify-end gap-3 mt-1">
                    <button type="submit" className="border-2 border-gray-400 rounded-md px-3 py-1 bg-[#116EFA] text-white">
                        Submit
                    </button>
                    <Link to={".."}>
                        <button type="button" className="border-2 border-gray-400 rounded-md px-3 py-1 bg-red-800 text-white">
                            Cancel
                        </button>
                    </Link>
                </div>
            </div>
        </form>

    </div>
  )
}

export default Form