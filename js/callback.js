
// const msg = (name)=>{
//     console.log("Hello"+name);
// }
// msg("tops");


const getName = (index, callback) => {
    var names = ["tops", "tech", "Het", "uday", "Arshi", "Mital", "Jayesh"];
    if (index > names.length) {
        callback("Index not found")
    }
    else {
        callback(undefined,names[index])
    }
}

const getDetails = (name,callback)=>{
    callback(name+ " is a node student")
}


getName(50, (err,data) => {
    if(err)
    {
        console.log(err);
        return;
    }
    console.log(data);
    getDetails(data,(result)=>{
        console.log(result);
    })
});