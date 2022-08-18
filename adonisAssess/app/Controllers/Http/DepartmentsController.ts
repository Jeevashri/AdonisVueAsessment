


// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import User from 'App/Models/Department'
import DepartmentValidator from 'App/Validators/DepartmentValidator'
export default class DepartmentsController {

    public async insert({request}){
        await request.validate(DepartmentValidator);
        try{
 
            const user = new User()
            
            user.name = request.input('departmentName')

        
           return await user.save()
        }
        catch(err){
                return  "Insert operation is failed"

        }
             
        }
        
        public async select(){

            const user = await User.all()
            return user;
    
        }
        public async delete({request}){

            try{
        
            const deleteId = await User.findOrFail(request.input('departmentId'))
            return await deleteId.delete()

            }
            catch{
            return "Delete operation is failed"
            }

            }
             
            public async update({request}){

                try{ 
                const updateId = await User.findOrFail(request.input('departmentId'))
                
                updateId.name = request.input('departmentName')
                 return updateId.save()
                
                }
                catch{

                        return "update operation is failed"
                }

            }



}








