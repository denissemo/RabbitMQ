const amqp = require("amqplib/callback_api");

const WebSocket = require('ws');

const wss = new WebSocket.Server({port: 8080});


amqp.connect("amqp://localhost", function (err, conn) {
    if (err) console.error(err);
    conn.createChannel(function (err, ch) {
        if (err) console.error(err);
        let queue = "message";
        ch.assertQueue(queue, {durable: false}, function (err, success) {
            if (err) console.error(err);
            console.log(" [*] Waiting for messages. To exit press CTRL+C");
            ch.consume(queue, function (msg) {
                console.log(` [x] message receive '${msg.content.toString()}'`);
                // send messages to WebSocket
                wss.on("connection", function connection(ws) {
                    ws.on("message", function incoming(message) {
                        console.log(` [w] received '${message}'`);
                    });

                    ws.send(msg.content.toString());
                });

            }, {noAck: true});
        });

    })
});
