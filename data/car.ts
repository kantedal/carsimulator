/**
 * Created by filles-dator on 2016-02-08.
 */

///<reference path="./vehiclesetup.ts"/>
///<reference path="./vehicle.ts"/>

class Car extends VehicleSetup {

    constructor(renderer : Renderer, vehicle : Vehicle){
        super(renderer, vehicle);

        this.wheels = [new Wheel(renderer), new Wheel(renderer)];
        this.springs = [
            new Spring(renderer, this.vehicle, Math.PI/9),
            new Spring(renderer, this.vehicle, -Math.PI/9)
        ];
        this.motor = new Motor(20000, 100);
        this.steering = new Steering(Math.PI/2);

        this.setupWheels();
    }

    private setupWheels(){
        this.wheels[0].object.position.set(-5,0,0);
        this.wheels[0].connectSpring(this.springs[0]);
        this.wheels[0].connectMotor(this.motor);
        this.wheels[0].connectSteering(this.steering);

        this.wheels[1].object.position.set(5,0,0);
        this.wheels[1].connectSpring(this.springs[1]);
        this.wheels[1].connectMotor(this.motor);
        this.wheels[1].connectSteering(this.steering);
    }

}