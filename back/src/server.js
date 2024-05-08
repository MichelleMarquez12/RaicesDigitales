import express, { query, response } from "express";
import BodyParser from "body-parser";
import { MongoClient } from "mongodb"
import cors from "cors";

const app = express();
const uri = "mongodb://127.0.0.1:27017";
const DB = 'CARH';

app.use(express.static(__dirname + '/public'));

app.use(BodyParser.json());

app.use(cors({
    origin: "*",
    methods: ['GET', 'POST']
}))

app.post('/RaicesDigitales/', async (req, res) => {
    res.send("Hola todo bien");
});

//CONEXION A MONGO PROMEDIO
app.post('/RaicesDigitales/usuarios', async (req, res) => {

    const client = new MongoClient(uri);
    try {
        // Connect to the MongoDB cluster
        await client.connect();

        var connection = await client.db(DB).collection('users');

        // Make the appropriate DB calls
        var query = req.body;

        switch (query.method) {
            case ("query"): {
                var users_collection = await
                    connection.find(
                        {
                            'users.username': query.username,
                            'users.password': query.password
                        }
                    ).toArray();
                if (users_collection.length > 0) {
                    var temp_array = users_collection[0].users;
                    temp_array.forEach(element => {
                        if (query.username == element.username && query.password == element.password) {
                            res.status(200).send(element);
                        }

                    });
                } else {
                    res.status(202).send("user_error: user not found");
                }
                break;
            }
            case ("insert"): {
                var size = Object.keys(query).length;
                if (size > 4 || size < 4) {
                    res.status(400).send("body format error")
                } else {
                    var user_profile = {
                        "username": query.username,
                        "password": query.password,
                        "type": query.type
                    }
                    var users_collection = await connection
                        .find(
                            {
                                'users.username': query.username
                            }
                        ).toArray();
                    if (users_collection.length > 0) {
                        res.status(400).send("user already exist")
                    } else {
                        var users_collection = await connection.findOne({});
                        var users_array = users_collection.users
                        users_array.push(user_profile);
                        await connection.updateOne({}, { $set: { 'users': users_array } });
                        res.status(200).send("insert realizado");
                    }
                    break;
                }

            }
        }

        //console.log(datos);
    } catch (e) {
        res.status(500).send("Internal Server Error");
        console.error(e);
    } finally {
        await client.close();
    }

});

app.post('/RaicesDigitales/usuarios/delete', async (req, res) => {
    const client = new MongoClient(uri);

    try {
        // Connect to the MongoDB cluster
        await client.connect();
        await client.db(DB).collection('users').deleteOne(req.body);
        res.status(200).send("usuario se ha eliminado con exito");
        // Make the appropriate DB calls
        //console.log(datos);
    } catch (e) {
        console.error(e);
        res.status(500).send("Internal Server Error");
    } finally {
        await client.close();
    }

});


