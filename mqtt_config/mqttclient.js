const mqtt = require('mqtt')
export const options = {
	clean :true,
	connectTimeout :4000,
	clientId: 'testclient',
	username: 'admin',
	password: 'admin',
}
export const url = 'ws://120.78.161.243:8083/mqtt'
export const list = ['sd','se']