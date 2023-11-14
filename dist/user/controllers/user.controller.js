"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_service_1 = require("../services/user.service");
const http_response_1 = require("../../shared/response/http.response");
class UserController {
    constructor(userService = new user_service_1.UserService(), httpResponse = new http_response_1.HttpResponse()) {
        this.userService = userService;
        this.httpResponse = httpResponse;
    }
    getUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield this.userService.findAllUser();
                if (users.length === 0) {
                    return this.httpResponse.NotFound(res, "No existe el datos");
                }
                // this.httpResponse.Ok(res, users);
                res.render("users", { users });
            }
            catch (e) {
                return this.httpResponse.Error(res, e);
            }
        });
    }
    getUserById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { id } = req.query;
            id = (id === null || id === void 0 ? void 0 : id.toString()) || "";
            try {
                const data = yield this.userService.findUserById(id);
                if (!data) {
                    return this.httpResponse.NotFound(res, "No existe datos");
                }
                // return this.httpResponse.Ok(res, data);
                return res.render("edit", {
                    user: data,
                });
            }
            catch (e) {
                console.error(e);
                return this.httpResponse.Error(res, e);
            }
        });
    }
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.userService.createUser(req.body);
                // return this.httpResponse.Ok(res, data);
                res.render("index");
            }
            catch (e) {
                return this.httpResponse.Error(res, e);
            }
        });
    }
    search(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { search } = req.query;
            search = (search === null || search === void 0 ? void 0 : search.toString()) || "";
            try {
                const users = yield this.userService.search(search);
                res.render("search", {
                    users: users,
                    search: search
                });
            }
            catch (err) {
                res.render("message", {
                    message: `Erro ao buscar usuário:`
                });
            }
        });
    }
    updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // const { id } = req.params;
            const { id } = req.body;
            try {
                const data = yield this.userService.updateUser(id, req.body);
                if (!data.affected) {
                    return this.httpResponse.NotFound(res, "Error al actualizar");
                }
                return this.httpResponse.Ok(res, data);
            }
            catch (e) {
                return this.httpResponse.Error(res, e);
            }
        });
    }
    deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // const { id } = req.params;
            const { id } = req.body;
            try {
                const data = yield this.userService.deleteUser(id);
                if (!data.affected) {
                    return this.httpResponse.NotFound(res, "Error al eliminar");
                }
                // return this.httpResponse.Ok(res, data);
                res.render("index");
            }
            catch (e) {
                return this.httpResponse.Error(res, e);
            }
        });
    }
}
exports.UserController = UserController;
