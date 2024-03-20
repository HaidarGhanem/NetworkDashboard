const { exec } = require('child_process')

// Controller function to execute the basic.py script
function basicGNS() {
    return new Promise((resolve, reject) => {
        exec('py C:\\Users\\haidar\\Desktop\\server\\Python\\basic.py', (error, stdout) => {
            if (error) {
                console.error(`exec error: ${error}`)
                reject(error)
            } else {
                try {
                    const jsonData = JSON.parse(stdout)
                    console.log(jsonData)
                    resolve(jsonData)
                } catch (parseError) {
                    console.error(`Error parsing JSON: ${parseError}`)
                    reject(parseError)
                }
            }
        })
    })
}

// Controller function to execute the HardwareInfo.py script
function basicInfo(router_ip, username, password) {
    return new Promise((resolve, reject) => {
        exec(`py C:\\Users\\haidar\\Desktop\\server\\Python\\Hardware\\HardwareInfo.py ${router_ip} ${username} ${password}`, (error, stdout) => {
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

// Controller function to execute the Interfaces.py script
function basicInterfaces(router_ip, username, password) {
    return new Promise((resolve, reject) => {
        exec(`py C:\\Users\\haidar\\Desktop\\server\\Python\\TroubleShooting\\Interfaces.py ${router_ip} ${username} ${password}`, (error, stdout) => {
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

// Controller function to execute the Connectivity.py script
function basicConnectivity(first_ip, second_ip, username, password) {
    return new Promise((resolve, reject) => {
        exec(`py C:\\Users\\haidar\\Desktop\\server\\Python\\TroubleShooting\\Connectivity.py ${first_ip} ${second_ip} ${username} ${password}`, (error, stdout) => {
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

module.exports = { basicGNS, basicInfo, basicInterfaces, basicConnectivity }