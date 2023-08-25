import fastify from "fastify";

// creates the application
const app = fastify();

// creates a GET route
app.get("/hello", () => {
  return `Hello World`
})

app.listen({
  port: 3333
}).then(() => {
  console.log(`Server running!`)
})