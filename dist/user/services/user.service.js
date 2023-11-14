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
exports.UserService = void 0;
const base_service_1 = require("../../config/base.service");
const user_entity_1 = require("../entities/user.entity");
class UserService extends base_service_1.BaseService {
    constructor() {
        super(user_entity_1.UserEntity);
    }
    findAllUser() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.execRepository).find();
        });
    }
    findUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.execRepository).findOneBy({ id });
        });
    }
    search(search) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!search) {
                throw new Error("Por favor preencha o campo de busca");
            }
            const user = (yield this.execRepository)
                .createQueryBuilder()
                .where("username like :search", { search: `%${search}%` })
                .orWhere("email like :search", { search: `%${search}%` })
                .orWhere("name like :search", { search: `%${search}%` })
                .orWhere("city like :search", { search: `%${search}%` })
                .orWhere("province like :search", { search: `%${search}%` })
                .getMany();
            return user;
        });
    }
    createUser(body) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.execRepository).save(body);
        });
    }
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.execRepository).delete({ id });
        });
    }
    updateUser(id, infoUpdate) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.execRepository).update(id, infoUpdate);
        });
    }
}
exports.UserService = UserService;
