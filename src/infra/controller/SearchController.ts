import { SearchABCTelefonos } from "../../application/SearchABCTelefonos";
import { AbstractController, IRequest, IResponse } from "../../interfaces/AbstractController";
import Http from "../../interfaces/Http";
import { Controller, Post } from "../decorate/HttpDecorate";

@Controller('/v1')
export class SearchController extends AbstractController {
    constructor(readonly http: Http) {
        super();
        this.start()
    }
    protected start(): void {
        this.search(this.req, this.res);
    }

    @Post('/search')
    public async search(req: IRequest, res: IResponse): Promise<void> {
        try {
            const address = req.body;
            const listPhone = await new SearchABCTelefonos('https://pt.abctelefonos.com/search').execute(address);
            res.send(listPhone);
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    }
}