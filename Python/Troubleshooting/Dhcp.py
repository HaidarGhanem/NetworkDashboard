import argparse
from netmiko import ConnectHandler

def apply_dhcp_config(device, interfaces, network):
    try:
        # Connect to the device
        net_connect = ConnectHandler(**device)

        # Enable configuration mode
        net_connect.config_mode()

        # Apply DHCP configuration to specified interfaces
        for interface in interfaces:
            config_commands = [
                f'interface {interface}',
                'no ip address',  # Remove existing IP address
                f'ip address dhcp',
                'exit',
            ]
            net_connect.send_config_set(config_commands)

        # Commit the configuration
        net_connect.exit_config_mode()
        net_connect.save_config()

        # Disconnect from the device
        net_connect.disconnect()

    except Exception as e:
        print(f"Error connecting to {device['host']}: {str(e)}")

def configure_dhcp(network, device_interfaces):
    for device, interfaces in device_interfaces.items():
        print(f"Configuring DHCP on device {device}")
        device_info = {
            'device_type': 'cisco_ios',
            'host': device,
        }
        apply_dhcp_config(device_info, interfaces, network)

# Main entry point
if __name__ == '__main__':
    # Parse command-line arguments
    parser = argparse.ArgumentParser(description='DHCP Configuration Script')
    parser.add_argument('network', help='Network for DHCP configuration (e.g., 192.168.1.0/24)')
    parser.add_argument('--device_interfaces', nargs='+', help='Interfaces to configure for DHCP in the format "device:interface1 interface2 ..."')
    args = parser.parse_args()

    # Prepare device_interfaces dictionary
    device_interfaces = {}
    if args.device_interfaces:
        for device_interface in args.device_interfaces:
            device, interfaces = device_interface.split(':')
            device_interfaces[device] = interfaces.split()

    # Call the configure_dhcp function
    configure_dhcp(args.network, device_interfaces)



#You can run the script like this:
#```
#python dhcp_config_script.py 192.168.1.0/24 --device_interfaces
#"10.0.0.1:FastEthernet0/1" "10.0.0.2:GigabitEthernet1/0" "10.0.0.3:eth0 eth1"
#```
#In the example above, the script will configure DHCP on interfaces 
#`FastEthernet0/1` of device `10.0.0.1`, `GigabitEthernet1/0` of device `10.0.0.2`,
#and `eth0` and `eth1` of device `10.0.0.3`, all with the specified network `192.168.1.0/24`.