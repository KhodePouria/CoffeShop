/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export declare enum GallerySortFieldEnum {
  Id = "id",
  Name = "name",
  CreatedAt = "createdAt",
  UpdatedAt = "updatedAt",
  BucketId = "bucketId",
}
export declare enum PosterSortFieldEnum {
  Id = "id",
  Code = "code",
  Title = "title",
  Location = "location",
  IsActive = "isActive",
  CreatedAt = "createdAt",
}
export declare enum ProductSortFieldEnum {
  Id = "id",
  Title = "title",
  Description = "description",
  ImageUrl = "imageUrl",
  Price = "price",
  CategoryId = "categoryId",
  IsActive = "isActive",
  CreatedAt = "createdAt",
}
export declare enum CategorySortFieldEnum {
  Id = "id",
  Name = "name",
  Slug = "slug",
  Icon = "icon",
  CreatedAt = "createdAt",
}
export interface IdInput {
  id: string;
}
export interface CreateCategoryInput {
  name: string;
  slug: string;
  icon?: string;
}
export interface ProductModel {
  id: string;
  title: string;
  description: string | null;
  imageUrl: string | null;
  price: number;
  categoryId: string;
  isActive: boolean;
  /** @format date-time */
  createdAt: string;
}
export interface CategoryModel {
  id: string;
  name: string;
  slug: string;
  icon: string | null;
  products: ProductModel[];
  /** @format date-time */
  createdAt: string;
}
export interface ReadCategoryWhereData {
  id?: string;
  name?: string;
  slug?: string;
  icon?: string;
  /** @format date-time */
  startDate?: string;
  /** @format date-time */
  endDate?: string;
}
export interface OffsetPaginationData {
  /**
   * @min 0
   * @default 10
   */
  take?: number;
  /**
   * @min 0
   * @default 0
   */
  skip?: number;
}
export interface OffsetPaginationTakeAll {
  takeAll: string;
}
export interface OffsetPaginationTakeAllData {
  /**
   * @min 0
   * @default 10
   */
  take?: number;
  /**
   * @min 0
   * @default 0
   */
  skip?: number;
}
export interface ReadCategorySortByData {
  /** @default "createdAt" */
  field?: CategorySortFieldEnum;
  /** @default true */
  descending?: boolean;
}
export interface ReadCategoryInput {
  where?: ReadCategoryWhereData;
  pagination?: OffsetPaginationTakeAllData;
  sortBy?: ReadCategorySortByData;
}
export interface ReadCategoryOutput {
  data: CategoryModel[];
  count: number;
}
export interface UpdateCategoryData {
  name?: string;
  slug?: string;
  icon?: string;
}
export interface UpdateCategoryInput {
  data: UpdateCategoryData;
  where: IdInput;
}
export interface CreateProductInput {
  title: string;
  description?: string;
  imageUrl?: string;
  price: number;
  categoryId: string;
  isActive: boolean;
}
export interface ReadProductWhereData {
  id?: string;
  title?: string;
  description?: string;
  imageUrl?: string;
  price?: number;
  categoryId?: string;
  isActive?: boolean;
  /** @format date-time */
  startDate?: string;
  /** @format date-time */
  endDate?: string;
}
export interface ReadProductSortByData {
  /** @default "createdAt" */
  field?: ProductSortFieldEnum;
  /** @default true */
  descending?: boolean;
}
export interface ReadProductInput {
  where?: ReadProductWhereData;
  pagination?: OffsetPaginationTakeAllData;
  sortBy?: ReadProductSortByData;
}
export interface ReadProductOutput {
  data: ProductModel[];
  count: number;
}
export interface UpdateProductData {
  title?: string;
  description?: string;
  imageUrl?: string;
  price?: number;
  categoryId?: string;
  isActive?: boolean;
}
export interface UpdateProductInput {
  data: UpdateProductData;
  where: IdInput;
}
export interface CreatePosterInput {
  code: string;
  title?: string;
  location?: string;
  isActive: boolean;
}
export interface PosterModel {
  id: string;
  code: string;
  title: string | null;
  location: string | null;
  isActive: boolean;
  /** @format date-time */
  createdAt: string;
}
export interface ReadPosterWhereData {
  id?: string;
  code?: string;
  title?: string;
  location?: string;
  isActive?: boolean;
  /** @format date-time */
  startDate?: string;
  /** @format date-time */
  endDate?: string;
}
export interface ReadPosterSortByData {
  /** @default "createdAt" */
  field?: PosterSortFieldEnum;
  /** @default true */
  descending?: boolean;
}
export interface ReadPosterInput {
  where?: ReadPosterWhereData;
  pagination?: OffsetPaginationTakeAllData;
  sortBy?: ReadPosterSortByData;
}
export interface ReadPosterOutput {
  data: PosterModel[];
  count: number;
}
export interface UpdatePosterData {
  code?: string;
  title?: string;
  location?: string;
  isActive?: boolean;
}
export interface UpdatePosterInput {
  data: UpdatePosterData;
  where: IdInput;
}
export interface LoginInput {
  username: string;
  password: string;
}
export interface UserModel {
  id: string;
  username: string;
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  updatedAt: string;
}
export interface TokenModel {
  token: string;
  me: UserModel;
}
export interface UploadImageInput {
  /** @format binary */
  image: File;
}
export interface UploadImageOutput {
  success: boolean;
}
export interface ReadGallerySortByData {
  /** @default "updatedAt" */
  field?: GallerySortFieldEnum;
  /** @default true */
  descending?: boolean;
}
export interface ReadImageInput {
  pagination?: OffsetPaginationTakeAllData;
  sortBy?: ReadGallerySortByData;
}
export interface ObjectMetadata {
  id: string;
  fieldname: string | null;
  originalname: string | null;
  encoding: string | null;
  mimetype: string | null;
  /** @format int64 */
  size: number | null;
  destination: string | null;
  filename: string | null;
  path: string | null;
  features: object;
  objectId: string;
}
export interface ObjectModel {
  id: string;
  bucketId: string;
  name: string | null;
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  updatedAt: string;
  metadata: ObjectMetadata | null;
}
export interface ReadImageOutput {
  data: ObjectModel[];
  count: number;
}
export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;
export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}
export type RequestParams = Omit<
  FullRequestParams,
  "body" | "method" | "query" | "path"
