import { useState } from 'react'


const Toggleable = (props) => {
    const [visible, setVisible] = useState(false)

    const toggleVisbility = () => setVisible(!visible)

    if(visible) {
        return (
            <div>
                {props.children}
                <button onClick={toggleVisbility}>Cancel</button>
            </div>
        )
    } else {
        return (<div>
                    <button onClick={toggleVisbility}>Show</button>
                </div>)
    }
}

export default Toggleable