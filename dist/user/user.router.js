"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRouter = void 0;
const router_1 = require("../shared/router/router");
const user_controller_1 = require("./controllers/user.controller");
class UserRouter extends router_1.BaseRouter {
    constructor() {
        super(user_controller_1.UserController);
    }
    routes() {
        this.router.get("/", (req, res) => {
            res.render("index");
        });
        this.router.get("/users", (req, res) => this.controller.getUsers(req, res));
        this.router.get("/user", (req, res) => this.controller.getUserById(req, res));
        this.router.get("/add", (req, res) => { res.render("add"); });
        this.router.post("/createUser", (req, res) => this.controller.createUser(req, res));
        this.router.get("/search", (req, res) => { this.controller.search(req, res); });
        this.router.post("/updateUser", (req, res) => this.controller.updateUser(req, res));
        this.router.post("/deleteUser", (req, res) => this.controller.deleteUser(req, res));
    }
}
exports.UserRouter = UserRouter;
