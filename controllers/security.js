const {exec} = require('child_process')

function Accesses (device_ip, username, password, enable_password, allowed_ips, banned_ips) {
    
    //execute the Hardware.py using 'exec' from 'child_process' 
    exec(`py ../Python/Security/Accesses.py ${device_ip} ${username} ${password} ${enable_password} ${allowed_ips} ${banned_ips}` , (error, stdout) => {
        if (error) {
            console.error(`exec error: ${error}`)
            return
        }
          
        const jsonData = JSON.parse(stdout)
        return jsonData
    })

}

function ApplySecurity (device_ip, username, password, enable_password) {
    
    //execute the Hardware.py using 'exec' from 'child_process' 
    exec(`py ../Python/Security/ApplySecurity.py ${device_ip} ${username} ${password} ${enable_password}` , (error, stdout) => {
        if (error) {
            console.error(`exec error: ${error}`)
            return
        }
          
        const jsonData = JSON.parse(stdout)
        return jsonData
    })

}

function ConfigAudit (device_ip, username, password, enable_password) {
    
    //execute the Hardware.py using 'exec' from 'child_process' 
    exec(`py ../Python/Security/ConfigAudit.py ${device_ip} ${username} ${password} ${enable_password}` , (error, stdout) => {
        if (error) {
            console.error(`exec error: ${error}`)
            return
        }
          
        const jsonData = JSON.parse(stdout)
        return jsonData
    })

}

module.exports = {Accesses , ApplySecurity , ConfigAudit}