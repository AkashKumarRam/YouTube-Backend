import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

//Form er throught data asle evabe handle hoi = 16Kb porjonto data accept korbo ekhane, er besiyo korte paro
app.use(express.json({limit: "16kb"}))

//Url theke oneksomoi data asbe jeta amader express ke janate hoi
app.use(express.urlencoded({extended: true,limit: "16kb"}))

// Kono PDF ba images bs favicon amra amader server e rakhte chaile amra rakhte pari
app.use(express.static("public"))

// Cookie parser er sahajje amra user er cookie te securely CRUD operation perform korte parbo,ar eta sudhu server ei read korte parbe
app.use(cookieParser())

export { app };
