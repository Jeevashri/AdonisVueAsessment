// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database';
import User from 'App/Models/Employee'
import EmployeeValidator from 'App/Validators/EmployeeValidator';


export default class EmployeesController {

    public async insert({request}){
        await request.validate(EmployeeValidator)
         try{    
             const user = new User()
       
            user.id = request.input('id')
            user.name = request.input('name')
            user.dob= request.input('dob')
            user.doj = request.input('doj')
            user.email= request.input('email')
            user.phone = request.input('phone')
            user.department_id = request.input('departmentName')
       
        
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

        public async delete({request}) {
            try{
            console.log(request.input('departmentId'))
            const deleteId = await User.findOrFail(request.input('departmentId'))
            return await deleteId.delete()

            }
            catch{
               return "Delete operation is failed"
            }     
    }
          
        public async update({request}){

                try{
                    // console.log(request.input("phone"))
                    // console.log(request.input("name"))
                    // console.log(request.input("id"))
                const  updateId= await User.findOrFail(request.input('id'))
            
                updateId.name = request.input('name')
                updateId.dob= request.input('dob')
                updateId.doj = request.input('doj')
                updateId.email= request.input('email')
                updateId.phone = request.input('phone')
                updateId.department_id = request.input('departmentName')
           


                // const departmentName = request.input('departmentName')

                // const departmentId = await Database
                // .rawQuery('select department_id from departments where department_name = ?', [departmentName])
                // // console.log(departmentId)
                // updateId.department_id = departmentId[0][0].department_id  
                return updateId.save()
                
                }
             catch{
                
                return "Update operation is failed"

             }   
            }

            public async joins ()
    {
        const join = await Database.from("employees")
                                        .join('departments','departments.id', "=", 'employees.department_id')
                                        .select("departments.name")
                                        .select("employees.id")
                                        .select("employees.name")
                                        .select("employees.dob")
                                        .select("employees.doj")
                                        .select("employees.email")
                                        .select("employees.phone")
                                        .select("employees.department_id")
                                        .select("employees.created_at")
                                        .select("employees.updated_at")
                                        // .select("employees.*")
                                        
                                        // console.log(join)
        return join
    }
  
    // public async filterStaffs({request}){
    //     const departmentName = request.input('departmentName')
    //     //console.log(request.input('departmentName'))
    //     const departmentId = await Database
    //     .rawQuery('select department_id from departments where department_name = ?', [departmentName])
    //   //console.log(departmentId)
    //   const departid = departmentId[0][0].department_id
    //   //console.log(departid)
    //   const filteredData = await Database
    //   .from('staff')
    //   .where('department_id', departid)
    //   //console.log(filteredData)
    //   return filteredData;
    
    // }


    public async revertTable({request}){

     const departmentName = (await Database
      .from('departments')
      .where('department_id', request.input('departmentId')))
      console.log(departmentName)
      const departIdName = departmentName[0].department_name
      console.log(departIdName)
      return departIdName

    }



    
}
