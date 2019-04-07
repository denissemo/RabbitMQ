$(function () {
    const connection = new WebSocket("ws://localhost:8080");


    connection.onerror = (error) => {
        console.log(`WebSocket error: ${error}`)
    };

    connection.onmessage = (e) => {
        console.log(e.data);
        $("#messages").append(`<p>${e.data}</p>`);
    };

});
