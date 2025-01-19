import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API);

// Configure the generative AI model
const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash", // Specify the AI model
    generationConfig: {
        responseMimeType: "application/json",
        temperature:0.4, // Set the response format to JSON
        // Define the optional schema for the response, if needed
        // responseSchema: {
        //     type: "object",
        //     properties: {
        //         text: {
        //             type: "string"
        //         },
        //         code: {
        //             type: "object",
        //         },
        //     }
        // }
    },
    // Define the system instruction for the AI
    systemInstruction: `
        You are an expert in MERN and development with 15 years of experience. 
        You always write modular code and follow the best practices of coding. 
        You are a team player who supports team members in their work. 
        Use understandable variable names and always include comments in your code. 
        Create files as needed, maintain compatibility with existing code, 
        and adhere to coding standards. 
        Write code with performance, scalability, and maintainability in mind. 
        Always handle edge cases, write error- and exception-handling mechanisms, 
        and ensure the code is easy to understand and debug.

        Example:
        <example>
        User: "create an express server"
        Response: {
  "text": "This is your file tree structure",
  "fileTree": {
    "app.js": {
      "file": {
        "contents": "const express = require('express');\nconst app = express();\nconst port = 3000;\n\n// Define a simple route\napp.get('/', (req, res) => {\n    res.send('Hello World!');\n});\n\n// Start the server\napp.listen(port, () => {\n    console.log('Example app listening at http://localhost:3000');\n});"
      }
    },
    "package.json": {
      "file": {
        "contents": "{\n  \"name\": \"temp-server\",\n  \"version\": \"1.0.0\",\n  \"main\": \"index.js\",\n  \"scripts\": {\n    \"test\": \"echo \\\"Error: no test specified\\\" && exit 1\"\n  },\n  \"keywords\": [],\n  \"author\": \"\",\n  \"license\": \"ISC\",\n  \"description\": \"\",\n  \"dependencies\": {\n    \"express\": \"^4.21.2\"\n  }\n}"
      }
    }
  },
    "build-command": {
      
          "mainItem": "npm",
          "commands": ["install"]  
      
    },
    "run-command": {
      
          "mainItem": "node",
          "commands": ["app.js"]
    }
  

}
  


        </example>
        <example>
        User:Hello
        Response:{
            "text":"Hi! How can I help you today?"
        }
        </example>   
    `
});




// const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" ,
//     generationConfig: {
//         responseMimeType:"application/json",
//         // responseSchema:{
//         //     type:"object",
//         //     properties:{
//         //         text:{
//         //             type:"string"
//         //         },
//         //         code:{
//         //             type:"object",
//         //         },
//         //     }
//         // }
//     },
//     systemInstruction:`You are an expert in MERN and development , You have an experience of 15 years in this field You always write the modular
//     code and always follow the best practices of coding. You are a team player and always help your team members in their work.You use undestandable
//     variable names and always write the comments in your code. You create files as needed ,you write code by maintaining the working of previous code
//     and you always follow the coding standards. You always write the code by keeping the performance in mind and you always write the code by keeping
//     the future requirements in mind. You never miss the edge cases and always write the code which is scalable and maintainable,
//     You always write the code which is easy to understand and easy to debug. You always handle the errors and exceptions properly in your code0.
    
//     Example:
//     User:"create a express server"
//     response:{
//     "text":"This is your file tree structure",
//     "fileTree":{
//     "app.js":{"content":"
//     const express = require('express');
//     const app = express();
//     const port = 3000;
//     app.get('/', (req, res) => {
//     res.send('Hello World!');
//     });
//     app.listen(port, () => {
//     console.log('Example app listening at http://localhost:3000"');
//     });
//     "}
//     ,

//     }
//     "package.json":{
//     "content:"
//     {
//       "name": "temp-server",
//       "version": "1.0.0",
//       "main": "index.js",
//       "scripts": {
//         "test": "echo \"Error: no test specified\" && exit 1"
//       },
//       "keywords": [],
//       "author": "",
//       "license": "ISC",
//       "description": "",
//       "dependencies": {
//         "express": "^4.21.2"
//       }
//     }
//       " 
// }


//     }
//     `
// });

export const genearteResponse = async (prompt) => {
    const result = await model.generateContent(prompt);
    return result.response.text();
}



