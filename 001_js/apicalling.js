
fetch("https://restcountries.com/v3.1/all").then(data => {
    return data.json()
}).then(result => {

    var options = "";
    for (var i = 0; i < result.length; i++) {
        options = options + "<option>" + result[i].name.common + "</option>"
    }

    // console.log(options);
    country.innerHTML = options
    
}).catch(err => {
    console.log(err);
})