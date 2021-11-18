interface Args {
    token: string
}

export const userSession = async (
    _: any,
    args: Args,
{ clients: { userSession } }: Context
) => {
    return await userSession.getUserData(args)
}