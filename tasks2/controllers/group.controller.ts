import groupService from "../services/group.service";
import { Request, Response } from 'express';
import crypto from "crypto";
import {GroupModel} from "../types/group.model";

class GroupController {
    async postGroup(req: Request, res: Response): Promise<GroupModel | unknown> {
        const newGroup: GroupModel = {
            id: crypto.randomUUID(),
            name: req.body.name,
            permissions: req.body.permissions,
        }
        try {
            const group = await groupService.createGroup(newGroup);
            return  res.status(201).json(group)
        } catch (err) {
            console.log(`Cannot create Group ${err}`);
        }
    }

    async putGroup(req: Request, res: Response): Promise<GroupModel | unknown> {
        try {
            await groupService.updateGroup(req.query.id as string, req.body);
            const group = await groupService.getGroupById(req.query.id as string);
            return res.status(201).send(group);
        } catch (err) {
            console.log(`Cannot update Group ${err}`);
        }
    }

    async addUserToGroup(req: Request, res: Response): Promise<GroupModel | unknown> {
        try {
            const group = await groupService.addUserToGroup(
                req.query.id as string,
                req.body.id
            );
           return res.status(201).send(group);
        } catch (err) {
            console.log(`Cannot update Group ${err}`);
        }
    }

    async removeUsersFromGroup(req: Request, res: Response): Promise<GroupModel | unknown> {
        try {
            const message = groupService.removeUserFromGroup(
                req.query.id as string,
                req.body.id
            );
            return res.send(message);
        } catch (err) {
            console.log(`Cannot remove User from Group ${err}`);
        }
    }

    async getAllGroups(req: Request, res: Response): Promise<GroupModel | unknown> {
        try {
            const groups = await groupService.getAllGroups();
            return res.status(200).send(groups);
        } catch (err) {
            console.log(`Cannot remove User from Group ${err}`);
        }
    }

    async getGroupById(req: Request, res: Response): Promise<GroupModel | unknown> {
        const id = req.params?.id;
        try {
            const group = await groupService.getGroupById(id as string);
            return res.status(200).send(group);
        } catch (err) {
            console.log(`Cannot find Group ${err}`);
        }
    }

    async deleteGroup(req: Request, res: Response): Promise<GroupModel | unknown> {
        const id = req.query?.id;
        try {
            const group = await groupService.deleteGroupById(id as string);
            return res.send(group);
        } catch (err) {
            console.log(`Cannot find Group ${err}`);
        }
    }
}

export default new GroupController();
