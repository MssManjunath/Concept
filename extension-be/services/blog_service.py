import os
from dotenv import load_dotenv
from convex import ConvexClient
from .ai_services import update_blog

client = ConvexClient(os.getenv("CONVEX_URL"))

async def get_all_blogs():
    blogs = client.query("blogs:get") 
    return blogs


async def create_blog(request,user_id):
    content_text = request["content_text"]

    if(content_text != ""):
        res = await update_blog(user_thoughts = content_text)
        title, content, html_content = res
    else:
        title = ""
        content  = ""
        html_content = ""

    document_id = client.mutation("blogs:create_blogs",{"title" : title,"content":content,"html_content":html_content,"user_id":user_id})

    return document_id


async def update_blogs(request,user_id):
    content_text = request["content_text"]
    document_id = request["document_id"]

    document = client.query("blogs:fetch_document",{"document_id":document_id})

    title = document["title"]
    content = document["content"]
    if(content_text != ""):

        res = await update_blog(blog_title=title,updated_blog_post=content,user_thoughts = content_text)
        title, content, html_content = res

        update_doc = client.mutation("blogs:update_blogs",{"id": document_id,"fields" : {
            "title" : title,
            "content" : content,
            "html_content":html_content,
            "user_id" : user_id
        }})

        return update_doc

    raise Exception 




