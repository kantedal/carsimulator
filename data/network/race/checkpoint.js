/**
 * Created by filles-dator on 2016-03-20.
 */
///<reference path="../../../threejs/three.d.ts"/>
///<reference path="../../../renderer.ts"/>
///<reference path="../../environment/object_loader.ts"/>
///<reference path="../../environment/ground_plane.ts"/>
var Checkpoint = (function () {
    function Checkpoint(renderer, lastPoint, middlePoint, nextPoint) {
        var tangent = lastPoint.clone().sub(nextPoint);
        tangent.normalize();
        var normal = tangent.applyAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI / 2).multiplyScalar(10);
        this._target1 = middlePoint.clone().add(normal);
        this._target1.setY(GroundPlane.simplexNoise(this._target1));
        this._target2 = middlePoint.clone().add(normal.clone().multiplyScalar(-1));
        this._target2.setY(GroundPlane.simplexNoise(this._target2));
        this._targetMesh1 = ObjectLoader.checkpointMesh.clone();
        this._targetMesh1.position.copy(this._target1);
        renderer.scene.add(this._targetMesh1);
        this._targetMesh2 = ObjectLoader.checkpointMesh.clone();
        this._targetMesh2.position.copy(this._target2);
        renderer.scene.add(this._targetMesh2);
    }
    return Checkpoint;
})();
//# sourceMappingURL=checkpoint.js.map