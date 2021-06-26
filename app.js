const config = require('config')
const mongoose = require('mongoose')
const WebSocket = require('ws')
const Phones = require('./models/Phones')




const PORT = config.get('port') || 5000
const CODES = config.get('codes')

async function start() {
    try {
        await mongoose.connect(config.get('mongoUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        })
        const server = new WebSocket.Server({ port: PORT })


        server.on('connection', ws => {
            console.log("новое подключение.")
            let omg = { codes: [...CODES] }
            ws.send(JSON.stringify(omg))
            ws.on('message', async mes => {
                let data = JSON.parse(mes)
                if (data.newPhoneNumber) {

                    try {
                        const phone = new Phones({
                            phone: Number(data.newPhoneNumber)
                        })
                        await phone.save()
                        const allPhones = await Phones.find({})
                        server.clients.forEach(client => client.send(JSON.stringify({ phones: allPhones })))
                    }
                    catch (err) {
                        if (err.code === 11000) {
                            ws.send(JSON.stringify({ error: "Такой номер уже есть" }))
                        }

                    }
                }
                if (data.clearDataBase) {
                    const cleaningList = await Phones.find({})
                    if (cleaningList) {
                        cleaningList.map(async (item, index) => {
                            await Phones.findByIdAndDelete(item._id, function (err, docs) {
                                if (err) { }
                            });
                            
                        })
                    }
                    const allPhones = await Phones.find({})
                        server.clients.forEach(client => client.send(JSON.stringify({ phones: allPhones })))
                }
            })
        })

    } catch (e) {
        console.log('Server Error', e.message)
        process.exit(1)

    }

}



start()

