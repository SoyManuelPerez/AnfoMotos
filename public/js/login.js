const mensajeError = document.getElementsByClassName("error")[0]

document.getElementById("login").addEventListener("submit",async (e)=>{
  e.preventDefault();
  const user = e.target.children.user.value;
  const password = e.target.children.password.value;
   const baseUrl = window.location.origin;
   const apiUrl = `${baseUrl}/login`;
  const res = await fetch(apiUrl,{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body: JSON.stringify({
      user,password
    })
  });
  console.log(res)
  if(!res.ok) return mensajeError.classList.toggle("escondido",false);
  const resJson = await res.json();
  if(resJson.redirect){
    window.location.href = resJson.redirect;
  }
})