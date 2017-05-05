import {TableService, createTableService, TableQuery} from "azure-storage";
import {get} from "config";


export class Tables {
    protected static TableService: TableService;

    constructor(){
        // If we haven't set the local table service, then set it.
        if (Tables.TableService === null){
            Tables.TableService = createTableService(
                get<string>("AZURE_STORAGE_ACCOUNT"),
                get<string>("AZURE_STORAGE_ACCOUNT_KEY")
            );
        }
    }


    runQuery(query: TableQuery, tableName: string,  auto: boolean = false, callback: (any)=>{}, ct?: TableService.TableContinuationToken, ents?: any[]) {
        let continuationToken: TableService.TableContinuationToken = null;
        let autoContinue = false;
        let entities = [];

        if (ct) {
            continuationToken = ct;
        }
        if (ents) {
            entities = ents;
        }
        if (auto) {
            autoContinue = auto;
        }

        //```javascript
        // //Test for continuing query v. fresh query:
        // if(continuationToken == null) {
        //     console.log(loggingPrefix + "running query");
        // } else {
        //     console.log(loggingPrefix + "... continuing query");
        // }
        //```
        Tables.TableService.queryEntities(tableName,
            query,
            continuationToken,
            function (error, results) {
                if (error) {
                    callback(error);
                } else {
                    entities = entities.concat(results.entries);
                    if (results.continuationToken && autoContinue) {

                        //Call this process again...
                        runQuery({
                            query: query,
                            table: table,
                            continuationToken: continuationToken,
                            entities: entities,
                            autoContinue: autoContinue,
                        }, callback);
                    } else {
                        callback(null, entities);
                    }
                }
            });
    };

}