import React from 'react'

export default React.createContext({
    accessToken: null,
    _id: null,
    login: (accessToken, _id, tokenExpiration) => {
        
    },
    logout: () => {
        
    }
})