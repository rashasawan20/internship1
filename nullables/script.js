function runExamples() {
    let user = null;
  console.log(user?.name); 

  user = { name: "fatima" };
  console.log(user?.name); 


  let username = null;
  console.log(username ?? "Guest"); 

  username = "fatima";
  console.log(username ?? "Guest"); 
}

runExamples();