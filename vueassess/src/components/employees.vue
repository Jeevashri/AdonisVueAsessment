<template >

<div>
  <br>
    <h1>EMPLOYEE DETAILS</h1>
    <br>

  <label for="department">Choose a department</label>
  <select class="selectHtml"  @change="filterEmployees()"  v-model="departmentNameFilter" >
    <option class="select" v-for="department in selectDepartmentData" :value="department.id" :key="department.id">
          {{ department.name}}
    </option>
  </select>
 <br><br>
<!-- 
<table v-if="tableIfValue" id = "filtered"  >
        <tr>
          <th scope="col">staffid</th>
          <th scope="col">Name</th>
          <th scope="col">phone</th>  
        </tr>
        <tr v-for="(entry, i) in selectFilteredData" :key="i">
         <td>{{ entry.id }}</td>
          <td>{{ entry.name }}</td>
          <td>{{ entry.phone }}</td>
        </tr>
</table>
<br><br> -->

    <button class="open-button" @click="openForm()" >Open Form</button>
    <div   class="form-popup" id="myForm">
    <form @submit.prevent >
        <input type="text" placeholder="Enter your Name " v-model="name" >
        <br>
        <label>Date of birth:</label><br>
        <input type="date"  v-model="dob" >
        <br> 
        <label>Date of Joining</label><br>
        <input type="date"  v-model="doj" >
        <br><br>

        <input type="email" placeholder="Enter your email " v-model="email" >
        <br>
        <input type="tel" placeholder="Enter your phone number " v-model="phone" ><br><br>
        <label class= "labelCss" for="department">Choose a department:</label>
        <select  v-if="updateButton==true" class="selectHtml" v-model="departmentName">
                <option class="select" v-for="department in selectDepartmentData" :value="department.id" :key="department.id">
        {{ department.name}}
                </option>
                </select>

          <select v-if="updateButton==false" class="selectHtml" v-model="departmentName">
                <option class="select" v-for="department in selectDepartmentData" :value="department.id" :key="department.id">
        {{ department.name}}
                </option>
        </select>
         <br><br>
        
        <button v-if="updateButton==true" type="submit" class="btn" @click="insert()" >SUBMIT</button><br><br>
        <button v-if="updateButton==false" type="submit" @click="updateTable(updateIndex)" class="btn btn-dark" >Update </button>

        <button type="button" class="btn cancel" @click="closeForm()">Close</button>
        <br>
    </form>
    <br><br>
    </div>

    <br><br>
     <table id = "customers"  >
        <tr>
          <th scope="col">id</th>
          <th scope="col">name</th>
          <th scope="col">dob</th>
          <th scope="col">doj</th>
          <th scope="col">email</th>
          <th scope="col">phone</th>
          <th scope="col">departmentId</th>
          <th scope="col">createdAt</th>
          <th scope="col">updatedAt</th>

       </tr>
      
       <tr v-for="(entry, i) in selectJoinData" :key="i">
         <td>{{ entry.id }}</td>
          <td>{{ entry.name }}</td>
          <td>{{ entry.dob }}</td>
          <td>{{ entry.doj}}</td>
          <td>{{ entry.email}}</td>
          <td>{{ entry.phone}}</td>
          <td>{{ entry.department_id}}</td>
          <td>{{ entry.created_at}}</td>
          <td>{{ entry.updated_at}}</td>
        
          <td><button @click='deleteId(entry.id)' >Delete</button></td>
          <td><button @click='revertTable(i,entry.id)' >Edit</button></td> 
        </tr>
    </table>
    </div>
<!-- {{selectDepartmentData}}<br><br> -->
{{selectJoinData}}
  </template>
  

