import re
import argparse
from netmiko import ConnectHandler
import json

def compare_security_configuration(device_ip, username, password, enable_password):
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

        # Check the current device configuration
        output = net_connect.send_command('show run')

        # Compare the device configuration with the standard configuration
        matching_lines = sum(config_line in output for config_line in standard_config)
        total_lines = len(standard_config)
        percentage_diff = ((total_lines - matching_lines) / total_lines) * 100

        # Disconnect from the device
        net_connect.disconnect()

        result = {
            'device_ip': device_ip,
            'diff_percentage': percentage_diff
        }
        
        return json.dumps(result)

    except Exception as e:
        result = {
            'error': f"Error connecting to {device_ip}: {str(e)}"
        }
        return json.dumps(result)

# Main entry point
if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='Compare device configuration with a standard security baseline.')
    parser.add_argument('device_ip', type=str, help='IP address of the device')
    parser.add_argument('username', type=str, help='Username for device authentication')
    parser.add_argument('password', type=str, help='Password for device authentication')
    parser.add_argument('enable_password', type=str, help='Enable password for privileged exec mode')

    args = parser.parse_args()

    # Compare security configuration for the device
    diff_percentage = compare_security_configuration(args.device_ip, args.username, args.password, args.enable_password)

    # Print the percentage of difference in security configuration
    print(diff_percentage)