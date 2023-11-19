import "assets/css/inputField.css"

const InputField = ({ value, className, classNameInput, nameKey, type, placeholder,
    invalidFields, setInvalidFields, onChange }) => {
    return (
        <div className='inputFieldDiv'>
            <div className={className}>
                <input
                    type={type || 'text'}
                    className={classNameInput}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder} 
                    onFocus={() => setInvalidFields([])}
                    />
            </div>
            {invalidFields?.some(el => el.name === nameKey)
                && <span className='errMessage'>{invalidFields.find(el => el.name === nameKey)?.mes}</span>
            }          
        </div>
    )
}

export default InputField
