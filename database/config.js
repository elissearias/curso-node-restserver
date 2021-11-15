//ocuparé la conexión de mongoose
const mongoose = require ('mongoose');


//Creo una función asíncrona db conection 
const dbConnection = async () => {
    try {
        //con el await espera que la conexión se haga 
        //dentro del connect recibe la url que hemos creado como variable
        //mando ciertos objetos seguido de una ',' que se piden en mongoose
        await mongoose.connect(process.env.MONGODB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopoLogy: true,
            //useCreateIndex: true,
            //useFindAndModify: false
        });

        console.log('Base de datos online');
        
    } catch (error) {
        //Ver el error que está disparando
        console.log(error);

        throw new Error('Error a la hora de iniciar la base de datos');
    }
}

module.exports = {
    dbConnection
}