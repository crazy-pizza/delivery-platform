import { useState, useEffect } from 'react'

const useKeyPress = (targetKeyCode) => {
    const [keyPressed, setKeyPressed] = useState(false)
    const [target, setTarget] = useState(null)
    const keyDownHandler = (e) => {
        const keyCode = e.keyCode
        if (keyCode === targetKeyCode) {
            setKeyPressed(true)
            setTarget(e.target)
        }
    }

    const keyUpHandler = (e) => {
        const keyCode = e.keyCode
        if (keyCode === targetKeyCode) {
            setKeyPressed(false)
            setTarget(null)
        }
    }

    useEffect(() => {
        document.addEventListener('keydown', keyDownHandler)
        document.addEventListener('keyup', keyUpHandler)
        return () => {
            document.removeEventListener('keydown', keyDownHandler)
            document.removeEventListener('keyup', keyUpHandler)
        }
    }, [])
    return [keyPressed, target]
}

export default useKeyPress