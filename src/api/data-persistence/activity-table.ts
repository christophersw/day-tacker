import { IActivityRow } from "./interfaces";
import { TableUtilities, TableQuery } from "azure-storage";
import { get } from "config";
import { Tables } from "./table";
import * as Q from "q";
import { getLogger } from "log4js";
import { IActivity } from "../data-models/interfaces";

let logger = getLogger("ActivityTable");

export class ActivityTable extends Tables {
    static Initialized: boolean = false;
    static TableName: string;

    constructor() {
        super();
        logger.debug("initialized: %s", ActivityTable.Initialized);
    }

    public initialize(): Q.IPromise<boolean> {
        return Q.Promise((resolve, reject) => {
            if (!ActivityTable.Initialized) {
                Tables.TableService.createTableIfNotExists(ActivityTable.TableName, (error, result, response) => {
                    if (error) {
                        reject(error);
                    } else {
                        ActivityTable.Initialized = true;
                        logger.debug("initialized: %s", ActivityTable.Initialized);
                        resolve(true);
                    }
                });
            } else {
                logger.debug("initialized: %s", ActivityTable.Initialized);
                resolve(true);
            }
        })
    }

    public save(userId:string, activity: IActivity): Q.IPromise<boolean> {
        return Q.Promise<boolean>((resolve, reject) => {
            let tableEntity = ActivityTable.adaptToTableEntity(userId, activity);

            Tables.TableService.insertOrReplaceEntity(ActivityTable.TableName, tableEntity, (error, result, response) => {
                if(error){
                    reject(error);
                } else {
                    resolve (true);
                }
            });
        });
    }

    public findAll(userId: string): Q.IPromise<IActivity[]> {
        return Q.Promise<boolean>((resolve, reject) => {

            let query = new TableQuery()
            .where('PartitionKey eq ?', userId);


        
        });

    }

    private static adaptToTableEntity(userId:string, activity: IActivity): IActivityRow {
        return {
            PartitionKey: TableUtilities.entityGenerator.String(userId),
            RowKey: TableUtilities.entityGenerator.String(activity.Id),
            Name: TableUtilities.entityGenerator.String(activity.Name),
            Color: TableUtilities.entityGenerator.String(activity.Color)            
        }
    }
}