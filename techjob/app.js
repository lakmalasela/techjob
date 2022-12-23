// console.log("ADE EXPRESS");
const express = require('express');
var bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Item = require('./src/models/item'); //import the item model

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

const port = 4000;


const connectionURI = 'mongodb+srv://lakmalasela95:lakmal160@cluster0.y6orkp7.mongodb.net/ceylon?retryWrites=true&w=majority';

mongoose.connect(connectionURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}); //established the connection

//check the if have any error
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('DB Connected');

});

// let items = [];

//get method
app.get('/', function(req, res) {
    res.send('Hello World')
})

//post method
app.post('/item', async(req, res) => {
    try {

        const { price, name, description, color } = req.body;
        console.log(price, name, description, color);

        // console.log('req', req.body);
        const data = new Item({

            //if the both sides are equal
            price,
            name,
            description,
            color

            // price: price,
            // name:name,
            // description: description,

        });

        await data.save(); //insert the database
        // items.push(req.body);
        // console.log("Items", items);


        //success
        res.sendStatus(200)

        // throw new Error();
    } catch (e) {
        //server error
        console.log("Error", e);
        res.sendStatus(500)


    }
})

//get method
app.get("/getitem", async(req, res) => {

    try {

        const data = await Item.find({ color: 'Red' })
            // const data = await Item.find({ price: 1200 })
        console.log(data);

        res.status(200).json(data); //json wedihata return wenne

    } catch (e) {
        res.sendStatus(500);
    }
})

//delete method
app.delete("/deleteitem/:color", async(req, res) => {

    try {
        const color = req.params.name; //param eken ena name eka
        // console.log(name);

        //if the both sides are equal
        // const data = await Item.deleteOne({ name: name })

        await Item.deleteOne({ color })

        // items = items.filter((e) => e.itemname !== name)
        // console.log("THIS", items);

        res.sendStatus(200);

    } catch (error) {
        console.log("Error ", error);

        res.sendStatus(500);
    }
})

//update method
app.put("/itemupdate", async(req, res) => {


    try {
        const name = req.body.name;
        console.log("ITEMNAME", name);

        const newName = req.body.newName;

        await Item.updateOne({ name }, { name: newName }); //updateOne({ filter }, { updateValue })

        // items = items.map((e) => {

        //     if (e.itemname === name) {
        //         // console.log(name);
        //         // console.log(e.itemname);


        //         e.itemname = newName;
        //     }
        //     return e;
        // });
        // console.log(items);
        res.sendStatus(200);



    } catch (error) {
        res.sendStatus(500);
    }
})


//config the port
app.listen(port, () => {
    console.log("HI EXPRESS");
});