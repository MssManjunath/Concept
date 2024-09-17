document.addEventListener('DOMContentLoaded', () => {
    const signInBtn = document.getElementById('sign-in-btn');
    console.log(localStorage)

    // Function to redirect to the sign-in page
    function redirectToSignIn() {
        const signInUrl = 'http://localhost:5173/'; // Replace with actual sign-in page URL
        chrome.tabs.create({ url: signInUrl }); // Open a new tab for sign-in
    }

    // Function to check for JWT in localStorage or chrome storage
    function checkForJWTInChromeStorage(callback) {
        chrome.storage.sync.get(['jwtToken'], function (result) {
            callback(result.jwtToken);
        });
    }
    
    // Function to check for JWT in localStorage or chrome storage
    function checkForJWT() {
        // First, check localStorage
        const jwt = localStorage.getItem('jwtToken');
        
        if (jwt) {
            window.location.href = 'popup.html'; // Redirect if JWT found in localStorage
        } else {
            // If no JWT in localStorage, check in Chrome storage
            checkForJWTInChromeStorage((chromeJWT) => {
                if (chromeJWT) {
                    window.location.href = 'popup.html'; // Redirect if JWT found in Chrome storage
                }
            });
        }
    }

    // Function to determine if JWT check is necessary
    function shouldCheckJWT() {
        // Example condition: only check JWT if the current page is not 'popup.html'
        const currentPage = window.location.pathname;
        return currentPage !== '/popup.html'; // Avoid JWT check on the popup page itself
    }

    // Event listener for the sign-in button click
    signInBtn?.addEventListener('click', () => {
        redirectToSignIn(); // Trigger the sign-in process
    });

    // Conditionally check for JWT based on context
    if (shouldCheckJWT()) {
        checkForJWT();
    }
});
