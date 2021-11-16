import { ExternalClient, InstanceOptions, IOContext } from '@vtex/api'
//constants
import { IClientData } from '../../typings/userSession'

export class UserSessionClient extends ExternalClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super(`https://86ec07fd-67d5-4714-a9eb-75c68a37ff0b.mock.pstmn.io`, context, {
      ...(options ?? {}),
      headers: {
        ...(options?.headers ?? {}),
        'Content-Type': 'application/json; charset=utf-8'
      },
    })
  }

  public getUserData = async (): Promise<IClientData> => {
    try {
      const result = await this.http.get(`/client/market`)
      return result.data
    } catch (error) {
      throw new Error('Error')
    }
  }
}
