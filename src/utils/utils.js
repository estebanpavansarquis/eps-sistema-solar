const utils = require('./utils')

exports.areAligned = (posArr) => {
    // Formula: (x2-x1)/(x3-x2) == (y2-y1)/(y3-y2)
    if(((posArr[1][0] - posArr[0][0]) / (posArr[2][0] - posArr[1][0]) == (posArr[1][1] - posArr[0][1]) / (posArr[2][1] - posArr[1][1])) 
    ||  (posArr[0][0] == posArr[1][0] && posArr[0][0] == posArr[2][0]) 
    ||  (posArr[0][1] == posArr[1][1] && posArr[0][1] == posArr[2][1])
    ) return true
    else return false
}

exports.areAlignedWithCenter = (posArr) => {
    //If the three points are aligned and 2 of them are aligned with the center
    var px = posArr[0][0]
    var py = posArr[0][1]
    if(utils.areAligned(posArr)){
        posArr[0][0]=0
        posArr[0][1]=0
        if(utils.areAligned(posArr)){
            posArr[0][0]=px
            posArr[0][1]=py
            return true
        }
        posArr[0][0]=px
        posArr[0][1]=py
    }
    return false
}

exports.containCenter = (a,b,c) => {
    //If P lies inside the triangle, then the area of pbc + apc + abp must be equal to the area of abc. p is the center (sun)
    var abc = Math.abs(( a[0]*(b[1] - c[1]) + b[0]*(c[1] - a[1]) + c[0]*(a[1]-b[1]))/2)
    var pbc = Math.abs(( b[0]*(c[1]-0) + c[0]*(0-b[1]))/2)
    var apc = Math.abs(( a[0]*(0-c[1]) + c[0]*(a[1]-0))/2)
    var abp = Math.abs(( a[0]*(b[1]-0) + b[0]*(0-a[1]))/2)
    return abc == pbc+apc+abp ? abc : 0
}

exports.calculateArea = (vertices) => {
    //Shoelace formula is a mathematical algorithm to determine the area of a simple polygon whose vertices are described by their Cartesian coordinates in the plane.
    numberOfVertices = 3
    sum1 = 0
    sum2 = 0
    for (let i = 0; i < numberOfVertices-1; i++) {
        sum1 = sum1 + vertices[i][0] *  vertices[i+1][1]
        sum2 = sum2 + vertices[i][1] *  vertices[i+1][0]
    }
    sum1 = sum1 + vertices[numberOfVertices-1][0]*vertices[0][1]   
    sum2 = sum2 + vertices[0][0]*vertices[numberOfVertices-1][1]   
    return Math.abs(sum1 - sum2) / 2
}
