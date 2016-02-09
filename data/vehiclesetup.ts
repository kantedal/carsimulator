/**
 * Created by filles-dator on 2016-02-08.
 */
///<reference path="../renderer.ts"/>
///<reference path="./parts/wheel.ts"/>
///<reference path="./ground_plane.ts"/>
///<reference path="./parts/motor.ts"/>
///<reference path="./parts/spring.ts"/>
///<reference path="./parts/steering.ts"/>
///<reference path="./vehicle.ts"/>

class VehicleSetup {
    private _renderer : Renderer;
    private _vehicle : Vehicle;
    private _wheels:Wheel[];
    private _springs:Spring[];
    private _motor:Motor;
    private _steering:Steering;

    constructor(renderer : Renderer, vehicle : Vehicle){
        this._renderer = renderer;
        this._vehicle = vehicle;

        window.addEventListener( 'keydown', this.onKeyDown, false );
        window.addEventListener( 'keyup', this.onKeyUp, false );
    }

    public update(time:number, delta:number):void{
        if(this._wheels){
            for(var i=0; i<this._wheels.length; i++){
                this._wheels[i].update(time, delta);
            }
        }

        if(this._springs){
            for(var i=0; i<this._wheels.length; i++){
                this._springs[i].update(time, delta);
            }
        }

        if(this._motor){
            this._motor.update(time, delta);
        }

        if(this._steering){
            this._steering.update(time, delta);
        }
    }

    private pressedKeys = [];
    onKeyDown = (e) => {
        if (e) {

            this.pressedKeys[e.keyCode] = true;

            if(this.pressedKeys[37]) {
                if(this._steering)
                    this._steering.steeringAcceleration += 100;
            }

            if(this.pressedKeys[38]) {
                if(this._motor)
                    this._motor.isAccelerating = true;
            }

            if(this.pressedKeys[39]) {
                if(this._steering)
                    this._steering.steeringAcceleration -= 100;
            }

            if(this.pressedKeys[40]) {
            }
        }
    }
    onKeyUp = (e) => {
        if (e) {
            this.pressedKeys[e.keyCode] = false;
            switch (e.which) {
                case 37: //Left
                    break;
                case 38: //Up
                    if(this._motor)
                        this._motor.isAccelerating = false;
                    break;
                case 39: //Right
                    break;
                case 40: //Down
                    break;
            }
        }
    }

    get steering():Steering {
        return this._steering;
    }

    set steering(value:Steering) {
        this._steering = value;
    }

    get motor():Motor {
        return this._motor;
    }

    set motor(value:Motor) {
        this._motor = value;
    }

    get springs():Spring[] {
        return this._springs;
    }

    set springs(value:Array) {
        this._springs = value;
    }

    get wheels():Wheel[] {
        return this._wheels;
    }

    set wheels(value:Array) {
        this._wheels = value;
    }

    get vehicle():Vehicle {
        return this._vehicle;
    }

    set vehicle(value:Vehicle) {
        this._vehicle = value;
    }

    get renderer():Renderer {
        return this._renderer;
    }

    set renderer(value:Renderer) {
        this._renderer = value;
    }
}