app.post('/RaicesDigitales/messages/:get', async (req, res) => {
    const client = new MongoClient(uri);
    try {
        await client.connect();
        var connection = await client.db(DB).collection('comments');

        switch (req.params.get) {
            case "create":
                var query = req.body;
                //random id
                const dateString = Date.now().toString(36);
                const randomness = Math.random().toString(36).substring(2);
                var unicID = dateString + randomness;
                //fecha
                var date = new Date();
                var UTCdate = `${date.getUTCDate()}-${date.getUTCMonth() + 1}-${date.getUTCFullYear()} ${date.getUTCHours()}:${date.getUTCMinutes()}:${date.getUTCSeconds()}`;

                var comment_body = {
                    "id": unicID,
                    "name": query.name,
                    "email": query.email,
                    "phone": query.phone,
                    "website": query.website,
                    "message": query.message,
                    "time": UTCdate,
                    "status": "unwatched"
                }
                var comments_collection = await connection.findOne({});
                if (query.subject == "comments") {
                    var comments_array = comments_collection.comments
                    comments_array.push(comment_body);
                    await connection.updateOne({}, { $set: { 'comments': comments_array } });
                    res.status(200).send("comment saved succesfully");
                }
                else if (query.subject == "support") {
                    var comments_array = comments_collection.support
                    comments_array.push(comment_body);
                    await connection.updateOne({}, { $set: { 'support': comments_array } });
                    res.status(200).send("comment saved succesfully");
                }
                else {
                    res.status(400).send("error wrong subject ")
                }

                break;

            case "delete":
                var placeholder = {}
                placeholder[req.body.section] = req.body.new_array;
                await connection.updateOne({}, { $set: placeholder });
                res.status(200).send("todo bien")
                break;

            case "all":
                var comments = await connection.find({}).toArray();
                var all_comments = comments[0]['comments'].concat(comments[0]['support'])
                res.status(200).send(all_comments)

                break;
            case "comments":
                var comments = await connection.find({}).toArray();
                var all_comments = comments[0]['comments']
                res.status(200).send(all_comments)

                break;
            case "support":
                var comments = await connection.find({}).toArray();
                var all_comments = comments[0]['support']
                res.status(200).send(all_comments)

                break;
            case "updateStatus":
                var placeholder = {}
                placeholder[req.body.section] = req.body.new_array;
                await connection.updateOne({}, { $set: placeholder });
                res.status(200).send(all_comments)
                break;
            default:
                break;
        }


    } catch (e) {
        res.status(500).send("Internal Server Error");
        console.error(e);
    } finally {
        await client.close();
    }
});

// app.post('/RaicesDigitales/usuarios', async (req, res) => {
//     const client = new MongoClient(uri);

//     try {
//         // Connect to the MongoDB cluster
//         await client.connect();
//         await client.db(DB).collection('users').insertOne(req.body);


//         res.status(200).send("usuario ingresado con exito");
//         // Make the appropriate DB calls
//         //console.log(datos);
//     } catch (e) {
//         console.error(e);
//         res.status(500).send("Internal Server Error");
//     } finally {
//         await client.close();
//     }

// });

app.post('/RaicesDigitales/regenerating/getall', async (req, res) => {
    const client = new MongoClient(uri);
    var body = await client.db(DB).collection('posts').findOne({ "page": "regenerating", "language": req.body.lan });
    return res.status(200).send(body);
});

app.post('/RaicesDigitales/regenerating/:query/:field', async (req, res) => {
    const client = new MongoClient(uri);
    try {
        // Connect to the MongoDB cluster
        await client.connect();
        var connection = await client.db(DB).collection('posts');

        switch (req.params.query) {

            case "get":
                var en_body = await connection.findOne({ "page": "regenerating", "language": "EN" });
                var es_body = await connection.findOne({ "page": "regenerating", "language": "ES" });
                var respose = {};
                respose['es'] = es_body['regenerating'][req.params.field];
                respose['en'] = en_body['regenerating'][req.params.field];
                return res.status(200).send(respose)
                break;
            case "update":
                var body = await connection.findOne({ "page": "regenerating", "language": "ES" });
                var es_array = body['regenerating'][req.params.field]
                var body = await connection.findOne({ "page": "regenerating", "language": "EN" });
                var en_array = body['regenerating'][req.params.field]
                switch (req.params.field) {
                    case "values":
                        es_array.map(function (post) {
                            if (post.id == req.body.id) {
                                post.name = req.body.es.name;
                                post.body = req.body.es.body;
                            }
                            return post;
                        });
                        en_array.map(function (post) {
                            if (post.id == req.body.id) {
                                post.name = req.body.en.name;
                                post.body = req.body.en.body;
                            }
                            return post;
                        });

                        break;

                    case "profiles":
                        es_array.map(function (post) {
                            if (post.id == req.body.id) {
                                post.name = req.body.es.name;
                                post.image = req.body.es.image;
                            }
                            return post;
                        });
                        en_array.map(function (post) {
                            if (post.id == req.body.id) {
                                post.name = req.body.en.name;
                                post.image = req.body.en.image;
                            }
                            return post;
                        });

                        break;
                    default:
                        es_array[0]=req.body.es;
                        en_array[0]=req.body.en;
                        break;
                }

                var placeholder = {}
                placeholder["regenerating." + req.params.field] = es_array;
                await connection.updateOne({ "page": "regenerating", "language": "ES" }, { $set: placeholder });
                placeholder["regenerating." + req.params.field] = en_array;
                await connection.updateOne({ "page": "regenerating", "language": "EN" }, { $set: placeholder });
                return res.status(200).send(await connection.find({ "page": req.params.field }).toArray());
            case "add":
                var placeholder = {}
                placeholder["regenerating." + req.params.field] = req.body.es;
                await connection.updateOne({ "page": "regenerating", "language": "ES" }, { $set: placeholder });
                placeholder["regenerating." + req.params.field] = req.body.en;
                await connection.updateOne({ "page": "regenerating", "language": "EN" }, { $set: placeholder });
                let response_add = await connection.find({ "page": "regenerating" }).toArray()
                return res.status(200).send("todo bien");
            case "delete":
                var body = await connection.findOne({ "page": "regenerating", "language": "ES" });
                var es_array = body['regenerating'][req.params.field]
                var body = await connection.findOne({ "page": "regenerating", "language": "EN" });
                var en_array = body['regenerating'][req.params.field]
                es_array = es_array.filter(post => post.id != req.body.id);
                en_array = en_array.filter(post => post.id != req.body.id);
                var placeholder = {}
                placeholder["regenerating." + req.params.field] = es_array;
                await connection.updateOne({ "page": "regenerating", "language": "ES" }, { $set: placeholder });
                placeholder["regenerating." + req.params.field] = en_array;
                await connection.updateOne({ "page": "regenerating", "language": "EN" }, { $set: placeholder });
                return res.status(200).send(await client.db(DB).collection('posts').find({ "page": "regenerating" }).toArray());
            default:
                return res.status(404).send("Query no encontrada")
                break;
        }

        // Make the appropriate DB calls
        //console.log(datos);
    } catch (error) {
        console.error("Error en el servidor");
        console.error(error);
        return res.status(500).send(error);
    } finally {
        await client.close();
    }
});