>;
export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}
export interface HttpResponse<D extends unknown, E extends unknown = unknown>
  extends Response {
  data: D;
  error: E;
}
type CancelToken = Symbol | string | number;
export declare enum ContentType {
  Json = "application/json",
  JsonApi = "application/vnd.api+json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}
export declare class HttpClient<SecurityDataType = unknown> {
  baseUrl: string;
  private securityData;
  private securityWorker?;
  private abortControllers;
  private customFetch;
  private baseApiParams;
  constructor(apiConfig?: ApiConfig<SecurityDataType>);
  setSecurityData: (data: SecurityDataType | null) => void;
  protected encodeQueryParam(key: string, value: any): string;
  protected addQueryParam(query: QueryParamsType, key: string): string;
  protected addArrayQueryParam(query: QueryParamsType, key: string): any;
  protected toQueryString(rawQuery?: QueryParamsType): string;
  protected addQueryParams(rawQuery?: QueryParamsType): string;
  private contentFormatters;
  protected mergeRequestParams(
    params1: RequestParams,
    params2?: RequestParams,
  ): RequestParams;
  protected createAbortSignal: (
    cancelToken: CancelToken,
  ) => AbortSignal | undefined;
  abortRequest: (cancelToken: CancelToken) => void;
  request: <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams) => Promise<HttpResponse<T, E>>;
}
/**
 * @title Swagger APIs
 * @version 1.0
 * @contact
 *
 * The Swagger APIs description
 */
export declare class Api<
  SecurityDataType extends unknown,
