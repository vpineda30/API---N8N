export interface IServiceDto<inputdto, outputdto> {
    execute(input: inputdto): Promise<outputdto>;
}