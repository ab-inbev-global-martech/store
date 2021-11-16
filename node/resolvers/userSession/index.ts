export const userSession = async (
    _: any,
    __: any,
{ clients: { userSession } }: Context
) => {
    return await userSession.getUserData()
}