import re
import argparse
from netmiko import ConnectHandler

def apply_security_configuration(device_ip, username, password, enable_password, allowed_ips, banned_ips):

    # Access-list configuration for allowed IPs
    access_list_config = ['access-list 10 permit {}'.format(ip) for ip in allowed_ips]
    access_list_config.append('access-list 10 deny any log')

    # Access-list configuration for banned IPs
    ban_list_config = ['access-list 100 deny {}'.format(ip) for ip in banned_ips]
    ban_list_config.append('access-list 100 permit any log')

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

        # Apply access-list configuration for allowed IPs
        acl_output = net_connect.send_config_set(access_list_config)
        print(acl_output)

        # Apply access-list configuration for banned IPs
        ban_output = net_connect.send_config_set(ban_list_config)
        print(ban_output)

        # Disconnect from the device
        net_connect.disconnect()

    except Exception as e:
        print(f"Error connecting to {device_ip}: {str(e)}")

# Main entry point
if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='Apply security configuration to a device and control allowed/banned IPs.')
    parser.add_argument('device_ip', type=str, help='IP address of the device')
    parser.add_argument('username', type=str, help='Username for device authentication')
    parser.add_argument('password', type=str, help='Password for device authentication')
    parser.add_argument('enable_password', type=str, help='Enable password for privileged exec mode')
    parser.add_argument('allowed_ips', type=str, nargs='+', help='List of IP addresses allowed to connect')
    parser.add_argument('banned_ips', type=str, nargs='+', help='List of IP addresses banned from connecting')

    args = parser.parse_args()

    # Apply security configuration to the device
    apply_security_configuration(args.device_ip, args.username, args.password, args.enable_password,
                                 args.allowed_ips, args.banned_ips)