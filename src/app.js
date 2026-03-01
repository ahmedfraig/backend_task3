require("dotenv").config();
const express = require("express");
const hbs = require("hbs");
const path = require("path");
const forecast = require("./tools/forecast");
const geo = require("./tools/geo");

const port = process.env.port || 3000;

const app = express();

const staticPath = path.join(__dirname, "../public");
app.use(express.static(staticPath));

app.set("view engine", "hbs");
const viewsPath = path.join(__dirname, "../template/views");
app.set("views", viewsPath);

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide address",
    });
  }
  geo(req.query.address, (error, data) => {
    if (error) {
      return res.send({
        error,
      });
    }
    forecast(data.latitude,data.longitude,(error,data)=>{
        if(error){
            return res.send({
                error
            })
        }
        res.send({
            forecast:data,
            address: req.query.address
        })
    })
  });
});

app.use((req, res) => {
  res.status(404).send("404 page not Found");
});

app.listen(port, () => {
  console.log(`app listening of port: ${port}`);
});
