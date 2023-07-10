import { useState, forwardRef, useImperativeHandle } from 'react'


const Toggleable = forwardRef((props, refs) => {
    const [visible, setVisible] = useState(false)

    const toggleVisibility = () => setVisible(!visible)

    useImperativeHandle(refs, () => {
        return {
            toggleVisibility
        }
    } 
    )

    if(visible) {
        return (
            <div>
                {props.children}
                <button onClick={toggleVisibility}>Cancel</button>
            </div>
        )
    } else {
        return (<div>
                    <button onClick={toggleVisibility}>{props.buttonLabel}</button>
                </div>)
    }
})

export default Toggleable