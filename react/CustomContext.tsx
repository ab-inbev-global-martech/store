import React, { FC, useReducer, useState } from 'react'

//create context and consumer
const CitySelectorContext = React.createContext<any>([])


export const types = {
    updateLocation: 'update location',
    showModal: 'Show city modal'
}

export const reducer = (state: any, { type, payload }: { type: string, payload: any }) => {
    // console.log('payload: ', payload)
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

const CitySelectorProvider: FC = ({ children }) => {
    const [ currentLocation ] = useState(() => {
        try {
            const currentLocation = window?.localStorage.getItem('currentLocation')
            return currentLocation ? JSON.parse(currentLocation) : initialCity
        } catch (error) {
            return initialCity
        }
    })

    const initialState = {
        currentLocation,
        showModalSelector: false
    }

    return (
        <CitySelectorContext.Provider value={useReducer(reducer, initialState)}>
            {children}
        </CitySelectorContext.Provider>
    )
}

export default CitySelectorProvider