import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { ChakraProvider } from '@chakra-ui/react'
import { extendTheme } from '@chakra-ui/react'

export const darkTheme = ReactDOM.render(
    <React.StrictMode>
        <ChakraProvider
            theme={extendTheme({
                components: { Button: { baseStyle: { _focus: { boxShadow: 'none' } } } },
                shadows: { outline: '0 !important' },
                config: {
                    useSystemColorMode: false,
                    initialColorMode: 'dark',
                },
            })}
        >
            <App />
        </ChakraProvider>
    </React.StrictMode>,
    document.getElementById('root'),
)
