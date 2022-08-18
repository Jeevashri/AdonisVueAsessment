import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Env from '@ioc:Adonis/Core/Env'
export default class StaffDepartment {
  public async handle(
         
    { request, response }: HttpContextContract,
    next: () => Promise<void>
  ) {
    const appKey = Env.get('APP_KEY')
    if ( appKey !== request.header('appkey')) {
      response.unauthorized({ error: 'Not authorized request' })
      return
    }
    await next()
  }
}

