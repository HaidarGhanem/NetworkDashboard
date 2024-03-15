const {exec} = require('child_process')

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

function RIP1 (router_ip, username, password , networks) {
    
    //execute the Hardware.py using 'exec' from 'child_process' 
    exec(`py ../Python/Protocols/RipTwo.py ${router_ip} ${username} ${password} ${networks}` , (error, stdout) => {
        if (error) {
            console.error(`exec error: ${error}`)
            return
        }
          
        const jsonData = JSON.parse(stdout)
        return jsonData
    })

}

function RIP2 (router_ip, username, password , networks) {
    
    //execute the Hardware.py using 'exec' from 'child_process' 
    exec(`py ../Python/Protocols/RipTwo.py ${router_ip} ${username} ${password} ${networks}` , (error, stdout) => {
        if (error) {
            console.error(`exec error: ${error}`)
            return
        }
          
        const jsonData = JSON.parse(stdout)
        return jsonData
    })

}

function EIGRP (router_ip, username, password , networks, as_number) {
    
    //execute the Hardware.py using 'exec' from 'child_process' 
    exec(`py ../Python/Protocols/Eigrp.py ${router_ip} ${username} ${password} ${networks} ${as_number}` , (error, stdout) => {
        if (error) {
            console.error(`exec error: ${error}`)
            return
        }
          
        const jsonData = JSON.parse(stdout)
        return jsonData
    })

}

function OSPF (router_ip, username, password , networks, interfaces , area) {
    
    //execute the Hardware.py using 'exec' from 'child_process' 
    exec(`py ../Python/Protocols/Eigrp.py ${router_ip} ${username} ${password} ${networks} ${interfaces} ${area}` , (error, stdout) => {
        if (error) {
            console.error(`exec error: ${error}`)
            return
        }
          
        const jsonData = JSON.parse(stdout)
        return jsonData
    })

}

module.exports = {Interfaces , RIP1, RIP2 , EIGRP , OSPF , InterfacesStatus}