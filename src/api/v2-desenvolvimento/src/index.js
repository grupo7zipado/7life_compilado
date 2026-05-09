import express from "express";
import cors from "cors"
import config from "../../../../db.json" with { type: "json" }
import routers from "./routes/main.js"
const app = express();
app.use(cors());
app.use(express.json());
app.use(routers);

app.listen(config.PORTA_V2_API, ()=>{
    console.log("Serviço iniciado na porta: " + config.PORTA_V2_API);
})