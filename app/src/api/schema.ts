export namespace Schemas {
  // <Schemas>
  export type TokenResult = { token: string };
  export type StationDto = { id: number; name: string; image: string };
  export type TicketDto = { trainId: number; station: StationDto; name: string; issuedAt: string };
  export type TicketCreateDto = { trainId: number; stationId: number; name: string };
  export type TicketUpdateDto = Partial<{ trainId: number; stationId: number; name: string }>;
  export type TrainDto = { id: number; seats: number; departureAt: string; availableTickets: number };

  // </Schemas>
}

export namespace Endpoints {
  // <Endpoints>

  export type post_AuthController_getJWT = {
    method: "POST";
    path: "/auth";
    requestFormat: "json";
    parameters: never;
    response: Schemas.TokenResult;
  };
  export type get_StationController_getList = {
    method: "GET";
    path: "/station";
    requestFormat: "json";
    parameters: never;
    response: Array<Schemas.StationDto>;
  };
  export type post_TicketController_create = {
    method: "POST";
    path: "/ticket";
    requestFormat: "json";
    parameters: {
      body: Schemas.TicketCreateDto;
    };
    response: Schemas.TicketDto;
  };
  export type patch_TicketController_update = {
    method: "PATCH";
    path: "/ticket";
    requestFormat: "json";
    parameters: {
      path: { id: number };

      body: Schemas.TicketUpdateDto;
    };
    response: Schemas.TicketDto;
  };
  export type get_TicketController_getList = {
    method: "GET";
    path: "/ticket";
    requestFormat: "json";
    parameters: never;
    response: Array<Schemas.TicketDto>;
  };
  export type get_TrainController_getTrain = {
    method: "GET";
    path: "/train";
    requestFormat: "json";
    parameters: never;
    response: Schemas.TrainDto;
  };

  // </Endpoints>
}

// <EndpointByMethod>
export type EndpointByMethod = {
  post: {
    "/auth": Endpoints.post_AuthController_getJWT;
    "/ticket": Endpoints.post_TicketController_create;
  };
  get: {
    "/station": Endpoints.get_StationController_getList;
    "/ticket": Endpoints.get_TicketController_getList;
    "/train": Endpoints.get_TrainController_getTrain;
  };
  patch: {
    "/ticket": Endpoints.patch_TicketController_update;
  };
};

// </EndpointByMethod>

// <EndpointByMethod.Shorthands>
export type PostEndpoints = EndpointByMethod["post"];
export type GetEndpoints = EndpointByMethod["get"];
export type PatchEndpoints = EndpointByMethod["patch"];
export type AllEndpoints = EndpointByMethod[keyof EndpointByMethod];
// </EndpointByMethod.Shorthands>

// <ApiClientTypes>
export type EndpointParameters = {
  body?: unknown;
  query?: Record<string, unknown>;
  header?: Record<string, unknown>;
  path?: Record<string, unknown>;
};

export type MutationMethod = "post" | "put" | "patch" | "delete";
export type Method = "get" | "head" | MutationMethod;

type RequestFormat = "json" | "form-data" | "form-url" | "binary" | "text";

export type DefaultEndpoint = {
  parameters?: EndpointParameters | undefined;
  response: unknown;
};

export type Endpoint<TConfig extends DefaultEndpoint = DefaultEndpoint> = {
  operationId: string;
  method: Method;
  path: string;
  requestFormat: RequestFormat;
  parameters?: TConfig["parameters"];
  meta: {
    alias: string;
    hasParameters: boolean;
    areParametersRequired: boolean;
  };
  response: TConfig["response"];
};

type Fetcher = (
  method: Method,
  url: string,
  parameters?: EndpointParameters | undefined,
) => Promise<Endpoint["response"]>;

type RequiredKeys<T> = {
  [P in keyof T]-?: undefined extends T[P] ? never : P;
}[keyof T];

type MaybeOptionalArg<T> = RequiredKeys<T> extends never ? [config?: T] : [config: T];

// </ApiClientTypes>

// <ApiClient>
export class ApiClient {
  baseUrl: string = "";

  constructor(public fetcher: Fetcher) {}

  setBaseUrl(baseUrl: string) {
    this.baseUrl = baseUrl;
    return this;
  }

  // <ApiClient.post>
  post<Path extends keyof PostEndpoints, TEndpoint extends PostEndpoints[Path]>(
    path: Path,
    ...params: MaybeOptionalArg<TEndpoint["parameters"]>
  ): Promise<TEndpoint["response"]> {
    return this.fetcher("post", this.baseUrl + path, params[0]) as Promise<TEndpoint["response"]>;
  }
  // </ApiClient.post>

  // <ApiClient.get>
  get<Path extends keyof GetEndpoints, TEndpoint extends GetEndpoints[Path]>(
    path: Path,
    ...params: MaybeOptionalArg<TEndpoint["parameters"]>
  ): Promise<TEndpoint["response"]> {
    return this.fetcher("get", this.baseUrl + path, params[0]) as Promise<TEndpoint["response"]>;
  }
  // </ApiClient.get>

  // <ApiClient.patch>
  patch<Path extends keyof PatchEndpoints, TEndpoint extends PatchEndpoints[Path]>(
    path: Path,
    ...params: MaybeOptionalArg<TEndpoint["parameters"]>
  ): Promise<TEndpoint["response"]> {
    return this.fetcher("patch", this.baseUrl + path, params[0]) as Promise<TEndpoint["response"]>;
  }
  // </ApiClient.patch>
}

export function createApiClient(fetcher: Fetcher, baseUrl?: string) {
  return new ApiClient(fetcher).setBaseUrl(baseUrl ?? "");
}

/**
 Example usage:
 const api = createApiClient((method, url, params) =>
   fetch(url, { method, body: JSON.stringify(params) }).then((res) => res.json()),
 );
 api.get("/users").then((users) => console.log(users));
 api.post("/users", { body: { name: "John" } }).then((user) => console.log(user));
 api.put("/users/:id", { path: { id: 1 }, body: { name: "John" } }).then((user) => console.log(user));
*/

// </ApiClient
