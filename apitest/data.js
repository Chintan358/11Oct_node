


const getdata = () => {

    fetch("https://ecome-001.onrender.com/products").then(data => {
        return data.json()
    }).then(result => {

        var tab = "<table border='1'><tr><th>Pname</th><th>Price</th><th>Category</th></tr>";
        for (var i = 0; i < result.length; i++) {
            tab = tab + "<tr><td>" + result[i].pname + "</td><td>" + result[i].price + "</td><td>"+result[i].categoryInfo[0].catname+"</td></tr>"
        }
        tab = tab + "</table>"
        tbl.innerHTML = tab

    }).catch(err => {
        console.log(err);
    })



}