var page1Content = document.getElementById("page1-content")
var cursor = document.getElementsByClassName("cursor")[0]

page1Content.addEventListener("mousemove",function(e){
    cursor.style.left = e.x+"px"
    cursor.style.top = e.y+"px"
})