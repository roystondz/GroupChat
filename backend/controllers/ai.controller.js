import * as ai from "../services/gemini.service.js";


export const getResult = async (req, res) => {
    try{
        const prompt = req.query.prompt;
    const result = await ai.genearteResponse(prompt);
    res.send(result);
    }catch(err){
        res.status(500).send(err.message);
    }
}