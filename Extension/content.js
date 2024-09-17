function setHeaderTitle(headerLeft, headerRight) {
  // Retrieve the stored values from Chrome storage
  chrome.storage.sync.get(['selectedNoteId', 'selectedBlogId'], function (result) {
    const noteId = result.selectedNoteId;
    const blogId = result.selectedBlogId;

    // Set header text based on which ID is not null
    if (noteId) {
      headerRight.innerText = `Notes`;
    } else if (blogId) {
      headerRight.innerText = `Blog ID`;
    } else {
      headerRight.innerText = ''; // Empty if no ID is found
    }
  });
}

function createChatPopup(savedPosition) {
  if (!document.getElementById('chatPopup')) {
    const chatPopup = document.createElement('div');
    chatPopup.style.position = 'fixed';
    chatPopup.style.bottom = savedPosition?.bottom || '100px';
    chatPopup.style.right = savedPosition?.right || '100px';
    chatPopup.style.width = '300px';
    chatPopup.style.height = '200px';
    chatPopup.style.backgroundColor = '#f4f2f2';
    chatPopup.style.border = '0.5px solid #ccc';
    chatPopup.style.borderRadius = '5px';
    chatPopup.style.boxShadow = '0px 0px 10px rgba(0, 0, 0, 0.1)';
    chatPopup.style.zIndex = '1000';
    chatPopup.setAttribute('id', 'chatPopup');

    // Draggable header
    const header = document.createElement('div');
header.style.display = 'flex';
header.style.justifyContent = 'space-between';
header.style.alignItems = 'center';
header.style.backgroundColor = '#424242';
header.style.padding = '12px';
header.style.borderTopLeftRadius = '5px';
header.style.borderTopRightRadius = '5px';
header.style.color = '#D74846';
header.style.fontWeight = "500";

// Left side of the header
const headerLeft = document.createElement('div');
headerLeft.innerText = 'Concept';
header.appendChild(headerLeft);

// Right side of the header (for ID)
const headerRight = document.createElement('div');
header.appendChild(headerRight);

// Set header title based on stored ID
setHeaderTitle(headerLeft, headerRight);

// Append header to the chat popup
chatPopup.appendChild(header);


    // Draggable functionality on the header
    header.onmousedown = function (event) {
      let shiftX = event.clientX - chatPopup.getBoundingClientRect().left;
      let shiftY = event.clientY - chatPopup.getBoundingClientRect().top;

      function moveAt(pageX, pageY) {
        chatPopup.style.left = pageX - shiftX + 'px';
        chatPopup.style.top = pageY - shiftY + 'px';
      }

      function onMouseMove(event) {
        moveAt(event.pageX, event.pageY);
      }

      document.addEventListener('mousemove', onMouseMove);

      header.onmouseup = function () {
        document.removeEventListener('mousemove', onMouseMove);
        header.onmouseup = null;

        // Save the new position
        chrome.storage.sync.set({
          chatPopupPosition: {
            left: chatPopup.style.left,
            top: chatPopup.style.top
          }
        });
      };
    };

    header.ondragstart = function () {
      return false;
    };

    document.body.appendChild(chatPopup);

    // Textarea for input
    const chatInput = document.createElement('textarea');
    chatInput.style.width = '95%';
    chatInput.style.height = '100px';
    chatInput.style.padding = '6px';
    chatInput.setAttribute('id', 'chatInput');
    chatPopup.appendChild(chatInput);

    // Save button
    const saveButton = document.createElement('button');
    saveButton.innerText = 'Save';
    saveButton.style.width = '100%';
    saveButton.style.padding = '5px';
    saveButton.style.backgroundColor = "#EBF5FF";
    chatPopup.appendChild(saveButton);

    // Loading indicator
    const loadingIndicator = document.createElement('div');
    loadingIndicator.innerText = 'Saving...';
    loadingIndicator.style.display = 'none';
    loadingIndicator.style.textAlign = 'center';
    loadingIndicator.style.marginTop = '10px';
    chatPopup.appendChild(loadingIndicator);

    // Save button click event
    saveButton.addEventListener('click', function () {
      const message = chatInput.value;

      if (message) {
        // Show loading indicator
        chatInput.value = '';
        loadingIndicator.style.display = 'block';

        fetch('http://127.0.0.1:8000/update_blog', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ "new_content": message })
        })
        .then(response => response.json())
        .then(data => {
          loadingIndicator.style.display = 'none';
          if (data.blog) {
            
          } else {
            alert('Failed to save the message');
          }
        })
        .catch(error => {
          console.error('Error:', error);
          alert('Failed to save the message');

          // Hide loading indicator
          loadingIndicator.style.display = 'none';
        });
      } else {
        alert('Please enter a message before saving');
      }
    });
  }
}

function removeChatPopup() {
  const existingPopup = document.getElementById('chatPopup');
  if (existingPopup) {
    existingPopup.remove();
  }
}

chrome.storage.sync.get(['enabled', 'chatPopupPosition'], function (data) {
  if (data.enabled) {
    createChatPopup(data.chatPopupPosition);
  } else {
    removeChatPopup();
  }
});



chrome.storage.onChanged.addListener(function (changes, areaName) {
  if (areaName === 'sync' && changes.enabled) {
    if (changes.enabled.newValue) {
      chrome.storage.sync.get('chatPopupPosition', function (data) {
        createChatPopup(data.chatPopupPosition);
      });
    } else {
      removeChatPopup();
    }
  }
});
