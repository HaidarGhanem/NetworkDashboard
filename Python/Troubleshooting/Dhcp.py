import argparse
import json
from netmiko import ConnectHandler

def apply_dhcp_config(device, username, password, network, subnet_mask, interfaces):
    try:
        device_info = {
            'device_type': 'cisco_ios',
            'host': device,
            'username': username,
            'password': password,
        }
        net_connect = ConnectHandler(**device_info)

        for intf in interfaces:
            config_commands = []
            for ip in range(10, len(interfaces)*10+1, 10):
                config_commands.extend([
                    f'interface {intf}',
                    'no ip address',
                    f'ip address {network}.{ip} {subnet_mask}',
                    'exit'
                ])

                output = net_connect.send_config_set(config_commands)
                print(f"DHCP assigned IP for {device} - {intf}: {network}.{ip} with subnet mask {subnet_mask}")

        net_connect.save_config()
        net_connect.disconnect()

        success_message = f"DHCP configuration applied successfully on {device}"
        
        return json.dumps({"message": success_message})

    except Exception as e:
        return json.dumps({"error": f"Error applying DHCP configuration on {device}: {str(e)}")

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='DHCP Configuration Script')
    parser.add_argument('network', help='Network for DHCP configuration (e.g., 192.168.1)')
    parser.add_argument('subnet_mask', help='Subnet mask for DHCP pool (e.g., 255.255.255.0)')
    parser.add_argument('username', help='Username for device login')
    parser.add_argument('password', help='Password for device login')
    parser.add_argument('devices', nargs='+', help='Devices to configure DHCP on')
    parser.add_argument('--interfaces', nargs='+', help='Interfaces to apply DHCP on (default all)')
    args = parser.parse_args()

    for device in args.devices:
        interfaces = args.interfaces if args.interfaces else ['FastEthernet0/0', 'FastEthernet0/1']
        result = apply_dhcp_config(device, args.username, args.password, args.network, args.subnet_mask, interfaces)
        print(result)  