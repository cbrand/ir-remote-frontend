/**
 * @fileoverview gRPC-Web generated client stub for remote
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck


import * as grpcWeb from 'grpc-web';

import * as definition_pb from './definition_pb';


export class remoteServiceClient {
  client_: grpcWeb.AbstractClientBase;
  hostname_: string;
  credentials_: null | { [index: string]: string; };
  options_: null | { [index: string]: any; };

  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; }) {
    if (!options) options = {};
    if (!credentials) credentials = {};
    options['format'] = 'text';

    this.client_ = new grpcWeb.GrpcWebClientBase(options);
    this.hostname_ = hostname;
    this.credentials_ = credentials;
    this.options_ = options;
  }

  methodInfogetRemote = new grpcWeb.AbstractClientBase.MethodInfo(
    definition_pb.Remote,
    (request: definition_pb.remoteQueryParams) => {
      return request.serializeBinary();
    },
    definition_pb.Remote.deserializeBinary
  );

  getRemote(
    request: definition_pb.remoteQueryParams,
    metadata: grpcWeb.Metadata | null): Promise<definition_pb.Remote>;

  getRemote(
    request: definition_pb.remoteQueryParams,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: definition_pb.Remote) => void): grpcWeb.ClientReadableStream<definition_pb.Remote>;

  getRemote(
    request: definition_pb.remoteQueryParams,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: definition_pb.Remote) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/remote.remoteService/getRemote',
        request,
        metadata || {},
        this.methodInfogetRemote,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/remote.remoteService/getRemote',
    request,
    metadata || {},
    this.methodInfogetRemote);
  }

  methodInfogetTheatersOf = new grpcWeb.AbstractClientBase.MethodInfo(
    definition_pb.TheatersResponse,
    (request: definition_pb.remoteQueryParams) => {
      return request.serializeBinary();
    },
    definition_pb.TheatersResponse.deserializeBinary
  );

  getTheatersOf(
    request: definition_pb.remoteQueryParams,
    metadata: grpcWeb.Metadata | null): Promise<definition_pb.TheatersResponse>;

  getTheatersOf(
    request: definition_pb.remoteQueryParams,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: definition_pb.TheatersResponse) => void): grpcWeb.ClientReadableStream<definition_pb.TheatersResponse>;

  getTheatersOf(
    request: definition_pb.remoteQueryParams,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: definition_pb.TheatersResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/remote.remoteService/getTheatersOf',
        request,
        metadata || {},
        this.methodInfogetTheatersOf,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/remote.remoteService/getTheatersOf',
    request,
    metadata || {},
    this.methodInfogetTheatersOf);
  }

  methodInfogetIscpStatusOf = new grpcWeb.AbstractClientBase.MethodInfo(
    definition_pb.IscpStatusResponse,
    (request: definition_pb.remoteQueryParams) => {
      return request.serializeBinary();
    },
    definition_pb.IscpStatusResponse.deserializeBinary
  );

  getIscpStatusOf(
    request: definition_pb.remoteQueryParams,
    metadata: grpcWeb.Metadata | null): Promise<definition_pb.IscpStatusResponse>;

  getIscpStatusOf(
    request: definition_pb.remoteQueryParams,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: definition_pb.IscpStatusResponse) => void): grpcWeb.ClientReadableStream<definition_pb.IscpStatusResponse>;

  getIscpStatusOf(
    request: definition_pb.remoteQueryParams,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: definition_pb.IscpStatusResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/remote.remoteService/getIscpStatusOf',
        request,
        metadata || {},
        this.methodInfogetIscpStatusOf,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/remote.remoteService/getIscpStatusOf',
    request,
    metadata || {},
    this.methodInfogetIscpStatusOf);
  }

  methodInfosetTheater = new grpcWeb.AbstractClientBase.MethodInfo(
    definition_pb.TheatersResponse,
    (request: definition_pb.setTheaterQueryParams) => {
      return request.serializeBinary();
    },
    definition_pb.TheatersResponse.deserializeBinary
  );

  setTheater(
    request: definition_pb.setTheaterQueryParams,
    metadata: grpcWeb.Metadata | null): Promise<definition_pb.TheatersResponse>;

  setTheater(
    request: definition_pb.setTheaterQueryParams,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: definition_pb.TheatersResponse) => void): grpcWeb.ClientReadableStream<definition_pb.TheatersResponse>;

  setTheater(
    request: definition_pb.setTheaterQueryParams,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: definition_pb.TheatersResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/remote.remoteService/setTheater',
        request,
        metadata || {},
        this.methodInfosetTheater,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/remote.remoteService/setTheater',
    request,
    metadata || {},
    this.methodInfosetTheater);
  }

  methodInforemoveTheater = new grpcWeb.AbstractClientBase.MethodInfo(
    definition_pb.TheatersResponse,
    (request: definition_pb.removeTheaterQueryParams) => {
      return request.serializeBinary();
    },
    definition_pb.TheatersResponse.deserializeBinary
  );

  removeTheater(
    request: definition_pb.removeTheaterQueryParams,
    metadata: grpcWeb.Metadata | null): Promise<definition_pb.TheatersResponse>;

  removeTheater(
    request: definition_pb.removeTheaterQueryParams,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: definition_pb.TheatersResponse) => void): grpcWeb.ClientReadableStream<definition_pb.TheatersResponse>;

  removeTheater(
    request: definition_pb.removeTheaterQueryParams,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: definition_pb.TheatersResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/remote.remoteService/removeTheater',
        request,
        metadata || {},
        this.methodInforemoveTheater,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/remote.remoteService/removeTheater',
    request,
    metadata || {},
    this.methodInforemoveTheater);
  }

  methodInfogetStatus = new grpcWeb.AbstractClientBase.MethodInfo(
    definition_pb.RemoteStatus,
    (request: definition_pb.remoteQueryParams) => {
      return request.serializeBinary();
    },
    definition_pb.RemoteStatus.deserializeBinary
  );

  getStatus(
    request: definition_pb.remoteQueryParams,
    metadata: grpcWeb.Metadata | null): Promise<definition_pb.RemoteStatus>;

  getStatus(
    request: definition_pb.remoteQueryParams,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: definition_pb.RemoteStatus) => void): grpcWeb.ClientReadableStream<definition_pb.RemoteStatus>;

  getStatus(
    request: definition_pb.remoteQueryParams,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: definition_pb.RemoteStatus) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/remote.remoteService/getStatus',
        request,
        metadata || {},
        this.methodInfogetStatus,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/remote.remoteService/getStatus',
    request,
    metadata || {},
    this.methodInfogetStatus);
  }

  methodInfoplayScene = new grpcWeb.AbstractClientBase.MethodInfo(
    definition_pb.PlayResponse,
    (request: definition_pb.playSceneParams) => {
      return request.serializeBinary();
    },
    definition_pb.PlayResponse.deserializeBinary
  );

  playScene(
    request: definition_pb.playSceneParams,
    metadata: grpcWeb.Metadata | null): Promise<definition_pb.PlayResponse>;

  playScene(
    request: definition_pb.playSceneParams,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: definition_pb.PlayResponse) => void): grpcWeb.ClientReadableStream<definition_pb.PlayResponse>;

  playScene(
    request: definition_pb.playSceneParams,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: definition_pb.PlayResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/remote.remoteService/playScene',
        request,
        metadata || {},
        this.methodInfoplayScene,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/remote.remoteService/playScene',
    request,
    metadata || {},
    this.methodInfoplayScene);
  }

  methodInfoplayCommand = new grpcWeb.AbstractClientBase.MethodInfo(
    definition_pb.PlayResponse,
    (request: definition_pb.playCommandParams) => {
      return request.serializeBinary();
    },
    definition_pb.PlayResponse.deserializeBinary
  );

  playCommand(
    request: definition_pb.playCommandParams,
    metadata: grpcWeb.Metadata | null): Promise<definition_pb.PlayResponse>;

  playCommand(
    request: definition_pb.playCommandParams,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: definition_pb.PlayResponse) => void): grpcWeb.ClientReadableStream<definition_pb.PlayResponse>;

  playCommand(
    request: definition_pb.playCommandParams,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: definition_pb.PlayResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/remote.remoteService/playCommand',
        request,
        metadata || {},
        this.methodInfoplayCommand,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/remote.remoteService/playCommand',
    request,
    metadata || {},
    this.methodInfoplayCommand);
  }

}

