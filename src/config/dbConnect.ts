import mongoose from 'mongoose';

const connection_string:string = 'mongodb://localhost:27017/Seapunk';

async function dbConnect() {
  const connection = mongoose.connection;

  connection.on('error', (error) => {
    console.log('erro de conexão:', error);
  });

  connection.on('open', () => {
    console.log('Conexão feita com sucesso!');
  });

  connection.on('connected', () => {
    console.log('Conectado!');
  });

  await mongoose.connect(connection_string);

  return connection;
}

export default dbConnect;
