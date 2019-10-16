class Planet {
    constructor(name, civilization, angularSpeed, distanceToSun ){
        this.name = name
        this.civilization = civilization
        this.angularSpeed = angularSpeed
        this.distanceToSun = distanceToSun
        this.xCord = 0
        this.yCord = 0
        this.angle = 0
    }

    calculatePlanetXYCords(day){
        if (this.angularSpeed < 0) this.angle = (day * this.angularSpeed ) % 360 + 360
        else this.angle = (day * this.angularSpeed) % 360
        if (this.angle == 360) this.angle = 0
        
        this.xCord = Math.round(Math.cos(this.angle* Math.PI / 180) * this.distanceToSun)
        this.yCord = Math.round(Math.sin(this.angle* Math.PI / 180) * this.distanceToSun)
    }
}

module.exports = Planet;