import mongoose from 'mongoose';

const CONNECTION_STRING:string = process.env.MONGODB_URI || '';

async function dbConnect(connectionString: string = CONNECTION_STRING) {
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

  await mongoose.connect(connectionString);

  return connection;
}

export default dbConnect;
