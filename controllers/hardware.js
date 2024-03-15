const {exec} = require ('child_process')

//controller of the basicInfo.py that returns the hardware data from devices
function Info (router_ip, username, password) {
    
    //execute the Hardware.py using 'exec' from 'child_process' 
    exec(`py ../Python/Hardware/HardwareInfo.py ${router_ip} ${username} ${password}` , (error, stdout) => {
        if (error) {
            console.error(`exec error: ${error}`)
            return
        }
          
        const jsonData = JSON.parse(stdout)
        return jsonData
    })

}

module.exports = Info