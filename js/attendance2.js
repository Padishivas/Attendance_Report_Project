const baseUrl = "https://students.codex.today/getUsers";
const token = localStorage.getItem("token");

window.onload = ()=>{
    const token = localStorage.getItem("token");
    if(!token){
        window.location.assign("/html/attendance.html");
    }
    fetchData()
} 

const logout = () => {
    localStorage.clear();
    window.location.reload();
};

// var emplogin = document.getElementById("emplogin");
// var emplog=emplogin.value;
// console.log(emplog);

const fetchData = async()=>{
    const res = await fetch("https://students.codex.today/getUsers",{
        method : "GET",
        headers : {
            "Content-Type" : "application/json",
            Authorization : "Bearer " + token
        }
        
    })
    const data=await res.json();
    // var el=localStorage.getItem(data.email);
    // var el=localStorage.getItem(e,data[e].email);
    // console.log(el);


    // const userId = localStorage.getItem("userId");
    // const userData = data.filter(e => e._id == userId)[0]
    // console.log(userData.attandance[0]);
    // var tm=userData.attandance[0].time;
    // console.log(tm);

    const useremail=localStorage.getItem("email");
    // const userData = data.filter(e => e.)
    const salary=document.getElementById("monthsalary");
    const dt=data.forEach((e)=>{
        if(e.email==useremail){
                console.log(e)
                const attandance = e.attandance;
                let absents = 0;
                let late = 0;
                if(attandance) {
                    attandance.forEach(e => {
                        try {
                            const dt1=document.querySelector(`[date="${e.date}"]`)
                            console.log(`[date="${e.date}"]`);
                            console.log(dt1);
                            console.log(e.time);
                            dt1.innerHTML += `<br> <p style="font-size:12px">${e.time}</p>`;
                            // liTag.innerHTML=tm;
                            // var t="10.00";
                            // if(e.time < t){
                            //     console.log("True")
                            // }else{console.log("False")}
                            const tempDate = new Date(e.date);
                            const d = tempDate.getDay();
                            if(d !==0 && d !== 6) {
                                if(e.time > "10.00") {
                                    late++;
                                }
                                if(!e.time) {
                                    absents++;
                                }
                                if(late ===3 ) {
                                    absents++;
                                    late = 0
                                }
                            }
                            var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
                            var ld=lastDay.getDate();
                            console.log(absents);

                            let perdaysalary = 50000/ld;
                            let totalsalary = 50000 - perdaysalary*absents;
                            // console.log(salary);
                            // salary.innerHTML=parseInt(totalsalary);
                            const getSalary = document.getElementById("getSalary");
                            getSalary.addEventListener("click",(e)=>{
                                e.preventDefault();
                                salary.innerHTML="Rs " + parseInt(totalsalary);
                            })
                        } catch (error) {
                            console.log(error);
                        }
                    });
    
                }
            
        }
    });
    console.log(data);

    

    }
    

    // for(let i=0;i<data.length;i++){
    //     const ele=data[i];
    //     console.log(ele);
    // }
    // const dt=data.name;
    // console.log(dt);    



// fetch("https://students.codex.today/getUsers").then(res => res.json())
// .then(data =>console.log(data));

// .then(res => {
//     console.log(res);
//     var html="";
//     res.data.forEach(data => {
//         html += `<h1>${data.name[0]}</h1>`

//         document.getElementById("matter").innerHTML=html;
//     })
// })

var regForm=document.getElementById("employee");
var emplUrl="https://students.codex.today/addAttendance";

regForm.addEventListener("submit",(event)=>{
    event.preventDefault();
    const formData = {
        name: regForm.name.value,
        email: regForm.email.value,
        date: regForm.date.value,
        time: regForm.time.value
    }

    fetch(emplUrl, {
        method : "POST",
        headers: {
            "Content-Type":"application/json",
            Authorization : "Bearer " + token
        },
        body:JSON.stringify(formData)
    })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.log(err))
})





// add = async()=>{
//     const res = await fetch("https://students.codex.today/addAttendance",{
//         method : "POST",
//         headers : {
//             "Content-Type" : "application/json",
//             Authorization : "Bearer " + token
//         }
        
//     })
//     const data=await res.json();
//     console.log(data);
// }

// name date email time



// -------------------------CALENDAR START--------------------------------------//

const currentDate = document.querySelector(".current-date");
const daysTag = document.querySelector(".days");
const prevNextIcon = document.querySelectorAll(".icons span");

let date = new Date();
let currYear = date.getFullYear();
let currMonth = date.getMonth();

const months = ["January","Febraury","March","April","May","June","July","August",
"September","October","November","December"];

const renderCalendar = () => {
    let firstDayofMonth = new Date(currYear, currMonth, 1).getDay();  // getting first day of month
    let lastDateofMonth = new Date(currYear, currMonth +1, 0).getDate(); //getting last date of month
    let lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(); // getting last day of month
    // let lastDateofMonth = new Date(currYear, currMonth, 0).getDate();
    // console.log(lastDateofMonth);
    let lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate(); //getting last date of previous month
    let liTag = "";

    for(let i = firstDayofMonth; i > 0; i--){  // creating li of previous month last days
        liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
    }

    for (let i=1;i<=lastDateofMonth;i++){  // creating li of all days of current month
        // console.log(i);
        // adding active class to li if the current day, month, and year matched
        let isToday = i === date.getDate() && currMonth === new Date().getMonth() && currYear === new Date().getFullYear() ? "active" : "";
        let currMon = currMonth;
        let currDay = i;
        if( parseInt(currMonth+1) < 10) {
            currMon = "0"+parseInt(currMonth+1)
        } else currMon = parseInt(currMonth+1)
        if(i<10) {
            currDay = "0"+i
        }
        const attr = currYear+"-"+currMon+"-"+currDay;
        liTag += `<li class="${isToday}" date=${attr}>${i}</li>`;
    }

    for (let i = lastDayofMonth; i < 6; i++){  // creating li of next month first days
        liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`;
    }
    currentDate.innerHTML = `${months[currMonth]} ${currYear}`;
    daysTag.innerHTML = liTag;
}
renderCalendar();

prevNextIcon.forEach(icon => {
    icon.addEventListener("click", () => {  // adding click event on both icons
        // console.log(icon);

        // if clicked icon is previous then decrement current month by 1 else increment it by 1
        currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;

        if(currMonth < 0 || currMonth > 11){ // if current month is less than 0 or greater than 11
            // creating a new date of current year & month and pass it as date value
            date = new Date(currYear, currMonth);
            currYear = date.getFullYear(); // updating current year with new date year
            currMonth = date.getMonth(); // updating current month with new date month
        }else{  // else pass new date as date value
            date = new Date();
        }
        renderCalendar();
        fetchData();
    });
});


// ------------------------ CALENDAR END---------------------------------------//