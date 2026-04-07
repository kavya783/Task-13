import { orange, yellow } from "@mui/material/colors";

const Colors={
    green:"#3db00c",
    pink:"#ef0bc5",
    blue:"#0f87c3",
    red:"#f90303e3",
    violet:localStorage.getItem("darkMode") !== "true" ? "#000604": "#6c0d64",
    white: localStorage.getItem("darkMode") != "true" ? "#000604": "#f6f3f3",
    black:localStorage.getItem("darkMode") == "true" ? "#000604": "#f6f3f3",
    yellow:'#e2ea08',
    orange:'#f56702ef'
}


export  default Colors;