import express, { Router } from "express";
import * as dotenv from 'dotenv';
import { Configuration, OpenAIApi } from "openai";

dotenv.config();

const router = express.Router();

const config = new Configuration ({
    apikey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

router.route('/').get((req, res) => {
    res.status(200).json({ message: "Hello am dall.e from routes "})
})

router.route('/').post(async (req, res) => {
    try {
        const { prompt } = req.body;

        const response = await openai.createImage({
            prompt,
            n: 1,
            size: '1024x1024',
            response_format: 'b64_json'
        });

        console.log('Response:', response); // Add this line to check the structure of the response object

        const image = response.data.data[0].b64_json;

        console.log('Image:', image); // Add this line to check the value of the image variable

        res.status(200).json({ photo: image});
        
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Something Went Wrong" })
    }
});


export default router;