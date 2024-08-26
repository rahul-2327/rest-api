const express = require("express");
const fs = require("fs");
const app = express();

const users = require("./MOCK_DATA.json");

app.use(express.urlencoded({ extended: false }));

app.get("/users", (req, res) => {
  const html = `
    <ul>
    ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
    </ul>
  `;
  return res.send(html);
});

app.get("/api/users", (req, res) => {
  return res.json(users);
});

app.post("/api/user", (req, res) => {
  const body = req.body;
  users.push({ ...body, id: users.length + 1 });
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    return res.json({ status: "success" , id:users.length});
  });
});

app
  .route("/api/users/:id")
  .get((req, res) => {
    const id = Number(req.params.id);
    // let result = {};
    // users.forEach((user) => {
    //   if (user.id == id) {
    //     result = user;
    //     return ;
    //   }
    // });
    // console.log(result);
    const result = users.find((user) => user.id === id);
    return res.json(result);
  })
  .patch((req, res) => {
    
  })
  .delete((req, res) => {});

const PORT = 3000;
app.listen(PORT, () => console.log(`server started ${PORT}`));