<script>
import axios from "axios";
import moment from 'moment'
export default {
  data(){
    return{
      
    instance:"",
    selectFilteredData:[],
    selectEmployeeData:[],
    selectJoinData:[],
    selectRevertData:'',
    selectDepartmentData:null,
    deleteStaffId:null,
    insertData:"",
    employeeId:"",
    name:"",
    phone:"",
    dob:"",
    doj:"",
    email:"",
    departmentName:"",
    myForm:"",
    updateButton:true,
    updateIndex:"",
    updateData:"",
    tableIfValue:false
      
  }},
    mounted(){

              this.instance = axios.create({
  baseURL: 'http://127.0.0.1:3333',
  headers: {appkey :'lQPyVbE34G_l8NQPJVkhNuwcdftG2O1A'}
})

 this.instance.get('/selectEmployee').then((result) => {
      this.selectEmployeeData = result.data;  })                 

 this.instance.get('/selectDepartment').then((result) => {
      this.selectDepartmentData = result.data;               

 })
      
       this.instance.get('/joins').then((result) => {
      this.selectJoinData = result.data;  })   

},
  
methods:{

select(){
   this.instance.get('/selectEmployee').then((result) => {
      this.selectStaffData = result.data;

   })
},

joins(){
  this.instance.get('/joins').then((result) => {
      this.selectJoinData = result.data;  })   },


revertTable(i,updateId){
      
      this.name = this.selectJoinData[i].name
      console.log(this.name)
      const dateOfBirth = moment.utc(this.selectJoinData[i].dob).format('YYYY-MM-DD')
      console.log(dateOfBirth)
      this.dob = dateOfBirth
      const dateOfJoining = moment.utc(this.selectJoinData[i].doj).format('YYYY-MM-DD')
      this.doj = dateOfJoining
      this.email = this.selectJoinData[i].email
      this.phone = this.selectJoinData[i].phone
   
      this.revertData={
        departmentId: this.selectEmployeeData[i].department_id
      }
      
      this.instance.post('/revertTable',this.revertData).then((result) => {
    this.departmentName = result.data;
    })
  
      
      console.log(this.departmentName)
      this.openForm()
      this.updateButton = false
      this.updateIndex = updateId  
},

updateTable(updateIndex){

 this.updateData ={
    id:updateIndex,
    name:this.name,
    phone:this.phone,
    dob:this.dob,
    doj:this.doj,
    email:this.email,
    departmentName:this.departmentName
      }
      
   this.instance.patch("/updateEmployee", this.updateData).then((result) => {
      this.data = result.data;
      
   this.updateButton = true
   this.clearForm()
   this.select()
   this.joins()
    })
  
},
deleteId(deleteEmployeeId){
     
     console.log(deleteEmployeeId)
    this.instance.delete("/deleteEmployee" ,{ data: { departmentId : deleteEmployeeId} }).then((result) => {
      this.deleteData = result.data;
    //    this.select()
       this.joins()
    })
},

   insert() {
    this.formData ={
    name:this.name,   
    dob: this.dob,
    doj: this.doj,
   email: this.email,
   phone: this.phone,
   departmentName  : this.departmentName
      }

      if(/^[A-Za-z]+[A-Za-z ]*$/.test(this.name)){
          if((/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.email))){
              if(/^[6-9]\d{9}$/.test(this.phone)){
                    if(this.departmentName!= ""){
                           this.instance.post('/insertEmployee',this.formData).then((result) => {
                           this.insertData = result.data;
                           this.clearForm();
                           this.select() 
                           this.joins()
                                     })
                             }
                    else{
                        alert("choose the department")
                        }
              }else{
              alert("enter valid phone number")
           }
      }else{
        alert("enter valid email")
      }
   
   }
   else{

    alert("enter valid name")

   }
   },
  
 openForm() {
  document.getElementById("myForm").style.display = "block";
},

 closeForm() {
  document.getElementById("myForm").style.display = "none";
},
  clearForm() {
      this.name = "";
      this.phone = "";
      this.dob="",
      this.doj="",
      this.email="",
      this.departmentName = "";
    },
  async filterEmployees(){
  alert("in func")
   const listData =  await this.instance.get("/selectEmployee")
   alert(listData.data)
   this.selectJoinData = listData.data.filter(result =>
         {
             return  result.department_id == this.departmentNameFilter;
        })
    }
  
} 
}

</script>
<style>

	/* div{

       justify-content: center;
    }  */

.labelCss{

  font-size: 20px;
  font-family: 'Times New Roman', Times, serif;
  color:white;
}
button {
  background-color: #4CAF50; /* Green */
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin-left: 50px;
}
  #customers{
    /* margin-top: 40px;
    margin-right: 1000px; */
  font-family: Arial, Helvetica, sans-serif;
  border-collapse:calc() ;
  margin-top:100px;
  margin-right: 400px;

  align-self: center;
  
  /* width: 100%; */
}

#filtered {
 font-family: Arial, Helvetica, sans-serif;
  border-collapse:calc() ;
  border-style: calc();
}

#customers td, #customers th,#filtered tr,#filtered th {
  border: 1px solid #ddd;
  padding: 8px;
   font-size: 20px;
   text-align: center;
}


#customers th,#filtered th{
  padding-top: 12px;
  padding-bottom: 12px;
  font-size: 20px;
  text-align: left;
  background-color: #04AA6D;
  color: white;
}
input[type="text"],input[type="tel"],input[type="select"],input[type="date"],input[type="email"]
{
    font-size:15px;
    height: 60px;
    width: 400px;
  background-color: white;
  margin-top: 20px;
  

}
input[type="select"]{

margin-left: 80px;
}

h1{
margin-left: 100px;
font-weight: 300;
font-size: 30px;
font-family: serif;
color: #4CAF50;
}

.select{
 margin-left: 80px;
 width: 400px;
 height: 80px;
}

.selectHtml{

  width:200px;
  height: 30px;
}

.open-button {
  background-color: #555;
  color: white;
  padding: 16px 20px;
  border: none;
  cursor: pointer;
  opacity: 0.8;
  position: fixed;
  top: 23px;
  right: 28px;
  width: 280px;
}

/* The popup form - hidden by default */
.form-popup {
  display: none;
  position: fixed;
  top: 0;
  right: 15px;
  border: 3px solid #f1f1f1;
  z-index: 9;
  background-color: black;
}

/* Add styles to the form container */
.form-container {
  max-width: 500px;
  padding: 10px;
  background-color: white;
}

/* Full-width input fields */
.form-container input[type=text], .form-container input[type=password] {
  width: 100%;
  padding: 15px;
  margin: 5px 0 22px 0;
  border: none;
  background: #f1f1f1;
}

/* When the inputs get focus, do something */
.form-container input[type=text]:focus, .form-container input[type=password]:focus {
  background-color: #ddd;
  outline: none;
}

/* Set a style for the submit/login button */
.form-container .btn {
  background-color: #04AA6D;
  color: white;
  padding: 16px 20px;
  border: none;
  cursor: pointer;
  width: 100%;
  margin-bottom:10px;
  opacity: 0.8;
}

/* Add a red background color to the cancel button */
.form-container .cancel {
  background-color: red;
}

/* Add some hover effects to buttons */
.form-container .btn:hover, .open-button:hover {
  opacity: 1;
}
 
</style>