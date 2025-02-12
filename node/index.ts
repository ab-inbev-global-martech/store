import {
    ClientsConfig,
    Service,
    ServiceContext,
    ParamsContext,
    RecorderState,
  } from '@vtex/api'
  
  import { Clients } from './clients'
  import { resolvers } from './resolvers'
  
  
  
  // This is the configuration for clients available in `ctx.clients`.
  const clients: ClientsConfig<Clients> = {
    // We pass our custom implementation of the clients bag, containing the Status client.
    implementation: Clients,
    options: {
      // All IO Clients will be initialized with these options, unless otherwise specified.
      default: {
        retries: 2,
        timeout: 6000,
      },
      // This key will be merged with the default options and add this cache to our Status client.
      orders: {
        timeout: 5000,
      }
    },
  }
  
  declare global {
    // We declare a global Context type just to avoid re-writing ServiceContext<Clients, State> in every handler and resolver
    type Context = ServiceContext<Clients, State>
  
    // The shape of our State object found in `ctx.state`. This is used as state bag to communicate between middlewares.
    interface State extends RecorderState {
      code: number
    }
  }
  
  // Export a service that defines route handlers and client options.
  export default new Service<Clients, State, ParamsContext>({
    clients,
    graphql: {
      resolvers
    }
  })
  