import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { useNote } from "./NoteLayout";
import {Link, Navigate, useNavigate } from 'react-router-dom'
import styles from "../style/NoteListModule.module.css"

type NoteProps={
    onDelete: (id:string)=>void
}
export const Note = ({onDelete}:NoteProps) => {
    const note = useNote();
    const navigate = useNavigate()
    // console.log(<ReactMarkdown>{note.markdown}</ReactMarkdown>);

    return (
        <>
            {/* Navigation Pane */}
            <div className="flex mb-5 ml-16">
                <div className="flex flex-1 flex-col">
                    <span className="text-3xl break-words">{note.title}</span>
                    {note.tag.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                            {note.tag.map((tag) => (
                                <span
                                    className="bg-[#2a78ed] rounded-md px-1 my-1 text-white"
                                    key={`${tag.id}`}
                                >
                                    {tag.label}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
                <div className="h-auto w-1/4 flex justify-around items-center">
                    <Link to={`/${note.id}/edit`}>
                        <button className="border-[1px] border-gray-400 rounded-md px-3 py-1 bg-[#2660b6] hover:bg-[#116EFA] text-white">
                            Edit
                        </button>
                    </Link>
                    <button
                        onClick={()=>{
                            onDelete(note.id)
                            navigate("/")
                        }} 
                        className="border-[1px] border-gray-400 rounded-md px-3 py-1 text-red-400 bg-gray-200 hover:bg-red-400 hover:text-black">
                        Delete
                    </button>
                    <Link to="..">
                        <button className="border-[1px] border-gray-400 rounded-md px-3 py-1 bg-gray-200 hover:bg-gray-400">
                            Back
                        </button>
                    </Link>
                </div>
            </div>

            {/* Main Content Markdown */}
            <ReactMarkdown
                className={`h-auto border-2 border-gray-400 ${styles.markdown}`}
                children={note.markdown}
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
            />
        </>
    );
};
