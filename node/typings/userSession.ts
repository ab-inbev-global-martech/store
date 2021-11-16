export interface IGiftcardData {
    id: string
    redemptionCode: string
}

export interface IClientData {
    email: string
    mongoId: string
    actual_points: string
    address: string
    state: string
    firstName: string
    lastName: string
    giftcard: IGiftcardData
}

