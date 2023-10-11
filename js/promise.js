
const getName = (index) => {
    var names = ["tops", "tech", "Het", "uday", "Arshi", "Mital", "Jayesh"];

    return new Promise((resolve, reject) => {
        if (index > names.length) {
            reject("Index not found")

        }
        else {
            resolve(names[index])
        }
    })
}

const getDetails = (name)=>{
    return new Promise((resolve,reject)=>{
        resolve(name +" is a java student")
    })
}

// getName(5).then(data => {
//     console.log(data);
//     return getDetails(data)
// }).then(result=>{
//     console.log(result);
// }).catch(err => {
//     console.log(err);
// })

const mydata =async ()=>{

    try {
    const name = await getName(100);
    const result = await getDetails(name);
    console.log(name+" "+result);
    } catch (error) {
        console.log(error);
    }
    
}

mydata()