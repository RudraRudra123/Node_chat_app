//declarations
const {generateMessage} = require('./message');
const expect = require('expect');

describe('generateMessage', ()=> {
    it('should generate correct message object', ()=>{
        //store res in variable
        //assert from match
        //assert text match
        //assert createdAt is number
        let from ='Suhas';
        let text = 'this is some message';
        let message = generateMessage(from, text);

        expect(message.createdAt).toBeGreaterThan(0);
       //for identifying keys one by one 
        expect(message).toHaveProperty('from');
        // to validate the existance of set of keys
        expect(Object.keys(message)).toEqual(expect.arrayContaining(['from', 'text']));

    });

});