import { IOClients } from '@vtex/api'
//clients
import { UserSessionClient } from './userSession'

// Extend the default IOClients implementation with our own custom clients.
export class Clients extends IOClients {
  get userSession() {
    return this.getOrSet('userSession', UserSessionClient)
  }
}
