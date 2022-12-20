if (typeof define !== 'function') { var define = require('amdefine')(module); }
define(['./lib/freeze','./lib/BitStream','./lib/Stream','./lib/Huffman','./lib/RangeCoder','./lib/Lzp3'],
function(freeze,BitStream,Stream,Huffman,RangeCoder,Lzp3) {
    'use strict';
    return freeze({
        version: "0.0.1",
        // APIs
        BitStream: BitStream,
        Stream: Stream,
        // models and coder
        //Context1Model: Context1Model,
        //DefSumModel: DefSumModel,
        //FenwickModel: FenwickModel,
        //MTFModel: MTFModel,
        //NoModel: NoModel,
        Huffman: Huffman,
        RangeCoder: RangeCoder,
        // compression methods
        Lzp3: Lzp3,
    });
});
