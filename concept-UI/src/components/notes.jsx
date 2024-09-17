import React from "react"
import {api} from "../../convex/_generated/api";
import { useQuery } from "convex/react";
import Preview from "./preview";
import { useNavigate } from "react-router-dom";



export default function Notes () {
    const notes = useQuery(api.notes.get);
    const navigate = useNavigate()
    const blogs = useQuery(api.blogs.get);
    
    const handleClick = (note) => {
        navigate("/textEditor", { state: note });
    }

    return(
        <>
       <div className="flex-container">
       <h1>Notes</h1>
       <div className="notes-preview-container">
       {notes?.map(note =>(
        <div onClick={()=>{handleClick(note)}}>
        <Preview title={note.title} content={note.content} created_at={note._creationTime} />
        </div>
       ))}
       </div>
       </div>
       <div className="flex-container">
       <h1>Blogs</h1>
       <div className="notes-preview-container">
       {blogs?.map(blog =>(
        <div onClick={()=>{handleClick(blog)}}>
        <Preview title={blog.title} content={blog.content} created_at={blog._creationTime} />
        </div>
       ))}
       </div>
       </div>
       </>
    )
}