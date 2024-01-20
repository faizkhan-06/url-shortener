import express from "express";
import mongoose from "mongoose";
import urls from "./models/urls.js"

const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/url-shortner");

app.use(express.urlencoded({extended: false}));
app.set('view engine','ejs');
app.use(express.static('public'));

app.get("/", async (req, resp) => {
    const fullUrl = req.query.fullUrl;

    if (fullUrl) {
        const shortUrls = await urls.findOne({ fullUrl });
        resp.render('index', { shortUrls });
    } else {
        const shortUrls = {};
        resp.render('index', { shortUrls });
    }
});


app.post("/shortUrl", async (req, resp) => {
    if (req.body.fullUrl) {
        const shortUrls = await urls.findOne({ fullUrl: req.body.fullUrl });
        if(shortUrls){
            resp.render('index', { shortUrls });
        }else{
            await urls.create({ fullUrl: req.body.fullUrl});
            const shortUrls = await urls.findOne({ fullUrl: req.body.fullUrl });
            resp.render('index', { shortUrls });
        }

    } else {
        const shortUrls = {};
        resp.render('index', { shortUrls });
    }
});

app.get("/:shortUrl",async(req,resp)=>{
    const shortUrl = await urls.findOne({shortUrl : req.params.shortUrl});

    if(shortUrl == null){
        return resp.sendStatus(404);
    }
    resp.redirect(shortUrl.fullUrl);
});

app.listen(process.env.PORT || 5000,()=>{
    console.log("server is runnig...");
});


