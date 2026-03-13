import express from "express";
import {Error} from "mongoose";
import {ILinkMutation} from "../types";
import Link from "../models/Link";

const linksRouter = express.Router();

linksRouter.get('/', async (_req, res) => {
    try {
        const links = await Link.find();
        return res.send(links);
    } catch (e) {
        return res.sendStatus(500)
    }

});

linksRouter.get('/:shortUrl', async (req, res) => {
    const {shortUrl} = req.params;

    try {
        const foundShortLink = await Link.findOne({shortUrl})
        if (!foundShortLink) {
            return res.status(404).send({error: 'Not found shortUrl'});
        }

        return res.status(301).redirect(foundShortLink.originalUrl)

    } catch (e) {
        res.sendStatus(500)
    }

});


linksRouter.post('/', async (req, res, next) => {

    const generateShortUrl = (length = 6) => {
        const arrayString = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += arrayString.charAt(Math.floor(Math.random() * arrayString.length));
        }
        return result;
    }

    const newLink: ILinkMutation = {
        shortUrl: generateShortUrl(),
        originalUrl: req.body.originalUrl,
    }

    try {

        const link = new Link(newLink);
        await link.save();
        return res.send(link);

    } catch (error) {
        if (error instanceof Error.ValidationError) {
            res.status(400).send(error);
            return;
        }
        next(error)

    }


});

export default linksRouter;