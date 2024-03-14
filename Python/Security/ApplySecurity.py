import re
import argparse
from netmiko import ConnectHandler

def apply_security_configuration(device_ip, username, password, enable_password):
    # Standard configuration (basic security baseline)
    standard_config = [
        'no ip http server',
        'no ip http secure-server',
        'no ip finger',
        'no service finger',
    ]

    try:
        # Connect to the device
        device = {
            'device_type': 'cisco_ios',
            'ip': device_ip,
            'username': username,
            'password': password,
            'secret': enable_password,
        }
        net_connect = ConnectHandler(**device)

        # Enable privileged exec mode
        net_connect.enable()

        # Apply standard security configuration
        for config_line in standard_config:
            output = net_connect.send_config_set(config_line)
            print(output)

        # Disconnect from the device
        net_connect.disconnect()

    except Exception as e:
        print(f"Error connecting to {device_ip}: {str(e)}")

# Main entry point
if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='Apply standard security configuration to a device.')
    parser.add_argument('device_ip', type=str, help='IP address of the device')
    parser.add_argument('username', type=str, help='Username for device authentication')
    parser.add_argument('password', type=str, help='Password for device authentication')
    parser.add_argument('enable_password', type=str, help='Enable password for privileged exec mode')

    args = parser.parse_args()

    # Apply security configuration to the device
    apply_security_configuration(args.device_ip, args.username, args.password, args.enable_password)