import React, { FC, useState, useEffect, useReducer } from 'react'
import { useLazyQuery } from 'react-apollo'
import userSessionGQL from './graphql/userSession.graphql'

//create context and consumer
const GlobalContext = React.createContext<any>([])


const types = {
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
    const [ userSession, setUserSession ] = useState(null)
    const [ currentLocation ] = useState(() => {
        try {
            const currentLocation = window?.localStorage.getItem('currentLocation')
            return currentLocation ? JSON.parse(currentLocation) : initialCity
        } catch (error) {
            return initialCity
        }
    })
    const [getUserData, { data, loading }] = useLazyQuery(userSessionGQL)

    useEffect(()=>{
        // check for user auth with custom token
        const customToken = getUrlParam('customToken') || window?.localStorage.getItem('customToken')
        if(customToken){
            window.localStorage.setItem('customToken', customToken)
            getUserData({
                variables: { token: window?.localStorage.getItem('customToken') }
            })
        }else{
            // window.location.href = 'https://tapit.com.co'
        }
    }, [])

    useEffect(() => {
        if (!loading && data) {
            setUserSession(data?.userSession)
        }
    }, [data])

    const getUrlParam = (paramName: string): string => {
        const url = new URL(window.location.href)
        const urlParam = url.searchParams.get(paramName)
        return urlParam || ''
    }

    const initialState = {
        userSession,
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
  useGlobalContext,
  types
}

export default {
  GlobalProvider,
  useGlobalContext,
  types
}
