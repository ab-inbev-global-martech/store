import React, { FC, useReducer, useState } from 'react'
import { useQuery } from 'react-apollo'
import userSessionGQL from './graphql/userSession.graphql'

//create context and consumer
const GlobalContext = React.createContext<any>([])


export const types = {
    updateLocation: 'update location',
    showModal: 'Show city modal'
}

export const reducer = (state: any, { type, payload }: { type: string, payload: any }) => {
    switch(type) {
        case types.updateLocation: {
            const { city, postalCode, state } = payload

            window.localStorage.setItem('currentLocation', JSON.stringify({
                city,
                postalCode,
                state
            }))

            return {
                ...state,
                currentLocation: { city, postalCode, state }
            }
        }
        case types.showModal: {
            const { showModalSelector } = payload

            return {
                ...state,
                showModalSelector
            }
        }
        default: {
            return state
        }
    }
}

const initialCity = {
    city: 'Bogotá, D.c.',
    postalCode: '11001',
    state: 'Bogotá, D.C.'
}

const GlobalProvider: FC = ({ children }) => {
    const { data } = useQuery(userSessionGQL)

    const [ currentLocation ] = useState(() => {
        try {
            const currentLocation = window?.localStorage.getItem('currentLocation')
            return currentLocation ? JSON.parse(currentLocation) : initialCity
        } catch (error) {
            return initialCity
        }
    })

    const initialState = {
        userSession: data?.userSession || null,
        currentLocation,
        showModalSelector: false
    }

    const [store, dispatch] = useReducer(reducer, initialState)

    return (
        <GlobalContext.Provider value={{store, dispatch}}>
            {children}
        </GlobalContext.Provider>
    )
}



// custom hook
function useGlobalContext(): any {
    return React.useContext(GlobalContext)
}

export {
  GlobalProvider,
  useGlobalContext
}

export default {
  GlobalProvider,
  useGlobalContext
}
