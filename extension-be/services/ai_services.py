import anthropic
import os
from dotenv import load_dotenv


# Load environment variables from .env file
load_dotenv()

# Initialize the Anthropic client
client = anthropic.Anthropic(api_key=os.environ.get("ANTHROPIC_API_KEY"))



async def update_document(title: str = "", content: str = "", new_content: str = ""):

    # Updated prompt to handle multiple paragraphs and ensure content integration
    prompt = f"""
    \n\nHuman: Here is the current document content:

    Title: {title}
    Content: {content}

    New content to integrate: "{new_content}"

    Please perform the following tasks:
    1. Rephrase and seamlessly integrate the new content into the existing content, preserving the original structure (e.g., paragraphs, lists, etc.).
    2. Add new content as separate paragraphs if necessary, ensuring it flows naturally with the original content.
    3. Adjust the title if necessary to better reflect the updated content.
    4. Maintain a consistent tone, style, and structure throughout.
    5. Ensure the content is concise, clear, and coherent.
    6. Avoid duplication or redundancy.
    7. Keep in mind we are creating notes for future reference.
    8. Return the updated content with proper paragraph breaks (HTML format).
    9. Do not include any introductory or explanatory phrases such as "Here is the updated content."

    Return the updated document in this format:
    <h1>[Updated Title]</h1>
    <p>[Paragraph 1]</p>
    <p>[Paragraph 2]</p>
    ...
    <p>[Final Paragraph]</p>

    \n\nAssistant:
    """

    # Call the Claude API (or another LLM API)
    response = client.completions.create(
        model="claude-2.0",
        prompt=prompt,
        max_tokens_to_sample=1000,
    )

    # Extract the HTML content directly from the response
    html_content = response.completion.strip()

    # Optionally split the content into the title and paragraphs if needed
    # For instance, splitting the content by <h1> and <p> tags
    # Assuming response follows the structure:
    # <h1>Updated Title</h1>
    # <p>Paragraph 1</p>
    # <p>Paragraph 2</p>
    lines = html_content.split("\n")

    # Extract the updated title from the <h1> tag
    updated_title = next(line.replace("<h1>", "").replace("</h1>", "") for line in lines if line.startswith("<h1>"))

    # Extract the content paragraphs from the <p> tags
    updated_content = "\n\n".join(line.replace("<p>", "").replace("</p>", "") for line in lines if line.startswith("<p>"))

    # The HTML content is already generated and can be returned directly
    return updated_title, updated_content, html_content



async def update_blog(updated_blog_post: str = "", blog_title: str = "", user_thoughts: str = ""):

    # Updated prompt to ensure no introductory text and just the blog content
    prompt = f"""
    \n\nHuman: I'm starting my day with the following thoughts: "{user_thoughts}"
    
    Title: {blog_title}
    Blog_Post: {updated_blog_post}

    Please perform the following tasks:
    1. Rephrase and expand on these thoughts to create a beautiful and engaging blog post and integrate them into the existing blog.
    2. Suggest an appropriate title that fits the updated content.
    3. Ensure the tone is positive, reflective, and inspiring, suitable for a morning read.
    4. Maintain a coherent and smooth flow throughout the blog post.
    5. Avoid repetition and ensure clarity and conciseness.
    6. Stick to the content without making stuff up but make it engaging.
    7. Ensure the updated blog is returned with proper paragraph structure (HTML format).
    8. Do not include any introductory or explanatory phrases such as "Here is the updated content."

    Return the blog post in the following format:
    <h1>[Suggested Title]</h1>
    <p>[First paragraph]</p>
    <p>[Second paragraph]</p>
    ...
    <p>[Final paragraph]</p>

    \n\nAssistant:
    """

    # Call the Claude API (or another LLM API)
    response = client.completions.create(
        model="claude-2.0",
        prompt=prompt,
        max_tokens_to_sample=1000,
    )

    # Extract the HTML content directly from the response
    html_content = response.completion.strip()

    # Assuming response contains <h1> for the title and <p> for paragraphs
    lines = html_content.split("\n")

    # Extract the updated title from the <h1> tag
    title = next(line.replace("<h1>", "").replace("</h1>", "") for line in lines if line.startswith("<h1>"))

    # Extract the blog post content from the <p> tags
    content = "\n\n".join(line.replace("<p>", "").replace("</p>", "") for line in lines if line.startswith("<p>"))

    # The HTML content is already generated and can be returned directly
    return title, content, html_content




