import mongoose from 'mongoose';


export async function connectToDB() {
    try {
        mongoose.connect(process.env.MONGO_URL!);
        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log('Successfully connected to the database');
        });

        connection.on('error', () => {
            console.log('Error connecting to the database');
            process.exit();
        });

    } catch (error) {
        console.log('ERROR CONNECTING TO DB ::', error)
    }
}

