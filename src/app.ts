import express from 'express';
import dbConnect from './config/dbConnect';
import routes from './routes/index';

const PORT = 3001;

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

const app = express();
routes(app);


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
