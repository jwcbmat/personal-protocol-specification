'use strict'
const fs = require('fs')
const bencode = require('bencode')

const archiveSpecification = bencode.decode(fs.readFileSync('puppy.torrent'))
console.log(archiveSpecification.announce.toString('utf8'))