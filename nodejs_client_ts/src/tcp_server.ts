import net from 'net'
import {
  readMsgStore,
  writeMsgStore,
  getTimeLocaleString,
} from './utils/messageStore'

export const server = net.createServer((socket:any) => {
  console.log(getTimeLocaleString() , ' New client connected')
  let messageStore = readMsgStore()
  let data = Buffer.from('')

  socket.on('data', (data:any, chunk:any) => {
    console.log(`${getTimeLocaleString()} Received data: ${data}`)
    const dataJson = JSON.parse(data)
    messageStore = writeMsgStore(messageStore, dataJson)
    // data = Buffer.concat([data, chunk])
    // console.log(`Received data: ${data}`)
  })

  socket.on('end', (data:any) => {
    console.log(`${getTimeLocaleString()} Received end: ${data}`)
  })

  socket.on('close', () => {
    console.log(getTimeLocaleString() + ' Client disconnected')
  })
})

const port = 19099

server.listen(port, () => {
  console.log(getTimeLocaleString() + ` Server listening on port ${port}`)
})
