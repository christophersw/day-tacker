import {TableUtilities} from "azure-storage";

export interface ITableEntity {
    PartitionKey: any,
    RowKey: any
}

export interface IActivityRow extends ITableEntity {
    Name: any;
    Color: any;
}

export interface IBlockRow extends ITableEntity {
    Activity: any;
}

export interface ITable {
    
}