const mongoose = import ('mongoose')

const dbConnection = async() => {
    try {
        (await mongoose).connect( process.env.MONGO_CNN /*, {
            useNewURLParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            userFindAndModify: false

        }*/  )
        console.log('DB Connected!')
    } catch (err) {
        console.log(err)
        throw new Error('Error en DB')
    }
}

export {
    dbConnection
}