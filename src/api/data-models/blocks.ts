import {IActivity, IBlock, IValidationResult} from "./interfaces";
import {TableUtilities} from "azure-storage"

export class Block implements IBlock {
    public Year: number;
    public Month: number
    public Day: number;
    public Block: number;
    public Activity: IActivity;

    constructor() {
        return this;
    }

    validate(): IValidationResult {
        let results: IValidationResult = {
            isValid: true,
            message: null
        }

        if (this.Year < 2017 || this.Year > 2050) {
            results.isValid = false;
            results.message = "Invalid year.";
            return results;
        }

        if (this.Month < 1 || this.Month > 12) {
            results.isValid = false;
            results.message = "Invalid month.";
            return results;
        }

        if (this.Day < 1 || this.Day > 31) {
            results.isValid = false;
            results.message = "Invalid day.";
            return results;
        }

        if (this.Block < 1 || this.Block > 288) {
            results.isValid = false;
            results.message = "Invalid block.";
            return results;
        }

        return results;

    }

    // getTableEntity(userId: string): IBlockRow {
    //     let tableEntity: IBlockRow = {
    //         PartitionKey: TableUtilities.entityGenerator.String(userId),
    //         RowKey: TableUtilities.entityGenerator.String(this.Year + "-" + 
    //                 this.Month + "-" + 
    //                 this.Day + "-" +
    //                 this.Block),
    //         Activity: TableUtilities.entityGenerator.Int32(this.Activity.id)
    //     };

    //     return tableEntity;
    // }

}