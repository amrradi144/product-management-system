


let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let create = document.getElementById('create');
const scrbtn = document.getElementById('up');
let mood = 'create'

let tmp;

function gettotal(){
    if(price.value != ''){
        let result = (+price.value + +taxes.value + +ads.value) 
        - +discount.value;
        total.innerHTML = result;
        total.style.backgroundColor = 'green';
    }else{
        total.innerHTML = '';
        total.style.backgroundColor = '#e74c3c';
    }
}


let datapro; 
if(localStorage.getItem('prodect') != null){
    datapro = JSON.parse(localStorage.getItem('prodect'));
}else{
    datapro = [];
}

create.onclick = function(){
    let newpro = {
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase(),
    }
    if (title.value != '' 
        && price.value != '' 
        && category.value != ''
        && newpro.count <= 100) 
        {
        if (mood === 'create') {
            
            if (newpro.count > 1) { 
                for (let i = 0; i < newpro.count; i++) {
                    datapro.push(newpro);
                }
            }else{
                datapro.push(newpro);
            }
        }
        else{
            datapro[tmp] = newpro;
            mood = 'create';
            create.innerHTML = 'create';
            count.style.display = 'block';
        }
    cleardata();
    }

    localStorage.setItem('prodect', JSON.stringify(datapro));
    showdata();
}

function cleardata(){
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
}



showdata();
function showdata(){
    gettotal();
    let table = '';
    
    for(let i=0; i<datapro.length; i++){
        table += `<tr>
                        <td>${i+1}</td>
                        <td>${datapro[i].title}  </td>
                        <td>${datapro[i].price}</td>
                        <td>${datapro[i].taxes}</td>
                        <td>${datapro[i].ads} </td>
                        <td>${datapro[i].discount}</td>
                        <td>${datapro[i].category}</td>
                        <td>${datapro[i].total} </td>
                        <td><button onclick = 'updata( ${i} )' id ="update">update</button></td>
                        <td><button onclick = 'deletedata( ${i} )' id ="delete">delete</button></td>
                    </tr> `;
                }
    document.getElementById('tbody').innerHTML = table;

    let btndelete = document.getElementById('deleteall');
    if (datapro.length > 0) {
        btndelete.innerHTML = `
        <button onclick = 'deleteall() '>delete All (${datapro.length})</button>
        `
    }
    else{
        btndelete.innerHTML =''
    }
}

function deleteall(){
    localStorage.clear();
    datapro.splice(0);
    showdata();
}
function deletedata(i){
    datapro.splice(i, 1);
    localStorage.prodect = JSON.stringify(datapro);
    showdata();
}


function updata(i){
    title.value = datapro[i].title;
    price.value = datapro[i].price;
    taxes.value = datapro[i].taxes;
    ads.value = datapro[i].ads;
    category.value = datapro[i].category;
    discount.value = datapro[i].discount;
    create.innerHTML = 'update';
    count.style.display = 'none';
    gettotal();
    mood = 'update';
    tmp = i;
    scroll({
        top:0,
        behavior:'smooth',
    })

}



let searchmood = 'title';
function getsearchmood(id){
    let search = document.getElementById('search');
    if(id == 'searchTitle'){
        searchmood = 'title';
    }else{
        searchmood = 'category';
    }
    search.placeholder = 'Search By ' + searchmood;
    search.focus();
    search.value = '';
    showdata();
}


function searchdata(value){
    let table = '';
    for (let i = 0; i < datapro.length; i++) {
    if (searchmood == 'title') {

                if(datapro[i].title.includes(value.toLowerCase())){

                    table += `<tr>
                            <td>${i}</td>
                            <td>${datapro[i].title}  </td>
                            <td>${datapro[i].price}</td>
                            <td>${datapro[i].taxes}</td>
                            <td>${datapro[i].ads} </td>
                            <td>${datapro[i].discount}</td>
                            <td>${datapro[i].category}</td>
                            <td>${datapro[i].total} </td>
                            <td><button onclick = 'updata( ${i} )' id ="update">update</button></td>
                            <td><button onclick = 'deletedata( ${i} )' id ="delete">delete</button></td>
                        </tr> `;
                }
            
                }
                
                else{
                        if(datapro[i].category.includes(value.toLowerCase())){
                            table += `<tr>
                                    <td>${i}</td>
                                    <td>${datapro[i].title} </td>
                                    <td>${datapro[i].price}</td>
                                    <td>${datapro[i].taxes}</td>
                                    <td>${datapro[i].ads} </td>
                                    <td>${datapro[i].discount}</td>
                                    <td>${datapro[i].category}</td>
                                    <td>${datapro[i].total} </td>
                                    <td><button onclick = 'updata( ${i} )' id ="update">update</button></td>
                                    <td><button onclick = 'deletedata( ${i} )' id ="delete">delete</button></td>
                                </tr> `;
                        }
                }
        
        }

    document.getElementById('tbody').innerHTML = table;
}

addEventListener ('scroll', () => {
    if(scrollY > 300){
        scrbtn.style.display = 'block';}
    else{
        scrbtn.style.display = 'none';
    }
});

scrbtn.onclick = () => {
    scroll({
        top:0,
        behavior:'smooth',
    })
}




