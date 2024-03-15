const {exec} = require('child_process')

//controller of the connectivity section
function Connectivity (first_ip , second_ip , username, password) {
    
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

//controller of the checking configurations
function Configurations (ip , username, password){

    //execute the Checkconfiguration.py using 'exec' from 'child_process'
    exec(`py ../Python/TroubleShooting/CheckConfigs.py ${ip} ${username} ${password}` , (error , stdout)=>{
        if (error) {
            console.error(`exec error: ${error}`)
            return
        }
          
        const jsonData = JSON.parse(stdout)
        return jsonData
    })
}

//controller of the interfaces.py that returns the interfaces of device
function Interfaces (router_ip, username, password) {
    
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

function InterfacesStatus (router_ip, username, password, interface, action) {
    
    //execute the Hardware.py using 'exec' from 'child_process' 
    exec(`py ../Python/TroubleShooting/Interfaces.py ${router_ip} ${username} ${password} ${interface} ${action}` , (error, stdout) => {
        if (error) {
            console.error(`exec error: ${error}`)
            return
        }
          
        const jsonData = JSON.parse(stdout)
        return jsonData
    })

}

//controller of the DHCP.py that applies dhcp config
function DHCP (router_ip, interfaces, network) {
    
    //execute the Dhcp.py using 'exec' from 'child_process' 
    exec(`py ../Python/TroubleShooting/Dhcp.py ${router_ip} ${interfaces} ${network}` , (error, stdout) => {
        if (error) {
            console.error(`exec error: ${error}`)
            return
        }
          
        const jsonData = JSON.parse(stdout)
        return jsonData
    })

}

module.exports = {Connectivity , Configurations , Interfaces , DHCP , InterfacesStatus}