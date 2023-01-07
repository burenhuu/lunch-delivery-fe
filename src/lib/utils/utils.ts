export function utilsReduce(inputArray: any){
    const perChunk = 12 // items per chunk    


    return inputArray.reduce((resultArray: any, item: any, index: any) => { 
    const chunkIndex = Math.floor(index/perChunk)

    if(!resultArray[chunkIndex]) {
        resultArray[chunkIndex] = [] // start a new chunk
    }

    resultArray[chunkIndex].push(item)

    return resultArray
    }, [])

}