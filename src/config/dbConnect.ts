import mongoose from "mongoose"

const connection_string:string = "mongodb://localhost:27017/Seapunk"

async function dbConnect() {
  const connection = mongoose.connection;

  /*
   * Antes de iniciar a conexão com o banco de dados
   * você já pode definir os eventos deles
   * A conexão do jeito que estava antes, já funcionava
   * porém, nunca era chamado os eventos de connected ou open
   * pois eles já haviam sido chamados antes de você definir os eventos (durante o await)
   */ 
  connection.on("error", (error) => {
    console.log("erro de conexão:", error);
  });

  connection.on("open", () => {
    console.log("Conexão feita com sucesso!");
  });

  connection.on("connected", () => {
    console.log("Conectado!");
  });
      
  await mongoose.connect(connection_string);

  return connection;
}

export default dbConnect;