import Express from "express";

const app = Express();

app.listen(3340, () => console.log('Server Running on Port 3340'));
app.use(Express.json());

app.get('/', (req, res) => {
  res.send('Hello World');
});