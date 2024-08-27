// import vodd from './adminvideo.mp4'
// import './login.css'
// // import { createContext, useEffect, useRef, useState } from 'react';
// // import User from './user';
// import { Link, useNavigate } from 'react-router-dom';
// const Login = (e) => {

//     // useEffect(()=>{
//     //     function start(){
//     //         gapi.client.init({
//     //             clientId:clientId,
//     //             scope:""
//     //         })
//     //     };
//     //     gapi.load('client:auth2',start)
//     // });
//     // const navigate=useNavigate();
//     // const navigation=()=>
//     // {
//     //     navigate("/main")
//     // }

    
//     const [userData,setUserData]=useState(
//         {
            
            
//             userName:"",
//             password:"",
            

//         })

//    const {userName, password} = userData;

//     const handleChange=(e)=>{
//         console.log("Input Changed")
//         setUserData({...userData, [e.target.name]: [e.target.value]})

//     }

//     // const userCheck=async()=>{

       
        
          
        
        
//     // }

//     return(

//         <div style={{fontFamily:"Jovelyn Blur Demo"}}>
            
//     <div className="menu">
       
//         <video src={vodd} autoPlay muted loop playsInline className='img'></video>
        
//     </div>
//     <div className="login glow">
//         <h1>CHOUBLAK RESTAURANT</h1>
//     </div>
//     <div className="input glass">
        
//         <table>
//             <tr><td>
//         <label><b> Username</b></label>
//     </td>
//         <td>
//         <input value={userName} onChange={(e)=>handleChange(e)} 
//         className='inpt' type="text" name="userName" id=""/>
//     </td>
//     </tr>

        
    
//     <tr>
//      <td>
//     <label><b> Password </b></label>
//     </td>
//     <td>
//         <input value={password} onChange={(e)=>handleChange(e)} className='inpt' type="password" name="password" id=""/>
//     </td>
//     </tr>
//     </table>
//     <Link to={`/main/${userName} `}>  <button  className="btn1">Login</button></Link>
//    <div style={{marginTop:"100px"}}>
  
   
//    {/* <Glogout/> */}

//    </div>
   
// {/* <div style={{marginTop:"20px"}}>
// <Appcontext.Provider value={{username}}>
//      <User/>
// </Appcontext.Provider>
// </div> */}
     
//     </div>
    



   

//         </div>
//     )
     
// };
// export default Login;
