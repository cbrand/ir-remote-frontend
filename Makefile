
protobuf:
	mkdir -p src/protocol
	protoc definition.proto --js_out=import_style=commonjs:src/protocol \
						    --grpc-web_out=import_style=typescript,mode=grpcwebtext:src/protocol
