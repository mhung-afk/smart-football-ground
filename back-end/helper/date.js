export const convertToCronExpression = (time, date) => {
    try {
        time = time.split(":")
        date = new Date(date)
        const seconds = time[2] ?? 0
        const minutes = time[1], hours = time[0]
        const dayOfMonth = date.getDate()
        const month = date.getMonth() + 1
        const dayOfWeek = date.getDay()
        return `${seconds} ${minutes} ${hours} ${dayOfMonth} ${month} ${dayOfWeek}`
    } catch (error) {
        console.log(error)
    }
}