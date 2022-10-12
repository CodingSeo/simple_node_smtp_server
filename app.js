const SMTPServer = require("smtp-server").SMTPServer;
const parser = require("mailparser").simpleParser

const app = new SMTPServer({
    onConnect(session, callback) {
        console.log(`onConnect ID : ${session.id} remote address : ${session.remoteAddress}`);
        return callback();
    },
    onMailFrom(address, session, callback) {
        console.log(`onMailFrom ${address.address}`);
        return callback(); // Accept the address
    },
    onRcptTo(address, session, callback) {
        console.log(`onRcptTo ${address.address}`);
        return callback(); // Accept the address
    },
    onData(stream, session, callback) {
        parser(stream, {}, (err, parsed) => {
            if (err)
                console.log("Error:", err)

            console.log(`onData`)
            // console.log(parsed.attachments)
            // console.log(parsed.headers)
            // console.log(parsed.html)
            callback();
        })
    },
    onClose(session) {
        console.log(`onClose ID : ${session.id}`);
    },
    secure: false,
    disabledCommands: ['AUTH']
});

app.listen(8484)