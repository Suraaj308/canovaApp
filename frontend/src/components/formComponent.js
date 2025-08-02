import './formComponent.css';

function FormComponent({ formName }) {

    return (
        <div className="formcomponent-card">
            <div className="fctop-part">
                <span className='fcform-name'>{formName}</span>
            </div>
            <div className="fcmiddle-part-bg">
                <div className='fcmiddle-part'>
                    <img src="/icons/formComponentLogo.png" className="fclogo" />
                </div>
            </div>
            <div className="fcbottom-part">
                <span className='fcanalysis-text'>view analysis</span>
            </div>
        </div>
    )
}

export default FormComponent;