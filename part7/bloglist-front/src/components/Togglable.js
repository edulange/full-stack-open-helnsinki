/* eslint-disable */
import { useState, forwardRef, useImperativeHandle } from 'react'

const Togglable = forwardRef((props, ref) => {
	const [visible, setVisible] = useState(false)

	const toggleVisibility = () => {
		setVisible(!visible)
	}

	useImperativeHandle(ref, () => ({
		toggleVisibility,
	}))

	return (
		<div>
			{visible && <div>{props.children}</div>}
			{!visible && <button onClick={toggleVisibility} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">{props.buttonLabel}</button>}
		</div>
	)
})

Togglable.displayName = 'Togglable'

export default Togglable
