
protobuf:
	mkdir -p src/protocol
	protoc definition.proto --js_out=import_style=commonjs:src/protocol \
						    --grpc-web_out=import_style=typescript,mode=grpcwebtext:src/protocol
	echo "/* eslint-disable */" | cat - src/protocol/definition_pb.js > src/protocol/definition_pb.temp.js
	mv src/protocol/definition_pb.temp.js src/protocol/definition_pb.js
