export const generateRandomString = () => {
    return (new Date%8e6).toString(36).toUpperCase()
}