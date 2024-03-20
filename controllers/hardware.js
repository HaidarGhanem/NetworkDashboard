const { exec } = require('child_process');

// Controller function to execute the HardwareInfo.py script
function Info(router_ip, username, password) {
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
module.exports = Info