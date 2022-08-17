/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'
import EmployeesController from 'App/Controllers/Http/EmployeesController'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.group(()=>{

  Route.group(()=>{
  Route.post('insertDepartment','DepartmentsController.insert')
  Route.get('selectDepartment','DepartmentsController.select')
  Route.delete('deleteDepartment','DepartmentsController.delete')
  Route.patch('updateDepartment','DepartmentsController.update')
  
  })
  Route.group(()=>{
  Route.post('insertEmployee','EmployeesController.insert')
  Route.get('selectEmployee','EmployeesController.select')
  Route.delete('deleteEmployee','EmployeesController.delete')
  Route.patch('updateEmployee','EmployeesController.update')
  Route.get('joins','EmployeesController.joins')
  // Route.post('filterStaffs','EmployeesController.filterStaffs')
  Route.post('revertTable','EmployeesController.revertTable')
  })
  
  }).middleware('auth')
  
