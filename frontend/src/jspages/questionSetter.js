import { useState } from "react";
import "../jsstyles/questionSetter.css";

function Questionsetter() {

    const [questionDetails, setQuestionDetails] = useState([]);
    const questionTypeOptions = [
        "ShortAnswer",
        "LongAnswer",
        "CheckBox",
        "MultiChoice",
        "DateSelect",
        "RatingSelect",
        "FileUpload",
        "LinearScale",
        "DropDown"
    ];

    const handleAddQuestion = () => {
        const newQuestion = {
            questionText: "Type your Question",
            questionType: "shortAnswer",
            questionOptions: null,
            questionSection: 1,
            questionInfo: [
                {
                    infoType: null,
                    infoData: null
                }
            ]
        };

        setQuestionDetails(prevDetails => [...prevDetails, newQuestion]);
    };

    const handleQuestionTextChange = (index, value) => {
        setQuestionDetails(prevDetails => {
            const updatedDetails = [...prevDetails];
            updatedDetails[index] = { ...updatedDetails[index], questionText: value };
            return updatedDetails;
        });
    };

    const handleKeyDown = (index, event) => {
        if (event.key === 'Backspace' && questionDetails[index].questionText === '') {
            setQuestionDetails(prevDetails => prevDetails.filter((_, i) => i !== index));
        } else if (event.key === 'Enter') {
            event.preventDefault();
        }
    };

    const handleQuestionTypeChange = (index, value) => {
        setQuestionDetails(prevDetails => {
            const updatedDetails = [...prevDetails];
            updatedDetails[index] = { ...updatedDetails[index], questionType: value };
            return updatedDetails;
        });
    };

    const handleOptionTextChange = (questionIndex, optionIndex, value) => {
        setQuestionDetails(prevDetails => {
            const updatedDetails = [...prevDetails];
            const updatedOptions = [...(updatedDetails[questionIndex].questionOptions || [])];
            updatedOptions[optionIndex] = value;
            updatedDetails[questionIndex] = { ...updatedDetails[questionIndex], questionOptions: updatedOptions };
            return updatedDetails;
        });
    };

    const handleOptionKeyDown = (questionIndex, optionIndex, event) => {
        const currentOptions = questionDetails[questionIndex].questionOptions || [];
        if (event.key === 'Enter' && currentOptions[optionIndex] !== '') {
            event.preventDefault();
            setQuestionDetails(prevDetails => {
                const updatedDetails = [...prevDetails];
                const updatedOptions = [...currentOptions, "Type your option here"];
                updatedDetails[questionIndex] = { ...updatedDetails[questionIndex], questionOptions: updatedOptions };
                return updatedDetails;
            });
        } else if (event.key === 'Backspace' && currentOptions[optionIndex] === '' && currentOptions.length > 1) {
            event.preventDefault();
            setQuestionDetails(prevDetails => {
                const updatedDetails = [...prevDetails];
                const updatedOptions = currentOptions.filter((_, i) => i !== optionIndex);
                updatedDetails[questionIndex] = { ...updatedDetails[questionIndex], questionOptions: updatedOptions };
                return updatedDetails;
            });
        }
    };

    const renderAnswerComponent = (questionType, index) => {
        switch (questionType) {
            case 'ShortAnswer':
                return (
                    <input
                        type="text"
                        placeholder="Short answer text"
                        disabled
                        style={{ width: '300px', marginLeft: '30px', marginTop: '5px' }}
                    />
                );
            case 'LongAnswer':
                return (
                    <textarea
                        placeholder="Long answer text"
                        disabled
                        style={{ width: '300px', height: '100px', marginLeft: '30px', marginTop: '5px', resize: 'vertical' }}
                    />
                );
            case 'CheckBox': return (
                <div style={{ marginLeft: '30px', marginTop: '5px' }}>
                    {(questionDetails[index].questionOptions || []).map((option, optionIndex) => (
                        <div key={optionIndex} style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                            <input
                                type="checkbox"
                                disabled
                                style={{ marginRight: '5px' }}
                            />
                            <input
                                type="text"
                                value={option}
                                onChange={(e) => handleOptionTextChange(index, optionIndex, e.target.value)}
                                onKeyDown={(e) => handleOptionKeyDown(index, optionIndex, e)}
                                style={{ width: '250px' }}
                                placeholder="Type your option here"
                            />
                        </div>
                    ))}
                </div>
            );
            case 'MultiChoice': return (
                <div style={{ marginLeft: '30px', marginTop: '5px' }}>
                    {(questionDetails[index].questionOptions || []).map((option, optionIndex) => (
                        <div key={optionIndex} style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                            <input
                                type="radio"
                                disabled
                                style={{ marginRight: '5px' }}
                            />
                            <input
                                type="text"
                                value={option}
                                onChange={(e) => handleOptionTextChange(index, optionIndex, e.target.value)}
                                onKeyDown={(e) => handleOptionKeyDown(index, optionIndex, e)}
                                style={{ width: '250px' }}
                                placeholder="Type your option here"
                            />
                        </div>
                    ))}
                </div>
            );
            case 'DateSelect': return (<p>lol</p>)
            case 'RatingSelect': return (<p>lol</p>)
            case 'FileUpload': return (<p>lol</p>)
            case 'LinearScale': return (<p>lol</p>)
            case 'DropDown': return (<p>lol</p>)
            default:
                return null;
        }
    };

    return (
        <div className="qs-container">
            <div className="leftwork-container">
                {questionDetails.map((question, index) => (
                    <div key={index} style={{ marginBottom: '10px' }}>
                        <span style={{ marginRight: '10px' }}>Q{index + 1}</span>
                        <input
                            type="text"
                            value={question.questionText}
                            onChange={(e) => handleQuestionTextChange(index, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(index, e)}
                            style={{ width: '300px' }}
                        />
                        <select
                            value={question.questionType}
                            onChange={(e) => handleQuestionTypeChange(index, e.target.value)}
                            style={{ width: '150px' }}
                        >
                            {questionTypeOptions.map((type) => (
                                <option key={type} value={type}>{type}</option>
                            ))}
                        </select>
                        <div>
                            {renderAnswerComponent(question.questionType, index)}
                        </div>
                    </div>
                ))}
            </div>
            <div className="rightwork-container">
                <div className="pebuttons">
                    <button onClick={handleAddQuestion}>
                        <img src="/icons/pebuttonAddQuestion.png" className="peb-icon" />
                        Add Question</button>
                    <button>
                        <img src="/icons/pebuttonAddText.png" className="peb-icon" />
                        Add Text</button>
                    <button>
                        <img src="/icons/pebuttonAddCondition.png" className="peb-icon" />
                        Add Condition</button>
                    <button>
                        <img src="/icons/pebuttonAddImage.png" className="peb-icon" />
                        Add Image</button>
                    <button>
                        <img src="/icons/pebuttonAddVideo.png" className="peb-icon" />
                        Add Video</button>
                    <button>
                        <img src="/icons/pebuttonAddSection.png" className="peb-icon" />
                        Add Section</button>
                </div>
                <div className="bgColourEditors">
                    <p>COlour Pickers HERE</p>
                </div>
                <button>
                    NEXT
                </button>
            </div>
        </div>
    );
}

export default Questionsetter;