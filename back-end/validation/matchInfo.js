import Error from "../helper/error.js"

export const sharingMatchCheckEditValidate = data => {
    const error = new Error()
    error.isRequired(data.code, "code")
    .isRequired(data.matchId, 'matchId')

    return error.get()
}

export const matchEditValidate = data => {
    const error = new Error()
    error.isRequired(data.teamA, "teamA")
    .isRequired(data.scoreA, 'scoreA')
    .isRequired(data.teamB, "teamB")
    .isRequired(data.scoreB, 'scoreB')

    return error.get()
}