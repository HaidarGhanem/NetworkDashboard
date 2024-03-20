const { exec } = require('child_process');

// Controller function to manage accesses
function Accesses(device_ip, username, password, enable_password, allowed_ips, banned_ips) {
    return new Promise((resolve, reject) => {
        exec(`py C:\\Users\\haidar\\Desktop\\server\\Python\\Security\\Accesses.py ${device_ip} ${username} ${password} ${enable_password} ${allowed_ips} ${banned_ips}`, (error, stdout) => {
            if (error) {
                console.error(`exec error: ${error}`)
                reject(error)
            } else {
                try {
                    const jsonData = JSON.parse(stdout)
                    resolve(jsonData)
                } catch (parseError) {
                    console.error(`Error parsing JSON: ${parseError}`)
                    reject(parseError)
                }
            }
        })
    })
}

// Controller function to apply security settings
function ApplySecurity(device_ip, username, password, enable_password) {
    return new Promise((resolve, reject) => {
        exec(`py C:\\Users\\haidar\\Desktop\\server\\Python\\Security\\ApplySecurity.py ${device_ip} ${username} ${password} ${enable_password}`, (error, stdout) => {
            if (error) {
                console.error(`exec error: ${error}`)
                reject(error)
            } else {
                try {
                    const jsonData = JSON.parse(stdout)
                    resolve(jsonData)
                } catch (parseError) {
                    console.error(`Error parsing JSON: ${parseError}`)
                    reject(parseError)
                }
            }
        })
    })
}

// Controller function to audit device configuration for security
function ConfigAudit(device_ip, username, password, enable_password) {
    return new Promise((resolve, reject) => {
        exec(`py C:\\Users\\haidar\\Desktop\\server\\Python\\Security\\ConfigAudit.py ${device_ip} ${username} ${password} ${enable_password}`, (error, stdout) => {
            if (error) {
                console.error(`exec error: ${error}`)
                reject(error)
            } else {
                try {
                    const jsonData = JSON.parse(stdout)
                    resolve(jsonData)
                } catch (parseError) {
                    console.error(`Error parsing JSON: ${parseError}`)
                    reject(parseError)
                }
            }
        })
    })
}

module.exports = { Accesses, ApplySecurity, ConfigAudit }