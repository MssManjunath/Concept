import os
from dotenv import load_dotenv
from jose import JWTError, jwt
from fastapi import APIRouter, HTTPException
from passlib.context import CryptContext
from convex import ConvexClient

# Initialize password hashing context
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Initialize Convex client
client = ConvexClient(os.getenv("CONVEX_URL"))

# JWT settings
SECRET_KEY = "your-secret-key"
ALGORITHM = "HS256"

### Utility Functions ###

def hash_password(password: str) -> str:
    """
    Hashes the plain password using bcrypt.

    Args:
        password (str): The plain password to be hashed.

    Returns:
        str: The hashed password.
    """
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """
    Verifies if the plain password matches the hashed password.

    Args:
        plain_password (str): The user's plain password.
        hashed_password (str): The hashed password stored in the database.

    Returns:
        bool: True if the password is valid, False otherwise.
    """
    return pwd_context.verify(plain_password, hashed_password)

def create_jwt_token(data: dict) -> str:
    """
    Creates a JWT token using the provided user data.

    Args:
        data (dict): A dictionary containing user-specific information 
                     (e.g., email, user_id) to be encoded in the token.

    Returns:
        str: The encoded JWT token.
    """
    return jwt.encode(data, SECRET_KEY, algorithm=ALGORITHM)

### User Management Functions ###

async def user_sign_up(request: dict):
    """
    Registers a new user by hashing the password and saving the user details in the database.
    
    Args:
        request (dict): The request body containing "username", "email", and "password".

    Raises:
        HTTPException: If a user with the given email already exists.

    Returns:
        dict: The response from the database containing the created user's details.
    """
    username = request["username"]
    email = request["email"]
    password = request["password"]
    
    # Hash the password
    hashed_password = hash_password(password)

    # Check if the user already exists
    user = client.query("user:user_fetch_by_email", {"email": email})
    if user:
        raise HTTPException(status_code=404, detail="User already present")

    # Create the new user in the database
    res = await client.mutation("user:sign_up", {"username": username, "email": email, "hashed_password": hashed_password})
    
    return res


async def user_login(request: dict):
    """
    Authenticates a user by verifying the provided password and generating a JWT token upon successful login.
    
    Args:
        request (dict): The request body containing "email" and "password".

    Raises:
        HTTPException: 
            - If the user with the given email does not exist.
            - If the provided password does not match the stored hashed password.

    Returns:
        dict: A dictionary containing the access token and its type.
    """
    email = request["email"]
    password = request["password"]
    
    # Fetch user by email
    user = client.query("user:user_fetch_by_email", {"email": email})
    
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    # Verify the password
    if not verify_password(password, user["hashed_password"]):
        raise HTTPException(status_code=400, detail="Invalid password")
    
    # Create JWT token upon successful authentication
    token = create_jwt_token({"sub": email, "user_id": user["_id"]})
    
    return {"access_token": token, "token_type": "bearer"}
