import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Retrieve the Anthropic API key
ANTHROPIC_API_KEY = os.environ.get("ANTHROPIC_API_KEY")
