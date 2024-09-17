document.getElementById('signOutBtn').addEventListener('click', function () {
  chrome.storage.sync.remove('jwt', function () {
    console.log('JWT token removed');
    window.location.href = 'sign-in.html';
  });
});

document.getElementById('enablePopup').addEventListener('click', () => {
  chrome.storage.sync.set({ enabled: true });
  alert('Chat Popup Enabled!');
});

document.getElementById('disablePopup').addEventListener('click', () => {
  chrome.storage.sync.set({ enabled: false });
  alert('Chat Popup Disabled!');
});

function storeSelectedNoteId(id) {
  chrome.storage.sync.set({ selectedNoteId: id });
  chrome.storage.sync.set({selectedBlogId : null})
}

// Store selected blog ID in chrome.storage
function storeSelectedBlogId(id) {
  chrome.storage.sync.set({ selectedBlogId: id });
  chrome.storage.sync.set({selectedNoteId : null})

}


document.addEventListener('DOMContentLoaded', function () {
  const notesTab = document.getElementById('notesTab');
  const blogsTab = document.getElementById('blogsTab');
  const notesContent = document.getElementById('notesContent');
  const blogsContent = document.getElementById('blogsContent');
  let selectedNoteId = null;

  // Call both functions initially when the page loads
  fetchNotesData();
  fetchBlogsData();

  // Tab switching logic
  notesTab.addEventListener('click', function () {
    notesContent.classList.add('active');
    blogsContent.classList.remove('active');
    notesTab.classList.add('active');
    blogsTab.classList.remove('active');

    // Fetch notes data via API
    fetchNotesData();
  });

  blogsTab.addEventListener('click', function () {
    blogsContent.classList.add('active');
    notesContent.classList.remove('active');
    blogsTab.classList.add('active');
    notesTab.classList.remove('active');

    // Fetch blogs data via API
    fetchBlogsData();
  });

  // Fetch Notes Data
  async function fetchNotesData() {
    try {
      const response = await fetch('http://localhost:8000/all_documents');

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response?.json();
      const notes = data?.notes;


      const notesList = document.getElementById('notesList');
      notesList.innerHTML = ''; // Clear existing list

      notes.forEach(note => {
        const listItem = document.createElement('li');
        listItem.textContent = note.title; // Display the title of the note
        listItem.dataset.id = note.id; // Set the note ID as a data attribute

        // Add click event to select the note
        listItem.addEventListener('click', function () {
          // Remove highlight from all list items
          document.querySelectorAll('#notesList li').forEach(li => {
            li.classList.remove('selected');
          });

          // Highlight the clicked note
          listItem.classList.add('selected');

          // Set the selected note's ID
          selectedNoteId = note["_id"];
          storeSelectedNoteId(selectedNoteId)
          console.log('Selected Note ID:', selectedNoteId);
        });

        notesList.appendChild(listItem);
      });
    } catch (error) {
      console.error('Fetch error:', error);
      alert('Failed to load notes. Please try again later.');
    }
  }

  // Fetch Blogs Data (similar to notes)
  async function fetchBlogsData() {
    try {
      const response = await fetch('http://localhost:8000/all_blogs');

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response?.json();
      const blogs = data?.notes; // Adjust this key based on your API response

      const blogList = document.getElementById('blogList');
      blogList.innerHTML = ''; // Clear existing list

      blogs.forEach(blog => {
        const listItem = document.createElement('li');
        listItem.textContent = blog.title; // Display the title of the blog
        listItem.dataset.id = blog.id; // Set the blog ID as a data attribute

        // Add click event to select the blog
        listItem.addEventListener('click', function () {
          // Remove highlight from all list items
          document.querySelectorAll('#blogList li').forEach(li => {
            li.classList.remove('selected');
          });

          // Highlight the clicked blog
          listItem.classList.add('selected');

          // Set the selected blog's ID
          selectedBlogId = blog["_id"];
          storeSelectedBlogId(selectedBlogId);
          console.log('Selected Blog ID:', selectedBlogId); 
        });

        blogList.appendChild(listItem);
      });
    } catch (error) {
      console.error('Fetch error:', error);
      alert('Failed to load blogs. Please try again later.');
    }
  }
});
