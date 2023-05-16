import express, { Request, Response } from "express"
import axios, { AxiosResponse } from "axios"
import { QuizData } from "./interfaces";
import * as dotenv from "dotenv"
dotenv.config()

const PORT = 8000
const app = express();


app.get('/quiz-item', async (req: Request, res: Response) => {
    try {
        // @ts-ignore
        const response: AxiosResponse = await axios.get(process.env.URL, {
            headers: {
                'X-Cassandra-Token': process.env.TOKEN,
                accept: 'application/json'
            }
        })
        if (response.status == 200) {
            const quizitem: QuizData = await response.data.data['e713bee1-1906-46ca-8f50-8ba2b89a6793']
            res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
            res.send(quizitem)
        }

    } catch (err) {
        console.log(err)
    }
})

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));