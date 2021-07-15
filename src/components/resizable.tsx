import './resizable.css';
import { useEffect, useState } from 'react';
import { ResizableBox, ResizableBoxProps } from "react-resizable";

interface ResizableProps {
    direction: 'horizontal' | 'vertical'
}

const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {
    const [innerHeight, setInnerHeight] = useState(window.innerHeight)
    const [innerWidth, setInnerWidth] = useState(window.innerWidth)
    let resizeableProps: ResizableBoxProps

    useEffect(() => {
        let timer: any
        const listener = () => {
            if (timer) {
                clearTimeout(timer)
            }
            
            timer = setTimeout (() => {
                setInnerHeight(window.innerHeight)
                setInnerWidth(window.innerWidth)
            }, 100)
            
        }
        window.addEventListener('resize', listener)

        return () => {
            window.removeEventListener('resize', listener)
        }
    }, [])

    if (direction === 'horizontal') {
        resizeableProps = {
            className: 'resize-horizontal',
            minConstraints: [innerWidth * 0.2, Infinity],
            maxConstraints: [innerWidth * 0.75, Infinity],
            height: Infinity,
            width: window.innerWidth * 0.75,
            resizeHandles: ['e']
        }
    } else {
        resizeableProps = {
            minConstraints: [Infinity, 24],
            maxConstraints: [Infinity, innerHeight * 0.9],
            height: 300,
            width: Infinity,
            resizeHandles: ['s']
        }
    }
    
    return (
        <ResizableBox 
            {...resizeableProps}
        >
            {children}
        </ResizableBox>
    )
}

export default Resizable