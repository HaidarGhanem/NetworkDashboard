const { exec } = require('child_process');

// Controller function to check connectivity between two IP addresses
function Connectivity(first_ip, second_ip, username, password) {
    return new Promise((resolve, reject) => {
        exec(`py C:\\Users\\haidar\\Desktop\\server\\Python\\Troubleshooting\\Connectivity.py ${first_ip} ${second_ip} ${username} ${password}`, (error, stdout) => {
            if (error) {
                console.error(`exec error: ${error}`)
                reject(error);
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

// Controller function to check configurations of a device
function Configurations(ip, username, password) {
    return new Promise((resolve, reject) => {
        exec(`py C:\\Users\\haidar\\Desktop\\server\\Python\\Troubleshooting\\CheckConfigs.py ${ip} ${username} ${password}`, (error, stdout) => {
            if (error) {
                console.error(`exec error: ${error}`)
                reject(error);
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

// Controller function to retrieve interfaces of a device
function Interfaces(router_ip, username, password) {
    return new Promise((resolve, reject) => {
        exec(`py C:\\Users\\haidar\\Desktop\\server\\Python\\Troubleshooting\\Interfaces.py ${router_ip} ${username} ${password}`, (error, stdout) => {
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

// Controller function to retrieve interface status
function InterfacesStatus(router_ip, username, password, interface, action) {
    return new Promise((resolve, reject) => {
        exec(`py C:\\Users\\haidar\\Desktop\\server\\Python\\Troubleshooting\\InterfacesStatus.py ${router_ip} ${username} ${password} ${interface} ${action}`, (error, stdout) => {
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

// Controller function to apply DHCP configuration
function DHCP(router_ip, interfaces, network) {
    return new Promise((resolve, reject) => {
        exec(`py C:\\Users\\haidar\\Desktop\\server\\Python\\Troubleshooting\\Dhcp.py ${router_ip} ${interfaces} ${network}`, (error, stdout) => {
            if (error) {
                console.error(`exec error: ${error}`)
                reject(error);
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

module.exports = { Connectivity, Configurations, Interfaces, InterfacesStatus, DHCP }