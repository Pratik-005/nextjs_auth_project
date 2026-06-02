import mongoose from 'mongoose';


export async function connectToDB() {
    try {
        mongoose.connect(process.env.MONGO_URL!);
        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log('CONNECTED TO DB');
        });

        connection.on('error', () => {
            console.log('ERROR COONECTIONG TO DB');
            process.exit();
        });

    } catch (error) {
        console.log('ERROR CONNECTING TO DB ::', error)
    }
}

