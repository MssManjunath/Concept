from fastapi import APIRouter, HTTPException, Depends
from models import ContentUpdateRequest
from fastapi import Request
from models import User_Sign_Up
import traceback
from services.ai_services import update_document,update_blog
from services.login_service import user_sign_up,user_login
from services.verify_jwt import verify_jwt_token
from services.notes_service import get_all_notes, create_notes, update_notes , create_blog , update_blog_content,get_all_blogs


router = APIRouter()

@router.get("/all_documents")
async def fetch_all_documents():
    try:
        notes = await get_all_notes()
        return{
            "message" : "Fetched Notes Successfully",
            "notes" : notes
        }
    except Exception as e:
        raise HTTPException(status_code=500,detail=str(e))

@router.get("/all_blogs")
async def fetch_all_documents():
    try:
        blogs = await get_all_blogs()
        return{
            "message" : "Fetched Blogs Successfully",
            "notes" : blogs
        }
    except Exception as e:
        raise HTTPException(status_code=500,detail=str(e))




@router.post("/create_document")
async def create_new_document(request : Request,user_id : str = Depends(verify_jwt_token)):
    try:
        body = await request.json()

        document_id = await create_notes(request=body,user_id=user_id)

        return {
            "message" : "Document Created Successfully",
            "data" : document_id
        }

    except Exception as e:
        tb_str = ''.join(traceback.format_exception(type(e), e, e.__traceback__))
        print(tb_str)
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/update_document")
async def update_document_endpoint(request: Request,user_id: str = Depends(verify_jwt_token)):
    try:
        body = await request.json()

        res = await update_notes(request=body,user_id=user_id)

        return {
            "message" : "Document Created Successfully",
            "data" : res
        }
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@router.post("/create_blog")
async def create_new_document(request : Request,user_id : str = Depends(verify_jwt_token)):
    try:
        body = await request.json()

        document_id = await create_blog(request=body,user_id=user_id)

        return {
            "message" : "Document Created Successfully",
            "data" : document_id
        }

    except Exception as e:
        tb_str = ''.join(traceback.format_exception(type(e), e, e.__traceback__))
        print(tb_str)
        raise HTTPException(status_code=500, detail=str(e))
    

@router.post("/update_blog")
async def update_blog_endpoint(request: Request,user_id: str = Depends(verify_jwt_token)):
    try:
        body = await request.json()

        updated_blog_post = await update_blog_content(request=body,user_id=user_id)

        return {
            "message" : "Blog updated Successfully",
            "data" : updated_blog_post
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/protected-endpoint")
async def protected_route(user_id: str = Depends(verify_jwt_token)):
    return {"message": f"Hello User {user_id}, you are authenticated!"}


@router.post("/signup")
async def user_sign_up_function(request: Request):
    try:
        body = await request.json()
        res = await user_sign_up(request=body) 
        return {
            "message": "Signup successful",
            "data": res  
        }
    except Exception as e:
        tb_str = ''.join(traceback.format_exception(type(e), e, e.__traceback__))
        print(tb_str)
        raise HTTPException(status_code=500, detail=str(e))
    

@router.post("/login")
async def user_login_function(request : Request):
    try:
        body = await request.json()
        res = await user_login(request=body)
        return res
    except Exception as e:  
        raise HTTPException(status_code=500,detail=str(e))


