//declarations
const {generateMessage, generateLocationMessage} = require('./message');
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
describe('generateLocationMessage',() =>{
    it('should generate correct location object', () =>{
        let param = {
            from:'Rudra',
            latitude: 17.4012623, 
            longitude: 78.3355395,
        }
        let message = generateLocationMessage(param.from, param.latitude, param.longitude);
        expect(message.createdAt).toBeGreaterThan(0);
        expect(message).toHaveProperty('url');
        expect(message.url).toEqual('https://www.google.com/maps/?q=17.4012623,78.3355395');
        
    });
});