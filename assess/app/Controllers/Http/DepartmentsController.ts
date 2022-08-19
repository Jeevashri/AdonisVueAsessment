import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/Department'
import DepartmentValidator from 'App/Validators/DepartmentValidator'
export default class DepartmentsController {

    public async insert({request}:HttpContextContract){

         const departmentRecords  = await request.validate(DepartmentValidator);
        try{

             const user = new User()
             user.name = departmentRecords.departmentName
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

     public async delete({request}:HttpContextContract){
  
            try{
        
            const deleteId = await User.findOrFail(request.input('departmentId'))
            return await deleteId.delete()

            }
            catch{
            return "Delete operation is failed"
            }

            }
             
    public async update({request}:HttpContextContract){
                
                const departmentRecords  = await request.validate(DepartmentValidator);
                try{ 

                const updateName = await User.findOrFail(request.input('departmentId'))  
                updateName.name = departmentRecords.departmentName
                 return updateName.save()
                
                }
                catch{

                        return "update operation is failed"
                }

            }



}








