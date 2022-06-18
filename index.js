'use strict'
const fs = require('fs')
const bencode = require('bencode')
const tracker = require('./tracker')

const archiveSpecification = bencode.decode(fs.readFileSync('puppy.torrent'))

tracker.getPeers(archiveSpecification, peers => {
    console.log('list of peers: ', peers)
})
