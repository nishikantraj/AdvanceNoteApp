import { NoteData, Tag } from "../App";
import Form from "./Form";

type NewNoteProps={
    onSubmit: (data:NoteData)=>void,
    onAddTag: (tag:Tag)=>void,
    availableTags: Tag[]
}

function NewNote({onSubmit, onAddTag, availableTags}:NewNoteProps){
    return (
        <>
            <h1 className="text-4xl ">New Note</h1>
            <Form onSubmit={onSubmit} onAddTag={onAddTag} availableTags={availableTags}/>
        </>
    ) 
}
export default NewNote;