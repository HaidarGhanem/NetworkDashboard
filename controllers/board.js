const { exec } = require('child_process')

//controller of the basic.py that returns the data from the gns3 3080/v2/projects
function basicGNS () {
    
    //execute the basic.py using 'exec' from 'child_process' , it doesnt need params
    exec(`py ../Python/basic.py` , (error, stdout) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return;
        }
          
        const jsonData = JSON.parse(stdout);
        return jsonData
    })

}

//controller of the basicInfo.py that returns the hardware data from devices
function basicInfo (router_ip, username, password) {
    
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

//controller of the interfaces.py that returns the interfaces of device
function basicInterfaces (router_ip, username, password) {
    
    //execute the Hardware.py using 'exec' from 'child_process' 
    exec(`py ../Python/TroubleShooting/Interfaces.py ${router_ip} ${username} ${password}` , (error, stdout) => {
        if (error) {
            console.error(`exec error: ${error}`)
            return
        }
          
        const jsonData = JSON.parse(stdout)
        return jsonData
    })

}

//controller of the connectivity section
function basicConnectivity (first_ip , second_ip , username, password) {
    
    //execute the Connectivity.py using 'exec' from 'child_process' 
    exec(`py ../Python/TroubleShooting/Interfaces.py ${first_ip} ${second_ip} ${username} ${password}` , (error, stdout) => {
        if (error) {
            console.error(`exec error: ${error}`)
            return
        }
          
        const jsonData = JSON.parse(stdout)
        return jsonData
    })

}


module.exports = {basicGNS , basicInfo , basicInterfaces , basicConnectivity}