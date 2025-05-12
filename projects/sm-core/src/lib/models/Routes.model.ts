export class RoutesModel {
    public url: string = "";
    public httpOperation: "get" | "post" | "put" | "delete" = "get";
    public headers?: [key: string, value: string][];
    public noAuth?: boolean = false;
}
