import { use, useState } from "react";
import "../jsstyles/formdesign.css";
import Questionsetter from "./questionSetter";
import { useParams } from 'react-router-dom';
import FormSidebar from "../components/formSidebar.js";

function Formdesign() {

    const [pages, setPages] = useState([{ id: 1, title: "Page 1" }]);
    const [selectedPageId, setSelectedPageId] = useState(1);
    const [isEditingTitle, setIsEditingTitle] = useState(false);
    const [tempTitle, setTempTitle] = useState("");
    const { formId } = useParams();

    const handleAddPage = () => {
        const newPage = {
            id: pages.length + 1,
            title: `Page ${pages.length + 1}`
        };
        setPages([...pages, newPage]);
    };

    const handleSelectPage = (pageId) => {
        setSelectedPageId(pageId);
    };

    const handleTitleClick = () => {
        setIsEditingTitle(true);
        setTempTitle(pages.find(page => page.id === selectedPageId).title);
    };

    const handleTitleChange = (e) => {
        setTempTitle(e.target.value);
    };

    const handleTitleSubmit = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (tempTitle.trim()) {
                setPages(pages.map(page =>
                    page.id === selectedPageId ? { ...page, title: tempTitle.trim() } : page
                ));
            }
            setIsEditingTitle(false);
        }
    };

    const currentPage = pages.find(page => page.id === selectedPageId);

    return (
        <div className="page-container">
            <FormSidebar
                pages={pages}
                onAddPage={handleAddPage}
                onSelectPage={handleSelectPage}
                selectedPageId={selectedPageId}
            />
            <div className="right-container">
                <div className="title-container">
                    {isEditingTitle ? (
                        <input
                            type="text"
                            value={tempTitle}
                            onChange={handleTitleChange}
                            onKeyDown={handleTitleSubmit}
                            onBlur={() => setIsEditingTitle(false)}
                            className="title-input"
                            autoFocus
                        />
                    ) : (
                        <h2 className="title-text" onClick={handleTitleClick}>
                            {currentPage?.title || "Untitled"}
                        </h2>
                    )}
                    <div className="top-buttons">
                        <button className="preview-button">PREVIEW</button>
                        <button className="save-button">SAVE</button>
                    </div>
                </div>
                <div className="body-container">
                    <Questionsetter />
                </div>
            </div>
        </div>
    );
}

export default Formdesign;
