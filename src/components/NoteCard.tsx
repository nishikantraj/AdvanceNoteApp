import { Tag } from "../App"
import styles from "../style/NoteListModule.module.css"

export type SimplifiedNote={
    tags:Tag[]
    title: string
    id: string
}
export const NoteCard = ({id,title,tags}:SimplifiedNote) => {
    
  return (
    <div>
      <a
        href={`/${id}`}
        className={`h-auto border-2 border-gray-400 ${styles.card}`}
      >
        <div className="flex justify-center items-center flex-col h-full">
            <span className="text-3xl break-words">{title}</span>
            {tags.length>0 &&(
                <div className="flex flex-wrap justify-center gap-1">
                    {tags.map(tag=>(
                        <span className="bg-[#2a78ed] rounded-md px-1 my-1 text-white" key={`${tag.id}`}>{tag.label}</span>
                    ))}
                </div>
            )}
        </div>
      </a>
    </div>
  )
}
