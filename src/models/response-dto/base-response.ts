export class BaseResponse {

    constructor(
        public body: any,
        public status: boolean,
        public message: string,
    ) { }
}