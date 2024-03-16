from netmiko import ConnectHandler
import json
import sys

def check_router_config(device_ip, username, password):

    device = {
        'device_type': 'cisco_ios',
        'host': device_ip,
        'username': username,
        'password': password,
    }
    
    try:
        
        net_connect = ConnectHandler(**device)
        
        output = net_connect.send_command('show running-config')
        
        if 'error' in output:
            error_message = f"Error found on {device_ip}:\n{output}"
            suggestion_message = "Suggestion: Check the configurations and make necessary changes"
            return json.dumps({'error_message': error_message, 'suggestion_message': suggestion_message})
        else:
            return json.dumps({'message': f"No errors found on {device_ip}"})

        net_connect.disconnect()
        
    except Exception as e:
        return json.dumps({'message': f"Error connecting to {device_ip}: {str(e)}"})


if len(sys.argv) > 1:
    results = {}

    for i in range(1, len(sys.argv), 3):
        ip = sys.argv[i]
        username = sys.argv[i+1]
        password = sys.argv[i+2]

        result = check_router_config(ip, username, password)
        results[ip] = result

    print(json.dumps(results, indent=4))
else:
    print(json.dumps({'message': "Please provide the device IPs, usernames, and passwords as command line arguments"}))