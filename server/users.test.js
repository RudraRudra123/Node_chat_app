const expect = require('expect');
const {Users} = require('./users');

describe('Users', () =>{
    let users;
    beforeEach(() =>{
        users = new Users();
        users.users = [{
            id: '1',
            name: 'Mike',
            room: 'Office room'
        }, {
                id: '2',
                name: 'Jen',
                room: 'Chat room'
        }, {
                id: '3',
                name: 'Mike',
                room: 'Chat room'
            }];
    });
    it('should add new user', () =>{
        let users = new Users();
        let user = {
            id: '123',
            name: 'Rudra',
            room:'Chat room'
        }
        let resUser= users.addUser(user.id, user.name, user.room);
        expect(users.users).toEqual([user]);
    });
    it('should return names for chat room', () =>{
        let userList = users.getUserList('Chat room');
        expect(userList).toEqual(['Jen', 'Mike']);

    });
    it('should find user', () => {
        let userId = '2';
        let user = users.getUser(userId);
        expect(user.id).toEqual(userId);
        expect(user.id).not.toBe('3');
    });
    it('should not find user', () => {
        let userId = '10';
        let user = users.getUser(userId);
        expect(user).not.toBeDefined();
    }); 
    it('should remove a user', () => {
        let userId = '1';
        //let user = users.getUser(userId); 
        let user = users.removeUser(userId);
        expect(user.id).toBe(userId);
    }); 
    it("should not remove user if doesn't exists", () => {
        let userId = '1000';
        let user = users.removeUser(userId); 
        expect(user).not.toBeDefined();
    }); 
})