> extends HttpClient<SecurityDataType> {
  serve: {
    /**
     * No description
     *
     * @tags Serve
     * @name GetFile
     * @request POST:/serve/getFile
     */
    getFile: (
      data: IdInput,
      params?: RequestParams,
    ) => Promise<HttpResponse<any, File>>;
  };
  category: {
    /**
     * No description
     *
     * @tags Category
     * @name CreateCategory
     * @request POST:/category/createCategory
     */
    createCategory: (
      data: CreateCategoryInput,
      params?: RequestParams,
    ) => Promise<HttpResponse<CategoryModel, any>>;
    /**
     * No description
     *
     * @tags Category
     * @name ReadCategory
     * @request POST:/category/readCategory
     */
    readCategory: (
      data: ReadCategoryInput,
      params?: RequestParams,
    ) => Promise<HttpResponse<ReadCategoryOutput, any>>;
    /**
     * No description
     *
     * @tags Category
     * @name UpdateCategory
     * @request POST:/category/updateCategory
     */
    updateCategory: (
      data: UpdateCategoryInput,
      params?: RequestParams,
    ) => Promise<HttpResponse<CategoryModel, any>>;
    /**
     * No description
     *
     * @tags Category
     * @name DeleteCategory
     * @request POST:/category/deleteCategory
     */
    deleteCategory: (
      data: IdInput,
      params?: RequestParams,
    ) => Promise<HttpResponse<CategoryModel, any>>;
  };
  product: {
    /**
     * No description
     *
     * @tags Product
     * @name CreateProduct
     * @request POST:/product/createProduct
     */
    createProduct: (
      data: CreateProductInput,
      params?: RequestParams,
    ) => Promise<HttpResponse<ProductModel, any>>;
    /**
     * No description
     *
     * @tags Product
     * @name ReadProduct
     * @request POST:/product/readProduct
     */
    readProduct: (
      data: ReadProductInput,
      params?: RequestParams,
    ) => Promise<HttpResponse<ReadProductOutput, any>>;
    /**
     * No description
     *
     * @tags Product
     * @name UpdateProduct
     * @request POST:/product/updateProduct
     */
    updateProduct: (
      data: UpdateProductInput,
      params?: RequestParams,
    ) => Promise<HttpResponse<ProductModel, any>>;
    /**
     * No description
     *
     * @tags Product
     * @name DeleteProduct
     * @request POST:/product/deleteProduct
     */
    deleteProduct: (
      data: IdInput,
      params?: RequestParams,
    ) => Promise<HttpResponse<ProductModel, any>>;
  };
  poster: {
    /**
     * No description
     *
     * @tags Poster
     * @name CreatePoster
     * @request POST:/poster/createPoster
     */
    createPoster: (
      data: CreatePosterInput,
      params?: RequestParams,
    ) => Promise<HttpResponse<PosterModel, any>>;
    /**
     * No description
     *
     * @tags Poster
     * @name ReadPoster
     * @request POST:/poster/readPoster
     */
    readPoster: (
      data: ReadPosterInput,
      params?: RequestParams,
    ) => Promise<HttpResponse<ReadPosterOutput, any>>;
    /**
     * No description
     *
     * @tags Poster
     * @name UpdatePoster
     * @request POST:/poster/updatePoster
     */
    updatePoster: (
      data: UpdatePosterInput,
      params?: RequestParams,
    ) => Promise<HttpResponse<PosterModel, any>>;
    /**
     * No description
     *
     * @tags Poster
     * @name DeletePoster
     * @request POST:/poster/deletePoster
     */
    deletePoster: (
      data: IdInput,
      params?: RequestParams,
    ) => Promise<HttpResponse<PosterModel, any>>;
  };
  user: {
    /**
     * No description
     *
     * @tags User
     * @name Login
     * @request POST:/user/login
     */
    login: (
      data: LoginInput,
      params?: RequestParams,
    ) => Promise<HttpResponse<TokenModel, any>>;
    /**
     * No description
     *
     * @tags User
     * @name Me
     * @request POST:/user/me
     */
    me: (params?: RequestParams) => Promise<HttpResponse<UserModel, any>>;
  };
  gallery: {
    /**
     * No description
     *
     * @tags Gallery
     * @name UploadImage
     * @request POST:/gallery/uploadImage
     */
    uploadImage: (
      data: UploadImageInput,
      params?: RequestParams,
    ) => Promise<HttpResponse<UploadImageOutput, any>>;
    /**
     * No description
     *
     * @tags Gallery
     * @name ReadImages
     * @request POST:/gallery/readImages
     */
    readImages: (
      data: ReadImageInput,
      params?: RequestParams,
    ) => Promise<HttpResponse<ReadImageOutput, any>>;
    /**
     * No description
     *
     * @tags Gallery
     * @name DeleteImage
     * @request POST:/gallery/deleteImage
     */
    deleteImage: (
      data: IdInput,
      params?: RequestParams,
    ) => Promise<HttpResponse<ObjectModel, any>>;
  };
}
export {};
