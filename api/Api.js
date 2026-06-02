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

export var GallerySortFieldEnum;
(function (GallerySortFieldEnum) {
  GallerySortFieldEnum["Id"] = "id";
  GallerySortFieldEnum["Name"] = "name";
  GallerySortFieldEnum["CreatedAt"] = "createdAt";
  GallerySortFieldEnum["UpdatedAt"] = "updatedAt";
  GallerySortFieldEnum["BucketId"] = "bucketId";
})(GallerySortFieldEnum || (GallerySortFieldEnum = {}));
export var PosterSortFieldEnum;
(function (PosterSortFieldEnum) {
  PosterSortFieldEnum["Id"] = "id";
  PosterSortFieldEnum["Code"] = "code";
  PosterSortFieldEnum["Title"] = "title";
  PosterSortFieldEnum["Location"] = "location";
  PosterSortFieldEnum["IsActive"] = "isActive";
  PosterSortFieldEnum["CreatedAt"] = "createdAt";
})(PosterSortFieldEnum || (PosterSortFieldEnum = {}));
export var ProductSortFieldEnum;
(function (ProductSortFieldEnum) {
  ProductSortFieldEnum["Id"] = "id";
  ProductSortFieldEnum["Title"] = "title";
  ProductSortFieldEnum["Description"] = "description";
  ProductSortFieldEnum["ImageUrl"] = "imageUrl";
  ProductSortFieldEnum["Price"] = "price";
  ProductSortFieldEnum["CategoryId"] = "categoryId";
  ProductSortFieldEnum["IsActive"] = "isActive";
  ProductSortFieldEnum["CreatedAt"] = "createdAt";
})(ProductSortFieldEnum || (ProductSortFieldEnum = {}));
export var CategorySortFieldEnum;
(function (CategorySortFieldEnum) {
  CategorySortFieldEnum["Id"] = "id";
  CategorySortFieldEnum["Name"] = "name";
  CategorySortFieldEnum["Slug"] = "slug";
  CategorySortFieldEnum["Icon"] = "icon";
  CategorySortFieldEnum["CreatedAt"] = "createdAt";
})(CategorySortFieldEnum || (CategorySortFieldEnum = {}));
export var ContentType;
(function (ContentType) {
  ContentType["Json"] = "application/json";
  ContentType["JsonApi"] = "application/vnd.api+json";
  ContentType["FormData"] = "multipart/form-data";
  ContentType["UrlEncoded"] = "application/x-www-form-urlencoded";
  ContentType["Text"] = "text/plain";
})(ContentType || (ContentType = {}));
export class HttpClient {
  baseUrl = "";
  securityData = null;
  securityWorker;
  abortControllers = new Map();
  customFetch = (...fetchParams) => fetch(...fetchParams);
  baseApiParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };
  constructor(apiConfig = {}) {
    Object.assign(this, apiConfig);
  }
  setSecurityData = (data) => {
    this.securityData = data;
  };
  encodeQueryParam(key, value) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
  }
  addQueryParam(query, key) {
    return this.encodeQueryParam(key, query[key]);
  }
  addArrayQueryParam(query, key) {
    const value = query[key];
    return value.map((v) => this.encodeQueryParam(key, v)).join("&");
  }
  toQueryString(rawQuery) {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter(
      (key) => "undefined" !== typeof query[key],
    );
    return keys
      .map((key) =>
        Array.isArray(query[key])
          ? this.addArrayQueryParam(query, key)
          : this.addQueryParam(query, key),
      )
      .join("&");
  }
  addQueryParams(rawQuery) {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }
  contentFormatters = {
    [ContentType.Json]: (input) =>
      input !== null && (typeof input === "object" || typeof input === "string")
        ? JSON.stringify(input)
        : input,
    [ContentType.JsonApi]: (input) =>
      input !== null && (typeof input === "object" || typeof input === "string")
        ? JSON.stringify(input)
        : input,
    [ContentType.Text]: (input) =>
      input !== null && typeof input !== "string"
        ? JSON.stringify(input)
        : input,
    [ContentType.FormData]: (input) => {
      if (input instanceof FormData) {
        return input;
      }
      return Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === "object" && property !== null
              ? JSON.stringify(property)
              : `${property}`,
        );
        return formData;
      }, new FormData());
    },
    [ContentType.UrlEncoded]: (input) => this.toQueryString(input),
  };
  mergeRequestParams(params1, params2) {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }
  createAbortSignal = (cancelToken) => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }
    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };
  abortRequest = (cancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);
    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };
  request = async ({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }) => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;
    return this.customFetch(
      `${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`,
      {
        ...requestParams,
        headers: {
          ...(requestParams.headers || {}),
          ...(type && type !== ContentType.FormData
            ? { "Content-Type": type }
            : {}),
        },
        signal:
          (cancelToken
            ? this.createAbortSignal(cancelToken)
            : requestParams.signal) || null,
        body:
          typeof body === "undefined" || body === null
            ? null
            : payloadFormatter(body),
      },
    ).then(async (response) => {
      const r = response;
      r.data = null;
      r.error = null;
      const responseToParse = responseFormat ? response.clone() : response;
      const data = !responseFormat
        ? r
        : await responseToParse[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });
      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }
      if (!response.ok) throw data;
      return data;
    });
  };
}
/**
 * @title Swagger APIs
 * @version 1.0
 * @contact
 *
 * The Swagger APIs description
 */
