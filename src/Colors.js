

const Colors={
    green:"#3db00c",
    pink:"#ef0bc5",
    blue:"#0f87c3",
    red:"#f90303e3",
    violet:"#54044d",
    white: localStorage.getItem("darkMode") !== "true" ? "#000604": "#f6f3f3",
    black:localStorage.getItem("darkMode") == "true" ? "#000604": "#f6f3f3",
   
    orange:'#f56702ef'
}


export  default Colors;