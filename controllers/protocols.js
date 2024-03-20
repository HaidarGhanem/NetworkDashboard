const { exec } = require('child_process');

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
                    resolve(jsonData);
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
        exec(`py C:\\Users\\haidar\\Desktop\\server\\Python\\TroubleShooting\\Interfaces.py ${router_ip} ${username} ${password} ${interface} ${action}`, (error, stdout) => {
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

// Controller functions to execute RIP1
function RIP1(router_ip, username, password, networks) {
    return new Promise((resolve, reject) => {
        exec(`py C:\\Users\\haidar\\Desktop\\server\\Python\\Protocols\\RipOne.py ${router_ip} ${username} ${password} ${networks}`, (error, stdout) => {
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

// Controller functions to execute RIP2
function RIP2(router_ip, username, password, networks) {
    return new Promise((resolve, reject) => {
        exec(`py C:\\Users\\haidar\\Desktop\\server\\Python\\Protocols\\RipTwo.py ${router_ip} ${username} ${password} ${networks}`, (error, stdout) => {
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

// Controller functions to execute EIGRP
function EIGRP(router_ip, username, password, networks , as_number) {
    return new Promise((resolve, reject) => {
        exec(`py C:\\Users\\haidar\\Desktop\\server\\Python\\Protocols\\Eigrp.py ${router_ip} ${username} ${password} ${networks} ${as_number}`, (error, stdout) => {
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

// Controller functions to execute OSPF
function OSPF(router_ip, username, password, networks , interface, area) {
    return new Promise((resolve, reject) => {
        exec(`py C:\\Users\\haidar\\Desktop\\server\\Python\\Protocols\\Ospf.py ${router_ip} ${username} ${password} ${networks} ${interface} ${networks} ${area}`, (error, stdout) => {
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
        });
    });
}

module.exports = { Interfaces, InterfacesStatus, RIP1, RIP2, EIGRP, OSPF }