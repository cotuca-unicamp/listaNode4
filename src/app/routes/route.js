module.exports = (app) => {
    app.use((req, res, next) => {res.header("Access-Control-Allow-Origin", "*");
        next();
    });

    const obj = require("../controllers/controller");
    const objController = new obj();

    app.get("/", (req, res) => {res.render("home")});
    app.get("/form", (req, res) => {res.render("form")});
    app.get("/clients", (objController.showTab()));

    app.post('/add', objController.add());
    app.post('/remove/:id', objController.remove());
    app.post('/edit/:id', objController.showEdit());
    app.post('/update/:id', objController.update());

};