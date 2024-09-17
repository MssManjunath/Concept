from pydantic import BaseModel

class ContentUpdateRequest(BaseModel):
    new_content: str

class User_Sign_Up(BaseModel):
    username : str
    email : str
    password : str
