const forengToCelc = (t) =>{
   return (t - 32) * 5/9
}

const celcToForeng = (t) =>{
    return (t * 1.8) +32
}

module.exports = {
    forengToCelc,
    celcToForeng
}