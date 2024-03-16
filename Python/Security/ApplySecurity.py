import re
import argparse
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

        for config_line in standard_config:
            output = net_connect.send_config_set(config_line)
            if re.search('% Invalid input', output):
                print(f"Failed to configure: {config_line}")
            else:
                print(f"Successfully configured: {config_line}")

        net_connect.disconnect()

    except Exception as e:
        print(f"Error connecting to {device_ip}: {str(e)}")

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='Apply standard security configuration to a device.')
    parser.add_argument('device_ip', type=str, help='IP address of the device')
    parser.add_argument('username', type=str, help='Username for device authentication')
    parser.add_argument('password', type=str, help='Password for device authentication')

    args = parser.parse_args()

    apply_security_configuration(args.device_ip, args.username, args.password)