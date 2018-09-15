# long-polling-node
A long polling server that I will improve as I learn Node.JS

### What is long polling ?
There are many ways of dynamically receiving messages. The most "obvious" one is probably Request-Response (also called short polling).
With this method, the client (browser), sends requests to the server on a regular basis. After each request is sent and each response is received, the client waits for some time before it sends another request.
It is the simplest way to receive messages dynamically, but it has two major drawbacks : 1) it sends lots of requests if the time between requests is short. 2) the message is not received instantly.

Another way of doing it is by using long polling. Using this method, the client sends the request to the server but the server delays responding if it doesn't have a response. So the server holds the request until there is new data or until request timeout. When timeout occurs of when data is sent back, the client immediately sends another request. The benefit of this method is that the data is received instantly. The drawback is that it is very server consuming and it is more complex to program.