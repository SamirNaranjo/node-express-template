const mongoose = require('mongoose');


const dbConnection = async () => {

    try {
        
        await mongoose.connect(process.env.MONGODB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useCreateIndex: true,
            //  useFindAndModify: false
        });

        console.log('Base de datos Online');

    } catch (error) {
        console.log(error);
        throw new Error('Error al inicializar la base de datos');
    }
}

module.exports = {
    dbConnection
}