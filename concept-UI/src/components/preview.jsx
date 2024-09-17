import moment from "moment";

export default function Preview({ title, content, created_at }) {
    const truncateContent = (text, length) => {
        if (text.length > length) {
            return text.substring(0, length) + '...';
        }
        return text;
    };

    const date = moment(Math.floor(created_at)).format('MMMM Do');

    return (
        <div className="preview-container">
            <div className="preview-background">
            <div className="preview-inside-title">{title}</div>
            <p className="preview-inside-content">{truncateContent(content, 300)}</p>
            </div>
            <small>{date}</small>
        </div>
    );
}
