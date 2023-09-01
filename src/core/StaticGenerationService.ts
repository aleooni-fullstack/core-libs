export interface StaticGenerationService<IRequest, IResponse> {
  execute(request: IRequest): Promise<IResponse> | IResponse;
}
