'use strict'

const dgram = require('dgram')
const Buffer = require('buffer').Buffer
const urlParse = require('url').parse
const crypto = require('crypto') // require the built-in crypto module to help us create a random number for our buffer

module.exports.getPeers = (archiveSpecification, cb) => {
    const socket = dgram.createSocket('udp4')
    const url = archiveSpecification.announce.toString('utf8')

    // Send connect request
    udpSend(socket, buildConnReq(), url)

    socket.on('message', res => {
        if (respType(res) === 'connect') {
            // receive and parse connect response
            const connResp = parseConnResp(res)
            // send announce request
            const announceReq = buildAnnounceReq(connResp.connectionId)
            udpSend(socket, announceReq, url)
        } else if (respType(res) === 'announce') {
            // parse announce response
            const announceResp = parseAnnounceResp(res)
            // pass peers to callback
            cb(announceResp.peers)
        }
    })
}

function udpSend(socket, message, rawUrl, cb = () => { }) {
    const url = urlParse(rawUrl)
    socket.send(message, 0, message.length, url.port, url.host, cb)
}

function respType(resp) {
    //
}

function buildConnReq() {
    const buf = Buffer.alloc(16) // create a new empty buffer with a size of 16 bytes since we already know that the entire message should be 16 bytes long.

    // connection id
    buf.writeUInt32BE(0x417, 0) // 3
    buf.writeUint32BE(0x27101980, 4)

    // action 
    buf.writeUInt32BE(0, 8)

    //transaction id
    crypto.randomBytes(4).copy(buf, 12) // 5

    return buf
}

function parseConnResp(resp) {
    return {
        action: resp.readUInt32BE(0),
        transactionId: resp.readUInt32BE(4),
        connectionId: resp.slice(8)
    }
}

function buildAnnounceReq(connId) {
    //
}

function parseAnnounceResp(resp) {
    //
}