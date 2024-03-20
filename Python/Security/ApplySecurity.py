import re
import argparse
import json
from netmiko import ConnectHandler

def apply_security_configuration(device_ip, username, password):
    standard_config = [
        'ip http server',
        'ip http secure-server',
        'ip finger',
        'service finger',
    ]

    try:
        device = {
            'device_type': 'cisco_ios',
            'ip': device_ip,
            'username': username,
            'password': password
        }
        net_connect = ConnectHandler(**device)

        net_connect.enable()

        config_results = {}
        for config_line in standard_config:
            output = net_connect.send_config_set(config_line)
            if re.search('% Invalid input', output):
                config_results[config_line] = "Failed to configure"
            else:
                config_results[config_line] = "Successfully configured"

        net_connect.disconnect()

        return json.dumps(config_results)

    except Exception as e:
        return json.dumps({"error": f"Error connecting to {device_ip}: {str(e)}"})

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='Apply standard security configuration to a device.')
    parser.add_argument('device_ip', type=str, help='IP address of the device')
    parser.add_argument('username', type=str, help='Username for device authentication')
    parser.add_argument('password', type=str, help='Password for device authentication')

    args = parser.parse_args()

    result = apply_security_configuration(args.device_ip, args.username, args.password)
    print(result) 