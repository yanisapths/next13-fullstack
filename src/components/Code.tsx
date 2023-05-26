'use client'
import React, { FC, useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { Highlight, themes } from "prism-react-renderer"

interface CodeProps {
    code: string
    show: boolean
    language: string
    animationDalay?: number
    animated?: boolean
}

const Code: FC<CodeProps> = ({ code, show, language, animationDalay, animated
}) => {
    const { theme: applicationTheme } = useTheme()
    const [text, setText] = useState(animated ? ' ' : code)

    useEffect(() => {
        // runs ONCE after initial rendering
        // and after every rendering ONLY IF whatever inside [] changes
        if (show && animated) {
            let i = 0
            setTimeout(() => {
                const intervalId = setInterval(() => {
                    setText(code.slice(0, i))
                    i++
                    if (i > code.length) {
                        clearInterval(intervalId)
                    }
                }, 15)
                return () => clearInterval(intervalId)
            }, animationDalay || 150)
        }
    }, [code, show, animated, animationDalay])
    // react-hook: useEffect(callback, [props])
    // We don't want the {show, animateDelay,code,animated} to render every time
    // the Code component renders. Instead, we want it to render only when the props change.   

    // number of lines
    // \r: begining of the the line
    // \n: new line
    // split at \r\n or \n or \r
    const lines = text.split(/\r\n|\r|\n/).length
    const theme = applicationTheme === 'light' ? themes.nightOwlLight : themes.nightOwl
    return (
        <Highlight
            code={text}
            language={language}
            theme={theme}
        >
            {({ className, tokens, getLineProps, getTokenProps }) => (
                <pre
                    className={className + 'transition-all w-fit bg-transparent duration-100 py-0 no-scrollbar'}
                    style={{
                        maxHeight: show ? lines * 24 : 0,
                        opacity: show ? 1 : 0
                    }}
                >
                    {tokens.map((line, i) => {
                        const { key, ...rest } = getLineProps({ line, key: i })
                        return (
                            <div key={`line-${i}`} style={{ position: 'relative' }}
                            {...rest}>
                                {line.map((token, index) => {
                                    const { key, ...props } = getTokenProps({ token, i })
                                    return <span key={index} {...props}></span>
                                })}
                            </div>
                        )}
                    )}
                </pre>
            )}
        </Highlight>
    )
}

export default Code;