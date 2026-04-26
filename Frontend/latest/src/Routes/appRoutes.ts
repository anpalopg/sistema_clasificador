import { Fragment, createElement } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import MainArea from '../../Home/layout/mainArea'
import ChatFloatButton from '../../chat/components/buttons/ChatFloatButton.tsx'

export const appRouter = createBrowserRouter([
        {
                path: '/',
                element: createElement(
                        Fragment,
                        null,
                        createElement(MainArea),
                        createElement(ChatFloatButton),
                ),
        },
        {
                path: '/files',
                element: createElement(
                        Fragment,
                        null,
                        createElement(MainArea),
                        createElement(ChatFloatButton),
                ),
        },
])


