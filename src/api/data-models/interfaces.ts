export interface IValidationResult {
    isValid: boolean,
    message: string
}

export interface IModel {
    validate(): IValidationResult;
    //getTableEntity(userId: string): ITableEntity;
}

export interface IBlock extends IModel {
    Year: number;
    Month: number
    Day: number;
    Block: number;
    Activity: IActivity;
}

export interface IActivity extends IModel {
    Id: string;
    Name: string;
    Color: string;
}