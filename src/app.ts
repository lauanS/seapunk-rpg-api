import express from 'express';
import dbConnect from './config/dbConnect';
import character from './models/Character';

const realConnectDb = async () => {
  const connection = await dbConnect();

  /*
   * readyState retorna um valor entre 0 e 1
   * 0: desconectado
   * 1: conectado
   * 2: conectando
   * 3: desconectando
   * Se esse console retornar 1, está tudo certo
   * 
   * Perceba que essa função já virou desnecessária
   */
  console.log("Connection status:", connection.readyState);
};

realConnectDb();



const PORT = 3001;
const app = express();

app.use(express.json());



// GET

app.get('/', (req, res) => {
  res.status(200).send("Seapunk RPG");
});


app.get('/characters', async(req, res) => {
  const characterList = await character.find({});
  res.status(200).json(characterList);
});

// // POST
// app.post('/chars', (req, res) => {
//   pass
// });


// // PUT
// app.put('/chars/:id', (req, res) => {
//   const id = parseInt(req.params.id);
//   const char = chars.find((char) => char.id === id);

//   if (char) {
//     char.name = req.body.name;
//     res.status(200).json(char);
//   } else {
//     res.status(404).send("Character not found");
//   }
// });

// // DELETE
// app.delete('/chars/:id', (req, res) => {
//   const id = parseInt(req.params.id);
//   const char = chars.find((char) => char.id === id);

//   if (char) {
//     const index = chars.indexOf(char);
//     chars.splice(index, 1);
//     res.status(200).json(char);
//   } else {
//     res.status(404).send("Character not found");
//   }
// });

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