app.post('/RaicesDigitales/usfetch/:query', async (req, res) => {
    const client = new MongoClient(uri);
    try {
        // Connect to the MongoDB cluster
        await client.connect();
        var connection = await client.db(DB).collection('posts');

        switch (req.params.query) {

            case "get":
                var en_body = await connection.findOne({ "page": "us", "language": "EN" });
                var es_body = await connection.findOne({ "page": "us", "language": "ES" });
                var respose = {};
                respose['es'] = es_body['us']["main_data"];
                respose['en'] = en_body['us']["main_data"];
                return res.status(200).send(respose)
                break;
            case "update":

                var placeholder = {}
                placeholder["us.main_data"] = req.body.es;
                await connection.updateOne({"page":"us","language":"ES" }, { $set: placeholder });
                placeholder["us.main_data"] = req.body.en;
                await connection.updateOne({"page":"us","language":"EN" }, { $set: placeholder });
                return res.status(200).send(await connection.findOne({ "page":"us"}));

            default:
                return res.status(404).send("Query no encontrada")
                break;
        }

        // Make the appropriate DB calls
        //console.log(datos);
    } catch (error) {
        console.error("Error en el servidor");
        console.error(error);
        return res.status(500).send(error);
    } finally {
        await client.close();
    }
});



app.post('/RaicesDigitales/:name/:query', async (req, res) => {
    const client = new MongoClient(uri);
    try {
        // Connect to the MongoDB cluster
        await client.connect();
        var connection = await client.db(DB).collection('posts');
        var body_es = await connection.findOne({ "page": req.params.name, "language": "ES" });
        var body_en = await connection.findOne({ "page": req.params.name, "language": "EN" });
        //unic ID
        const dateString = Date.now().toString(36);
        const randomness = Math.random().toString(36).substring(2);
        var unicID = dateString + randomness;
        //fecha
        var date = new Date();
        var UTCdate = `${date.getUTCDate()}-${date.getUTCMonth() + 1}-${date.getUTCFullYear()} ${date.getUTCHours()}:${date.getUTCMinutes()}:${date.getUTCSeconds()}`;

        let es_object = {
            "title": req.body.es_title,
            "body": req.body.es_body,
            "image": req.body.image,
            "author": req.body.author,
            "id": unicID,
            "timestamp": UTCdate,
            "visible": true,
        }
        let en_object = {
            "title": req.body.en_title,
            "body": req.body.en_body,
            "image": req.body.image,
            "author": req.body.author,
            "id": unicID,
            "timestamp": UTCdate,
            "visible": true,
        }

        let es_array = body_es[req.params.name]['content']
        let en_array = body_en[req.params.name]['content']
        switch (req.params.query) {
            case "get":
                var body = await client.db(DB).collection('posts').findOne({ "page": req.params.name, "language": req.body.lan });
                res.status(200).send(body);
                break;
            case "create":

                es_array.push(es_object);
                en_array.push(en_object);

                var placeholder = {}

                placeholder[req.params.name + ".content"] = es_array;
                await connection.updateOne({ "page": req.params.name, "language": "ES" }, { $set: placeholder });

                placeholder[req.params.name + ".content"] = en_array;
                await connection.updateOne({ "page": req.params.name, "language": "EN" }, { $set: placeholder });

                res.status(200).send(await client.db(DB).collection('posts').find({ "page": req.params.name }).toArray());
                break;
            case "update":
                // es_object = es_array.find(post => post.id == req.body.id);
                // es_object["title"] = req.body.es_title;
                // es_object["body"] = req.body.es_body;
                // es_object["image"] = req.body.image;
                // es_object["visible"] = req.body.visible;

                // es_array = es_array.filter(post => post.id != req.body.id);
                // es_array.push(es_object);
                // en_object = en_array.find(post => post.id == req.body.id);
                // en_object["title"] = req.body.en_title;
                // en_object["body"] = req.body.en_body;
                // en_object["image"] = req.body.image;
                // en_object["visible"] = req.body.visible;
                // en_array = en_array.filter(post => post.id != req.body.id);
                // en_array.push(en_object);

                es_array.map(function (post) {
                    if (post.id == req.body.id) {
                        post.title = req.body.es_title;
                        post.body = req.body.es_body;
                        post.image = req.body.image;
                        post.visible = req.body.visible;
                        post.author = req.body.author;
                    }
                    return post;
                });

                en_array.map(function (post) {
                    if (post.id == req.body.id) {
                        post.title = req.body.en_title;
                        post.body = req.body.en_body;
                        post.image = req.body.image;
                        post.visible = req.body.visible;
                        post.author = req.body.author;
                    }
                    return post;
                });


                var placeholder = {}
                placeholder[req.params.name + ".content"] = es_array;
                await connection.updateOne({ "page": req.params.name, "language": "ES" }, { $set: placeholder });
                placeholder[req.params.name + ".content"] = en_array;
                await connection.updateOne({ "page": req.params.name, "language": "EN" }, { $set: placeholder });
                res.status(200).send(await client.db(DB).collection('posts').find({ "page": req.params.name }).toArray());

                break;
            case "delete":
                es_array = es_array.filter(post => post.id != req.body.id);
                en_array = en_array.filter(post => post.id != req.body.id);
                var placeholder = {}
                placeholder[req.params.name + ".content"] = es_array;
                await connection.updateOne({ "page": req.params.name, "language": "ES" }, { $set: placeholder });
                placeholder[req.params.name + ".content"] = en_array;
                await connection.updateOne({ "page": req.params.name, "language": "EN" }, { $set: placeholder });

                res.status(200).send(await client.db(DB).collection('posts').find({ "page": req.params.name }).toArray());

            default:
                break;
        }
        // res.status(200).send(body);
        // Make the appropriate DB calls
        //console.log(datos);
    } catch (e) {
        console.error(e);
        res.status(500).send("Internal Server Error");
    } finally {
        await client.close();
    }
});





// app.post('/RaicesDigitales/images', async (req,res)=>{
//     r
// });





// app.post('/hello', (req, res) => {
//     //informacion por body
//     res.send(`Que onda ${req.body.name}`);
// });

// app.get('/hello/:name', (req, res) => {
//     //informacion por enlace
//     res.send(`Que onda ${req.params.name}`);
// });

app.listen(8000, () => {
    console.log("El servidor está en el puerto 8000");
});