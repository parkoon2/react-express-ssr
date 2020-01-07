import Cookie from 'js-cookie'

export const authenticate = user => {
    Cookie.set('user', JSON.stringify(user))
}

export const isAuthenticated = () => {
    const user = Cookie.getJSON('user') || false
    return !!user
}

export const logout = () => {
    Cookie.remove('user')
}