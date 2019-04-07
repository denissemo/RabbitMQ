const amqp = require("amqplib/callback_api");

amqp.connect("amqp://localhost", function (err, conn) {
    if (err) console.error(err);
    conn.createChannel(function (err, ch) {
        if (err) console.error(err);
        let queue = "message";
        let messages = ["Msg 1", "Msg 2", "Msg 3", "Msg 4", "Msg 5", "Msg 6", "Msg 7", "Msg 8", "Msg 9", "Msg 10"];
        // if durable false, messages will be lost when server restart
        ch.assertQueue(queue, {durable: false});
        for (let msg of messages) {
            ch.sendToQueue(queue, Buffer.from(msg));
            console.log(` [x] send '${msg}'`);
        }
        ch.close(function () {
            conn.close();
        });
    })
});
