import { ExternalClient, InstanceOptions, IOContext } from '@vtex/api'
import axios from 'axios'
//constants
import { IClientData } from '../../typings/userSession'

export class UserSessionClient extends ExternalClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super('', context, {
      ...(options ?? {})
    })
  }

  public getUserData = async ({ token }: { token: string }): Promise<IClientData> => {
    try {
      if(token){
        const response = await axios.get(`https://86ec07fd-67d5-4714-a9eb-75c68a37ff0b.mock.pstmn.io/client/market`, {
          headers: {
            Authorization:  `Bearer ${token}`
          }
        })

        return response.data.data
      }else{
        throw new Error('Error')
      }
    } catch (error) {
      throw new Error('Error')
    }
  }
}
