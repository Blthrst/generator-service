export interface IReportGenerator {
    /**
     * Resource from which get raw data.
     * @param resource URL of resource.
     * @returns file location.
     */
    generate(resourceUrl: string): Promise<string>
}