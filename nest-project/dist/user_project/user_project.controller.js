"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserProjectController = void 0;
const common_1 = require("@nestjs/common");
const user_project_service_1 = require("./user_project.service");
const create_user_project_dto_1 = require("./dto/create-user_project.dto");
const update_user_project_dto_1 = require("./dto/update-user_project.dto");
let UserProjectController = class UserProjectController {
    userProjectService;
    constructor(userProjectService) {
        this.userProjectService = userProjectService;
    }
    create(createUserProjectDto) {
        return this.userProjectService.create(createUserProjectDto);
    }
    findAll() {
        return this.userProjectService.findAll();
    }
    findOne(project_id, user_id) {
        return this.userProjectService.findOne(+project_id, +user_id);
    }
    findProject(user_id) {
        return this.userProjectService.findProject(+user_id);
    }
    update(project_id, user_id, updateDto) {
        return this.userProjectService.update(+project_id, +user_id, updateDto);
    }
    remove(project_id, user_id) {
        return this.userProjectService.remove(+project_id, +user_id);
    }
};
exports.UserProjectController = UserProjectController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_project_dto_1.CreateUserProjectDto]),
    __metadata("design:returntype", void 0)
], UserProjectController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserProjectController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':user_id/:project_id'),
    __param(0, (0, common_1.Param)('project_id')),
    __param(1, (0, common_1.Param)('user_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], UserProjectController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)(':user_id'),
    __param(0, (0, common_1.Param)('user_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserProjectController.prototype, "findProject", null);
__decorate([
    (0, common_1.Patch)(':user_id/:project_id'),
    __param(0, (0, common_1.Param)('project_id')),
    __param(1, (0, common_1.Param)('user_id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, update_user_project_dto_1.UpdateUserProjectDto]),
    __metadata("design:returntype", void 0)
], UserProjectController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':user_id/:project_id'),
    __param(0, (0, common_1.Param)('project_id')),
    __param(1, (0, common_1.Param)('user_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], UserProjectController.prototype, "remove", null);
exports.UserProjectController = UserProjectController = __decorate([
    (0, common_1.Controller)('user-project'),
    __metadata("design:paramtypes", [user_project_service_1.UserProjectService])
], UserProjectController);
//# sourceMappingURL=user_project.controller.js.map