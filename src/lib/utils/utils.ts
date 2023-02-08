export function utilsReduce(inputArray: any){
    const perChunk = 8 // items per chunk


    return inputArray.reduce((resultArray: any, item: any, index: any) => {
    const chunkIndex = Math.floor(index/perChunk)

    if(!resultArray[chunkIndex]) {
        resultArray[chunkIndex] = [] // start a new chunk
    }

    resultArray[chunkIndex].push(item)

    return resultArray
    }, [])

}

function toRad(Value: any) {
    return Value * Math.PI / 180;
}

export function utilsCalcCrow(lat1:any, lon1:any, lat2:any, lon2:any) {

      var R = 6371; // km
      var dLat = toRad(lat2-lat1);
      var dLon = toRad(lon2-lon1);
      var lat1:any = toRad(lat1);
      var lat2:any = toRad(lat2);

      var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
      var d = R * c;
      return d;

}
