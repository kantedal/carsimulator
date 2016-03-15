/**
 * Created by filles-dator on 2016-03-11.
 */
/// <reference path="../../math/peerjs.d.ts" />
/// <reference path="../../math/RTCPeerConnection.d.ts" />
///<reference path="../../threejs/three.d.ts"/>
///<reference path="../../renderer.ts"/>
///<reference path="../vehicle.ts"/>
///<reference path="../environment/object_loader.ts"/>

class Socket {
    private _renderer : Renderer;
    private _peer : PeerJs.Peer;
    private _connection : any;
    private _isConnected : boolean;
    private _connectedVehicles : Vehicle[];
    private _objectLoader: ObjectLoader;

    constructor(renderer:Renderer, objectLoader:ObjectLoader){
        this._renderer = renderer;
        this._objectLoader = objectLoader;
        this._isConnected = false;
        this._connectedVehicles = [];

        var self = this;
        this._peer = new Peer({
            key: 'qyykahhwaql7hkt9'
        });

        this._peer.on('open', function(id) {
            console.log('My peer ID is: ' + id);
        });

        this._peer.on("connection", function(conn) {
            self._isConnected = true;
            self._connection = conn;
            self._connectedVehicles.push(new Vehicle(self._renderer));

            self._connection.on('data', function(data) {
                self.recievedData(data);
            });

            // Send messages
            self._connection.send('Hello!');
        });


        this._peer.on('data', function(data) {
            console.log("data");
        });

    }

    public connectToPeer(id){
        this._connection = this._peer.connect(id);

        var self = this;
        this._connection.on('open', function() {
            self._isConnected = true;

            var newVehicle = new Vehicle(self._renderer);
            newVehicle.vehicleSetup.wheels[0].attatchMesh(this._objectLoader.wheelMesh.clone());
            newVehicle.vehicleSetup.wheels[1].attatchMesh(this._objectLoader.wheelMesh.clone());
            newVehicle.vehicleSetup.wheels[2].attatchMesh(this._objectLoader.wheelMesh.clone());
            newVehicle.vehicleSetup.wheels[3].attatchMesh(this._objectLoader.wheelMesh.clone());
            newVehicle.vehicleSetup.vehicleBody.attatchMesh(this._objectLoader.carMesh.clone());

            self._connectedVehicles.push(newVehicle);

            // Receive messages
            self._connection.on('data', function(data) {
                self.recievedData(data);
            });

            // Send messages
            self._connection.send('Hello!');
        });
    }

    public update(vehicle:Vehicle){


        //var wheel1 = vehicle.vehicleSetup.wheels[0].object.position.y;
        //var wheel2 = vehicle.vehicleSetup.wheels[1].object.position.y;
        //var wheel3 = vehicle.vehicleSetup.wheels[2].object.position.y;
        //var wheel4 = vehicle.vehicleSetup.wheels[3].object.position.y;


        if(this._isConnected){
            var pos = vehicle.vehicleModel.object.position;
            var rot = vehicle.vehicleModel.object.rotation;

            var rel_pos = vehicle.vehicleSetup.vehicleBody.object.position;
            var rel_rot = vehicle.vehicleSetup.vehicleBody.object.rotation;

            this._connection.send({
                car_data: {
                    x: pos.x,
                    y: pos.y,
                    z: pos.z,
                    rx: rot.x,
                    ry: rot.y,
                    rz: rot.z,
                    rel_y: rel_pos.y,
                    rel_rx: rel_rot.x,
                    rel_ry: rel_rot.y,
                    rel_rz: rel_rot.z,
                }
            });
        }
    }

    private recievedData(data){
        this._connectedVehicles[0].setFromNetworkData(data);
    }
}