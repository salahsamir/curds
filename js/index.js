var title = document.getElementById("title");
var price = document.getElementById("price");
var taxes = document.getElementById("taxes");
var abs = document.getElementById("abs");
var discount = document.getElementById("discount");
var total = document.getElementById("total");
var count = document.getElementById("count");
var category = document.getElementById("category");
var btn = document.getElementById("btn");
var btndel = document.getElementById("btndel");
// var search = document.getElementById("search");
var out=document.querySelector('.out')
var err=document.querySelector('.error')
var back=document.getElementById('back')
var result;

var temp;
var list ;
var mood="create"
if(localStorage.product !=null){
  list=JSON.parse(localStorage.product )
display()

}
else{
  list=[]
}
//////this func for calc total price////
function gettotal() {

 
  if (price.value != "") {
    result = +price.value + +taxes.value + +abs.value - +discount.value;
    total.innerHTML = result;
    total.style.background = "#040";
  } else {
    total.innerHTML = " ";
    total.style.background = "#a80606";
  }



}

/////create product/////////
function create() {


if(validprice()==true  ){
 var product = 
 {
   title: title.value,
   price: price.value,
   taxes: taxes.value,
   abs: abs.value,
   discount: discount.value,
   total: total.innerHTML,
   count: count.value,
   category: category.value,
 };
if(mood=="create"){
 if(product.count>1){
   for(var i=0;i<product.count;i++){
     list.push(product)
   }
  }
  else{
   list.push(product)
  }
}else{
 list[temp]=product;
 mood="create"
 btn.innerHTML="create";
count.style.display="block";

}
 localStorage.setItem('product',JSON.stringify(list))
 console.log(list);
 getclear()
    
}else{
 err.classList.remove('d-none')
 back.addEventListener('click',function(){
 err.classList.add('d-none')
 

 })
 getclear()

 
}
}



//////////clear data//
function getclear(){

   title.value="";
   price.value="";
   taxes.value=""; 
   abs.value="";
   discount.value=""
   total.innerHTML="";
   count.value="";
  category.value="";
}
function getclear2(){


  price.value="";
  taxes.value=""; 
  abs.value="";
  discount.value=""
  total.innerHTML="";

}
///////display////
function display(){
  gettotal()
  var box=""
  for(var i=0;i< list.length ;i++){
    box+=`<tr>
    <td>${i}</td>
    <td>${list[i].title}</td>
    <td>${list[i].price}</td>
    <td>${list[i].taxes}</td>
    <td>${list[i].abs}</td>
    <td>${list[i].discount}</td>
    <td>${list[i].total}</td>
    <td>${list[i].count}</td>
    <td>${list[i].category}</td>
    <td><button onclick="updata(${i})" id="update">update</button></td>
    <td><button onclick="del(${i})" id="delete">delete</button></td>

  </tr>`
  }
document.getElementById('display').innerHTML=box;
if(list.length>0){
  btndel.innerHTML=`
  <button onclick="delall()">delete all (${list.length})</button>
  `
}
else{
  btndel.innerHTML=""

}
}
/////////delete func////////
function del(index){
list.splice(index,1);
localStorage.setItem('product',JSON.stringify(list))

display()




}
function delall(){
  list.splice(0)
  localStorage.setItem("product",JSON.stringify(list))
  display()
}
function updata(i){
  title.value=list[i].title;
  price.value=list[i].price;
  taxes.value=list[i].taxes;
  abs.value=list[i].abs;
  discount.value=list[i].discount;
  total.value=list[i].total;
  count.value= list[i].count;
  category.value=list[i].category;
  gettotal();
  count.style.display="none";
  btn.innerHTML="update";
  mood="update";
  temp=i;
  scroll({
    top:0,
    behavoir:"smooth"
  })


}
var searchmood="title"
function searchMood(id){

var search=document.getElementById("search")
  if(id=="titlesearch"){
    searchmood="title"
  }else{
    searchmood="catogery"
  }
  search.placeholder='search by '+searchmood
  search.focus()
  search.value=''
  display()

}

function searchData(value){
  var box=''
  
  for(var i=0; i<list.length;i++){
  if(searchmood=="title")
{

    if(list[i].title.toLowerCase().includes(value.toLowerCase())){
     
      box+=`<tr>
      <td>${i}</td>
      <td>${list[i].title}</td>
      <td>${list[i].price}</td>
      <td>${list[i].taxes}</td>
      <td>${list[i].abs}</td>
      <td>${list[i].discount}</td>
      <td>${list[i].total}</td>
      <td>${list[i].count}</td>
      <td>${list[i].category}</td>
      <td><button onclick="updata(${i})" id="update">update</button></td>
      <td><button onclick="del(${i})" id="delete">delete</button></td>
  
    </tr>`
  
    }
  }
  else{
    
      if(list[i].category.toLowerCase().includes(value.toLowerCase())){
      
        box+=`<tr>
        <td>${i}</td>
        <td>${list[i].title}</td>
        <td>${list[i].price}</td>
        <td>${list[i].taxes}</td>
        <td>${list[i].abs}</td>
        <td>${list[i].discount}</td>
        <td>${list[i].total}</td>
        <td>${list[i].count}</td>
        <td>${list[i].category}</td>
        <td><button onclick="updata(${i})" id="update">update</button></td>
        <td><button onclick="del(${i})" id="delete">delete</button></td>
    
      </tr>`
    
  
      }

  }}
  document.getElementById('display').innerHTML=box;

}
function validprice(){
  var reg=/^[0-9]{0,}$/gm;

  if(reg.test(price.value)==true){
    return true
  }else{
   
    
    return false
  }

}



btn.onclick=function(){
  create()
display()


}
