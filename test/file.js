var assert = require("assert");
var compressjs = require('../');
var fs = require('fs');

var testRoundTrip = function(cmp, level, filename) {
    var referenceData = fs.readFileSync('test/'+filename+'.ref');
    var data = cmp.compressFile(referenceData, null, level);
    // convert to buffer
    data = new Buffer.from(data);
    // round trip
    var data2 = cmp.decompressFile(data);
    // convert to buffer
    data2 = new Buffer.from(data2);
    assert.ok(referenceData.toString('hex') === data2.toString('hex'));
};

// test round-trip encode/decode for all compression variants
ALL_LEVELS=[null, 1, 2, 3, 4, 5, 6, 7, 8, 9];
[
 {name:"lzp3(ish)", cmp:compressjs.Lzp3, levels:[null]},
].forEach(function(compressor) {
     describe(compressor.name+" round-trip encode/decode", function() {
         compressor.levels.forEach(function(level) {
             var desc = (level===null) ? 'default' : ('-'+level);
             describe("compression level "+desc, function() {
                 ['bib', 'book1', 'book2', 'geo', 'news', 'obj1', 'obj2',
                  'paper1', 'paper2', 'pic', 'progc', 'progl', 'progp',
                   'trans'].forEach(function(f) {
                     it('should correctly round-trip '+f, function() {
                         this.timeout(0); // no timeout -- can take a while.
                         testRoundTrip(compressor.cmp, level, f);
                     });
                 });
             });
         });
     });
 });