export class Api extends HttpClient {
  serve = {
    /**
     * No description
     *
     * @tags Serve
     * @name GetFile
     * @request GET:/serve/{id}
     */
    getFile: (id, params = {}) =>
      this.request({
        path: `/serve/${id}`,
        method: "GET",
        ...params,
      }),
  };
  category = {
    /**
     * No description
     *
     * @tags Category
     * @name CreateCategory
     * @request POST:/category/createCategory
     */
    createCategory: (data, params = {}) =>
      this.request({
        path: `/category/createCategory`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
    /**
     * No description
     *
     * @tags Category
     * @name ReadCategory
     * @request POST:/category/readCategory
     */
    readCategory: (data, params = {}) =>
      this.request({
        path: `/category/readCategory`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
    /**
     * No description
     *
     * @tags Category
     * @name UpdateCategory
     * @request POST:/category/updateCategory
     */
    updateCategory: (data, params = {}) =>
      this.request({
        path: `/category/updateCategory`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
    /**
     * No description
     *
     * @tags Category
     * @name DeleteCategory
     * @request POST:/category/deleteCategory
     */
    deleteCategory: (data, params = {}) =>
      this.request({
        path: `/category/deleteCategory`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  product = {
    /**
     * No description
     *
     * @tags Product
     * @name CreateProduct
     * @request POST:/product/createProduct
     */
    createProduct: (data, params = {}) =>
      this.request({
        path: `/product/createProduct`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
    /**
     * No description
     *
     * @tags Product
     * @name ReadProduct
     * @request POST:/product/readProduct
     */
    readProduct: (data, params = {}) =>
      this.request({
        path: `/product/readProduct`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
    /**
     * No description
     *
     * @tags Product
     * @name UpdateProduct
     * @request POST:/product/updateProduct
     */
    updateProduct: (data, params = {}) =>
      this.request({
        path: `/product/updateProduct`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
    /**
     * No description
     *
     * @tags Product
     * @name DeleteProduct
     * @request POST:/product/deleteProduct
     */
    deleteProduct: (data, params = {}) =>
      this.request({
        path: `/product/deleteProduct`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  poster = {
    /**
     * No description
     *
     * @tags Poster
     * @name CreatePoster
     * @request POST:/poster/createPoster
     */
    createPoster: (data, params = {}) =>
      this.request({
        path: `/poster/createPoster`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
    /**
     * No description
     *
     * @tags Poster
     * @name ReadPoster
     * @request POST:/poster/readPoster
     */
    readPoster: (data, params = {}) =>
      this.request({
        path: `/poster/readPoster`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
    /**
     * No description
     *
     * @tags Poster
     * @name UpdatePoster
     * @request POST:/poster/updatePoster
     */
    updatePoster: (data, params = {}) =>
      this.request({
        path: `/poster/updatePoster`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
    /**
     * No description
     *
     * @tags Poster
     * @name DeletePoster
     * @request POST:/poster/deletePoster
     */
    deletePoster: (data, params = {}) =>
      this.request({
        path: `/poster/deletePoster`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  user = {
    /**
     * No description
     *
     * @tags User
     * @name Login
     * @request POST:/user/login
     */
    login: (data, params = {}) =>
      this.request({
        path: `/user/login`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
    /**
     * No description
     *
     * @tags User
     * @name Me
     * @request POST:/user/me
     */
    me: (params = {}) =>
      this.request({
        path: `/user/me`,
        method: "POST",
        format: "json",
        ...params,
      }),
  };
  gallery = {
    /**
     * No description
     *
     * @tags Gallery
     * @name UploadImage
     * @request POST:/gallery/uploadImage
     */
    uploadImage: (data, params = {}) =>
      this.request({
        path: `/gallery/uploadImage`,
        method: "POST",
        body: data,
        type: ContentType.FormData,
        format: "json",
        ...params,
      }),
    /**
     * No description
     *
     * @tags Gallery
     * @name ReadImages
     * @request POST:/gallery/readImages
     */
    readImages: (data, params = {}) =>
      this.request({
        path: `/gallery/readImages`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
    /**
     * No description
     *
     * @tags Gallery
     * @name DeleteImage
     * @request POST:/gallery/deleteImage
     */
    deleteImage: (data, params = {}) =>
      this.request({
        path: `/gallery/deleteImage`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
}
