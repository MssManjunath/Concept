import { TbBrandBlogger } from "react-icons/tb";
import { FaRegNoteSticky } from "react-icons/fa6";
import { GiPlainCircle } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import { LuLogOut } from "react-icons/lu";

export default function Nav() {
    const navigate = useNavigate();

    const handleNavigation = (path) => {
        navigate(path);
    };

    const handleLogout = () => {
        // Remove the JWT token from localStorage
        localStorage.removeItem('jwtToken');
    
        // Check if chrome.storage is available (only in Chrome extension context)
        if (chrome && chrome.storage && chrome.storage.sync) {
            // Remove the JWT token from chrome.storage
            chrome.storage.sync.remove('jwtToken', () => {
                console.log('JWT token removed from chrome storage');
            });
        } else {
            console.log('chrome.storage is not available');
        }
    
        // Redirect to the login page
        navigate('/login');
    };

    return (
        <div className="nav">
            <div>
                Concept
            </div>
            <div className="nav-list">
                <ul>
                    <li onClick={() => { handleNavigation("/notes") }}>
                        My Notes
                        <FaRegNoteSticky />
                    </li>
                    <li onClick={() => { handleNavigation("/blogs") }}>
                        My Blogs
                        <TbBrandBlogger />
                    </li>
                    <li onClick={handleLogout}>
                        Logout
                        <LuLogOut />
                    </li>
                </ul>
            </div>
        </div>
    );
}
