const regForm=document.getElementById("register");

const baseUrl = "https://students.codex.today/createAccount"

regForm.addEventListener("submit",(event)=>{
    event.preventDefault();
    const formData = {
        name: regForm.name.value,
        // empid: regForm.empid.value,
        empemail:regForm.empemail.value,
        password: regForm.password.value
    }

    fetch(baseUrl, {
        method : "POST",
        headers: {
            "Content-Type":"application/json"
        },
        body:JSON.stringify(formData)
    })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.log(err))
})

var loginForm=document.getElementById("login");
loginForm.addEventListener("submit",(event)=>{
    event.preventDefault();
    const formData={
        email:loginForm.empemail.value,
        password:loginForm.password.value
    }

    fetch("https://students.codex.today/login",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(formData)
    })
    .then(res => res.json())
    .then(data => {
        const keys=Object.keys(data);
        keys.forEach((e)=> localStorage.setItem(e,data[e]));
        // console.log(data);
        // keys.forEach((each) => {
        //     if(formData.empid == each.empid && formData.password == each.password){
        //         window.location.assign("/html/attendance2.html")
        //     }
        //     else{
        //         console.log("Can't assign a location");
        //     }
        // })
        window.location.assign("/html/attendance2.html")
    })
    .catch(err => console.log(err))
})

// var loginForm=document.getElementById("login");
// loginForm.addEventListener("submit",async(event) =>
// {
//     try{
//         event.preventDefault();
//         var formData={
//             empid:loginForm.empid.value,
//             password:loginForm.password.value
//         }
//         var res = await fetch(baseUrl,{
//             method:"POST",
//             headers:{
//                 "Content-Type":"application/json"
//             },
//             body: JSON.stringify(formData)
//         })
//         var data = await res.json();
//         // localStorage.setItem("access",data.access);
//         const keys=Object.keys(data);
//         keys.forEach((e)=> localStorage.setItem(e,data[e]));
//         window.location.assign("/html/attendance2.html");
//     } catch(error)
//     {
//         console.log(error); 
//     }
// })

window.onload = ()=>{
    const token = localStorage.getItem("token");
    if(token){
        window.location.assign("/html/attendance2.html");
    }
}


