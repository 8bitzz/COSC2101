import React from 'react'

export default React.createContext({
    token: null,
    _id: null,
    login: (token, _id, tokenExpiration) => { },
    logout: () => { }
})