import { IActivity, IValidationResult } from "./interfaces";
import { TableUtilities } from "azure-storage";

export class Activity implements IActivity {

    public Id: string;
    public Name: string;
    public Color: string;

    constructor() { }

    validate(): IValidationResult {
        let results: IValidationResult = {
            isValid: true,
            message: null
        }

        return results;

    }

}