import os
from dotenv import load_dotenv
from convex import ConvexClient
from .ai_services import update_document, update_blog

# Initialize the Convex client using the URL from the environment variables
client = ConvexClient(os.getenv("CONVEX_URL"))

### Notes-related Functions ###

async def get_all_notes():
    """
    Fetches all notes from the database using the Convex client.
    
    Returns:
        notes (list): A list of all note records retrieved from the database.
    """
    notes = client.query("notes:get") 
    return notes

async def get_all_blogs():
    """
    Fetches all notes from the database using the Convex client.
    
    Returns:
        notes (list): A list of all note records retrieved from the database.
    """
    notes = client.query("blogs:get") 
    return notes

async def create_notes(request, user_id):
    """
    Creates a new note document by taking user input, generating a document 
    using AI services, and saving it to the database.
    
    Args:
        request (dict): The request containing the "content_text" for the note.
        user_id (str): The ID of the user creating the note.
        
    Returns:
        document_id (str): The ID of the newly created note document.
    """
    content_text = request.get("content_text", "")

    if content_text != "":
        # Call AI service to update/generate the document
        res = await update_document(new_content=content_text)
        title, content, html_content = res
    else:
        title = ""
        content = ""
        html_content = ""

    # Save the generated document to the database
    document_id = client.mutation(
        "notes:create_notes",
        {"title": title, "content": content, "html_content": html_content, "user_id": user_id}
    )

    return document_id


async def update_notes(request, user_id):
    """
    Updates an existing note document by fetching it, updating its content 
    using AI services, and saving the changes.
    
    Args:
        request (dict): The request containing "content_text" and "document_id" to update the note.
        user_id (str): The ID of the user updating the note.
        
    Returns:
        update_doc (str): The ID of the updated note document.
        
    Raises:
        Exception: If no content_text is provided for updating the document.
    """
    content_text = request.get("content_text", "")
    document_id = request.get("document_id")

    # Fetch the existing document from the database
    document = client.query("notes:fetch_document", {"document_id": document_id})

    title = document["title"]
    content = document["content"]

    if content_text != "":
        # Update the document content using the AI service
        res = await update_document(title=title, content=content, new_content=content_text)
        title, content, html_content = res

        # Save the updated document to the database
        update_doc = client.mutation(
            "notes:update_notes",
            {
                "id": document_id,
                "fields": {
                    "title": title,
                    "content": content,
                    "html_content": html_content,
                    "user_id": user_id
                }
            }
        )

        return update_doc

    raise Exception("No content provided to update the document.")


### Blog-related Functions ###

async def create_blog(request, user_id):
    """
    Creates a new blog post by taking user input, generating a blog post 
    using AI services, and saving it to the database.
    
    Args:
        request (dict): The request containing the "content_text" for the blog.
        user_id (str): The ID of the user creating the blog.
        
    Returns:
        document_id (str): The ID of the newly created blog document.
    """
    content_text = request.get("content_text", "")

    if content_text != "":
        # Call AI service to update/generate the blog post
        res = await update_blog(user_thoughts=content_text)
        title, content, html_content = res
    else:
        title = ""
        content = ""
        html_content = ""

    # Save the generated blog post to the database
    document_id = client.mutation(
        "blogs:create_blogs",
        {"title": title, "content": content, "html_content": html_content, "user_id": user_id}
    )

    return document_id


async def update_blog_content(request, user_id):
    """
    Updates an existing blog post by fetching it, updating its content 
    using AI services, and saving the changes.
    
    Args:
        request (dict): The request containing "content_text" and "document_id" to update the blog.
        user_id (str): The ID of the user updating the blog.
        
    Returns:
        update_doc (str): The ID of the updated blog document.
        
    Raises:
        Exception: If no content_text is provided for updating the blog post.
    """
    content_text = request.get("content_text", "")
    document_id = request.get("document_id")

    # Fetch the existing blog post from the database
    document = client.query("blogs:fetch_document", {"document_id": document_id})

    title = document["title"]
    content = document["content"]

    if content_text != "":
        # Update the blog post content using the AI service
        res = await update_blog(blog_title=title, updated_blog_post=content, user_thoughts=content_text)
        title, content, html_content = res

        # Save the updated blog post to the database
        update_doc = client.mutation(
            "blogs:update_blogs",
            {
                "id": document_id,
                "fields": {
                    "title": title,
                    "content": content,
                    "html_content": html_content,
                    "user_id": user_id
                }
            }
        )

        return update_doc

    raise Exception("No content provided to update the blog post.")
